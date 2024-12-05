// =======================
// Domain: Event publish/subscribe
// =======================
import sbp from '@sbp/sbp';
import '@sbp/okturtles.data';
const listenKey = (evt) => `events/${evt}/listeners`;
export default sbp('sbp/selectors/register', {
    'okTurtles.events/_init': function () {
        this.errorHandler = (event, e) => {
            console.error(`[okTurtles.events] Error at handler for ${event}`, e);
        };
    },
    'okTurtles.events/on': function (event, handler) {
        sbp('okTurtles.data/add', listenKey(event), handler);
        return () => sbp('okTurtles.events/off', event, handler);
    },
    'okTurtles.events/once': function (event, handler) {
        const cbWithOff = (...args) => {
            handler(...args);
            sbp('okTurtles.events/off', event, cbWithOff);
        };
        return sbp('okTurtles.events/on', event, cbWithOff);
    },
    'okTurtles.events/emit': function (event, ...data) {
        var _a;
        for (const listener of sbp('okTurtles.data/get', listenKey(event)) || []) {
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
            sbp('okTurtles.data/remove', listenKey(event), handler);
        }
        else {
            sbp('okTurtles.data/delete', listenKey(event));
        }
    },
    'okTurtles.events/setErrorHandler': function (errorHandler) {
        this.errorHandler = errorHandler;
    }
});
