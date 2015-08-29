# Redux Mixpanel Middleware

Redux middleware for tracking dispatched actions to [MixPanel](http://www.mixpanel.com) for analytics.

## Installation

`npm install redux-mixpanel --save`

## Usage

Redux mixpanel middlware requires an API key to function properly. A middleware function is returned that can be applied using ``applyMiddleware`` from [Redux](http://rackt.github.io/redux).

### ES6

```
import reduxMixpanel from 'redux-mixpanel';

let mixpanelMiddleware = reduxMixpanel('YOUR_API_KEY');
```

### CommonJS

```
var reduxMixpanel = require('redux-mixpanel');

var mixpanelMiddleware = reduxMixpanel('YOUR_API_KEY');
```

## Tests

Tests can be run with the following npm command:

`npm run test`