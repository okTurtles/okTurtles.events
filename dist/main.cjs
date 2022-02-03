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

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var listenKey = function listenKey(evt) {
  return "events/".concat(evt, "/listeners");
};

var _default = (0, _sbp.default)('sbp/selectors/register', {
  'okTurtles.events/on': function okTurtlesEventsOn(event, handler) {
    (0, _sbp.default)('okTurtles.data/add', listenKey(event), handler);
  },
  'okTurtles.events/once': function okTurtlesEventsOnce(event, handler) {
    var cbWithOff = function cbWithOff() {
      handler.apply(void 0, arguments);
      (0, _sbp.default)('okTurtles.events/off', event, cbWithOff);
    };

    (0, _sbp.default)('okTurtles.events/on', event, cbWithOff);
  },
  'okTurtles.events/emit': function okTurtlesEventsEmit(event) {
    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    var _iterator = _createForOfIteratorHelper((0, _sbp.default)('okTurtles.data/get', listenKey(event)) || []),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var listener = _step.value;
        listener.apply(void 0, data);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  // almost identical to Vue.prototype.$off, except we require `event` argument
  'okTurtles.events/off': function okTurtlesEventsOff(event, handler) {
    if (handler) {
      (0, _sbp.default)('okTurtles.data/remove', listenKey(event), handler);
    } else {
      (0, _sbp.default)('okTurtles.data/delete', listenKey(event));
    }
  }
});

exports.default = _default;
