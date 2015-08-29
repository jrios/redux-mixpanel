'use strict';

import Mixpanel from 'mixpanel';

export default function reduxMixpanel(token, config) {
  if(token) {
    let mixPanelClient = Mixpanel.init(token, config);

    return store => next => action => {
      mixPanelClient.track('action_dispatched', action);
      return next(action);
    };
  } else {
    throw new Error('You must provide a mixpanel token.');
  }
};