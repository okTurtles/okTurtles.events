'use strict'; // =======================
// Domain: Event publish/subscribe
// =======================

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sbp = _interopRequireDefault(require("@sbp/sbp"));

require("@sbp/okturtles.data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listenKey = evt => `events/${evt}/listeners`;

var _default = (0, _sbp.default)('sbp/selectors/register', {
  'okTurtles.events/on': function (event, handler) {
    (0, _sbp.default)('okTurtles.data/add', listenKey(event), handler);
  },
  'okTurtles.events/once': function (event, handler) {
    const cbWithOff = function () {
      handler(...arguments);
      (0, _sbp.default)('okTurtles.events/off', event, cbWithOff);
    };

    (0, _sbp.default)('okTurtles.events/on', event, cbWithOff);
  },
  'okTurtles.events/emit': function (event) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    for (const listener of (0, _sbp.default)('okTurtles.data/get', listenKey(event)) || []) {
      listener(...data);
    }
  },
  // almost identical to Vue.prototype.$off, except we require `event` argument
  'okTurtles.events/off': function (event, handler) {
    if (handler) {
      (0, _sbp.default)('okTurtles.data/remove', listenKey(event), handler);
    } else {
      (0, _sbp.default)('okTurtles.data/delete', listenKey(event));
    }
  }
});

exports.default = _default;
