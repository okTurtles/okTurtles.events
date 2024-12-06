// =======================
// Domain: Event publish/subscribe
// =======================

import sbp from '@sbp/sbp'
import '@sbp/okturtles.data'

const listenKey = (evt: string) => `events/${evt}/listeners`

type ThisType = {
  errorHandler?: (event: string, e: unknown) => void
}

export default (sbp('sbp/selectors/register', {
  'okTurtles.events/_init': function (this: ThisType) {
    this.errorHandler = (event: string, e: unknown) => {
      console.error(`[okTurtles.events] Error at handler for ${event}`, e)
    }
  },
  'okTurtles.events/on': function (event: string, handler: (...args: unknown[]) => void) {
    sbp('okTurtles.data/add', listenKey(event), handler)
    return () => sbp('okTurtles.events/off', event, handler)
  },
  'okTurtles.events/once': function (event: string, handler: (...args: unknown[]) => void) {
    const cbWithOff = (...args: unknown[]) => {
      handler(...args)
      sbp('okTurtles.events/off', event, cbWithOff)
    }
    return sbp('okTurtles.events/on', event, cbWithOff)
  },
  'okTurtles.events/emit': function (this: ThisType, event: string, ...data: unknown[]) {
    for (const listener of sbp('okTurtles.data/get', listenKey(event)) || []) {
      try {
        listener(...data)
      } catch (e) {
        this.errorHandler?.(event, e)
      }
    }
  },
  // almost identical to Vue.prototype.$off, except we require `event` argument
  'okTurtles.events/off': function (event: string, handler: (...args: unknown[]) => void) {
    if (handler) {
      sbp('okTurtles.data/remove', listenKey(event), handler)
    } else {
      sbp('okTurtles.data/delete', listenKey(event))
    }
  },
  'okTurtles.events/setErrorHandler': function (this: ThisType, errorHandler?: (event: string, e: unknown) => void) {
    this.errorHandler = errorHandler
  }
}) as string[])
