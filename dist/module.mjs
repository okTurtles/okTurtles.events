// 

'use strict'

// =======================
// Domain: Event publish/subscribe
// =======================

import sbp from '@sbp/sbp'
import '@sbp/okturtles.data'

const listenKey = evt => `events/${evt}/listeners`

export default (sbp('sbp/selectors/register', {
  'okTurtles.events/on': function (event, handler) {
    sbp('okTurtles.data/add', listenKey(event), handler)
  },
  'okTurtles.events/once': function (event, handler) {
    const cbWithOff = (...args) => {
      handler(...args)
      sbp('okTurtles.events/off', event, cbWithOff)
    }
    sbp('okTurtles.events/on', event, cbWithOff)
  },
  'okTurtles.events/emit': function (event, ...data) {
    for (const listener of sbp('okTurtles.data/get', listenKey(event)) || []) {
      listener(...data)
    }
  },
  // almost identical to Vue.prototype.$off, except we require `event` argument
  'okTurtles.events/off': function (event, handler) {
    if (handler) {
      sbp('okTurtles.data/remove', listenKey(event), handler)
    } else {
      sbp('okTurtles.data/delete', listenKey(event))
    }
  }
}))
