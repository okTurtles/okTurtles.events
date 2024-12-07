/* eslint-env mocha */

import sbp from "@sbp/sbp";
import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import "../dist/esm/index.js";

describe("[SBP] EVENTS domain", () => {
  it("should register event listener", () => {
    const testListener = mock.fn(() => {});
    sbp("okTurtles.events/on", "testEvent", testListener);
    sbp("okTurtles.events/emit", "testEvent");
    sbp("okTurtles.events/emit", "testEvent");
    assert.equal(testListener.mock.callCount(), 2);
  });
  it("should pass event listener the right data", () => {
    const testListener = mock.fn(() => {});
    const testData = 1;
    sbp("okTurtles.events/on", "testEvent", testListener);
    sbp("okTurtles.events/emit", "testEvent", testData);
    assert.equal(testListener.mock.callCount(), 1);
    assert.deepEqual(testListener.mock.calls[0].arguments, [testData]);
  });
  it('should call "once" listener once', () => {
    const testListener = mock.fn(() => {});
    sbp("okTurtles.events/once", "testEvent", testListener);
    sbp("okTurtles.events/emit", "testEvent");
    sbp("okTurtles.events/emit", "testEvent");
    assert.equal(testListener.mock.callCount(), 1);
  });
  it("should disable listener correctly", () => {
    const testListener = mock.fn(() => {});
    sbp("okTurtles.events/on", "testEvent2", testListener);
    sbp("okTurtles.events/emit", "testEvent2");
    sbp("okTurtles.events/off", "testEvent2");
    sbp("okTurtles.events/emit", "testEvent2");
    assert.equal(testListener.mock.callCount(), 1);
  });
  it("should disable listener correctly (using return value)", () => {
    const testListener = mock.fn(() => {});
    const disable = sbp("okTurtles.events/on", "testEvent2", testListener);
    sbp("okTurtles.events/emit", "testEvent2");
    disable();
    sbp("okTurtles.events/emit", "testEvent2");
    assert.equal(testListener.mock.callCount(), 1);
  });
  it("should return cleanup function from on", () => {
    const testListener = mock.fn(() => {});
    const cleanup = sbp("okTurtles.events/on", "testEvent", testListener);
    assert.equal(typeof cleanup, "function");
    sbp("okTurtles.events/emit", "testEvent");
    cleanup();
    sbp("okTurtles.events/emit", "testEvent");
    assert.equal(testListener.mock.callCount(), 1);
  });
  it("should return cleanup function from once", () => {
    const testListener = mock.fn(() => {});
    const cleanup = sbp("okTurtles.events/once", "testEvent", testListener);
    assert.equal(typeof cleanup, "function");
    cleanup();
    sbp("okTurtles.events/emit", "testEvent");
    assert.equal(testListener.mock.callCount(), 0);
  });
});
