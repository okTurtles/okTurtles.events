# `okTurtles.events`

Event handling for [SBP](https://github.com/okTurtles/sbp-js).

See [`index.test.js`](index.test.js) for usage examples.

Install:

```
$ npm install --save @sbp/okturtles.events
```

Usage:

```js
import sbp from '@sbp/sbp'
import '@sbp/okturtles.events'

// now you can use any of the okTurtles.events selectors
// note: you only need to import '@sbp/okturtles.events' once!
```

Registers the following selectors:

- `'okTurtles.events/on'`
- `'okTurtles.events/once'`
- `'okTurtles.events/emit'`
- `'okTurtles.events/off'`

## History

See [HISTORY.md](HISTORY.md).

## License

AGPL-3.0.

See [LICENSE.txt](LICENSE.txt).
