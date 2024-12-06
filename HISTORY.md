# History

#### 1.0.0

⚠️ **Breaking Changes!** ⚠️

- `okTurtles.events/once` used to return a function that would call the listener that was registered and then unregister the listener. Now it returns a function that simply unregisters the listener.

**All Changes**

- `emit` will now catch exceptions thrown by synchronous listeners. This means an exception in one listener won't prevent other listeners from being called. ([PR #6](https://github.com/okTurtles/okTurtles.events/pull/6))
- `on` and `once` will return a function to clear the event listener ([PR #6](https://github.com/okTurtles/okTurtles.events/pull/6))
- New selector `'okTurtles.events/setErrorHandler'` to set the error handler for errors caught by `emit` ([PR #6](https://github.com/okTurtles/okTurtles.events/pull/6))
- Misc changes: rewritten in TypeScript, use `node:test` instead of `mocha`, enable Github Actions to run tests

#### 0.1.6

- `okTurtles.events/once` now returns the callback it actually registers so that you can use it with `okTurtles.events/off`

#### 0.1.5

- SBP 2.2.0 package listed as peerDep

#### 0.1.3

- SBP package dependency as '^' version to reduce upgrade / publishing frequency

#### 0.1.2

- reduced size of `dist/main.cjs` by updating `"browserslist"`

#### 0.1.1

- bump sbp to 2.0.0, okturtles.data to 0.1.1

#### 0.1.0

- bump sbp to 2.0.0

#### 0.0.2

- bump sbp to 1.1.0

#### 0.0.1

- initial release
