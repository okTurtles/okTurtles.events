// =======================
// Domain: Event publish/subscribe
// =======================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@sbp/sbp", "@sbp/okturtles.data"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const sbp_1 = __importDefault(require("@sbp/sbp"));
    require("@sbp/okturtles.data");
    const listenKey = (evt) => `events/${evt}/listeners`;
    exports.default = (0, sbp_1.default)('sbp/selectors/register', {
        'okTurtles.events/_init': function () {
            this.errorHandler = (event, e) => {
                console.error(`[okTurtles.events] Error at handler for ${event}`, e);
            };
        },
        'okTurtles.events/on': function (event, handler) {
            (0, sbp_1.default)('okTurtles.data/add', listenKey(event), handler);
            return () => (0, sbp_1.default)('okTurtles.events/off', event, handler);
        },
        'okTurtles.events/once': function (event, handler) {
            const cbWithOff = (...args) => {
                handler(...args);
                (0, sbp_1.default)('okTurtles.events/off', event, cbWithOff);
            };
            return (0, sbp_1.default)('okTurtles.events/on', event, cbWithOff);
        },
        'okTurtles.events/emit': function (event, ...data) {
            var _a;
            for (const listener of (0, sbp_1.default)('okTurtles.data/get', listenKey(event)) || []) {
                try {
                    listener(...data);
                }
                catch (e) {
                    (_a = this.errorHandler) === null || _a === void 0 ? void 0 : _a.call(this, event, e);
                }
            }
        },
        // almost identical to Vue.prototype.$off, except we require `event` argument
        'okTurtles.events/off': function (event, handler) {
            if (handler) {
                (0, sbp_1.default)('okTurtles.data/remove', listenKey(event), handler);
            }
            else {
                (0, sbp_1.default)('okTurtles.data/delete', listenKey(event));
            }
        },
        'okTurtles.events/setErrorHandler': function (errorHandler) {
            this.errorHandler = errorHandler;
        }
    });
});
