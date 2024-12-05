// @flow

"use strict";

import sbp from "@sbp/sbp";
import "@sbp/okturtles.data";

// Add type definitions
type EventHandler = Function;
type CleanupFunction = () => void;
type SBPDomain = Array<string>;

const listenKey = (evt: string): string => `events/${evt}/listeners`;

// Add type annotation for the export
const domain: SBPDomain = sbp("sbp/selectors/register", {
  "okTurtles.events/on": function (
    event: string,
    handler: EventHandler
  ): CleanupFunction {
    sbp("okTurtles.data/add", listenKey(event), handler);
    return () => {
      sbp("okTurtles.events/off", event, handler);
    };
  },

  "okTurtles.events/once": function (
    event: string,
    handler: EventHandler
  ): CleanupFunction {
    const cbWithOff = (...args: Array<any>) => {
      sbp("okTurtles.events/off", event, cbWithOff);
      handler(...args);
    };
    sbp("okTurtles.events/on", event, cbWithOff);
    return () => {
      sbp("okTurtles.events/off", event, cbWithOff);
    };
  },

  "okTurtles.events/emit": function (event: string, ...data: Array<any>): void {
    for (const listener of sbp("okTurtles.data/get", listenKey(event)) || []) {
      listener(...data);
    }
  },

  "okTurtles.events/off": function (
    event: string,
    handler: ?EventHandler
  ): void {
    if (handler) {
      sbp("okTurtles.data/remove", listenKey(event), handler);
    } else {
      sbp("okTurtles.data/delete", listenKey(event));
    }
  },
});

export default domain;
