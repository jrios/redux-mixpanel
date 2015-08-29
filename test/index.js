'use strict';

import test from 'tape';
import sinon from 'sinon';

import Mixpanel from 'mixpanel';

import reduxMixpanel from '../src/index';

test('returns a function when passed key and config', (assert) => {
  var config = {};
  var middleware = reduxMixpanel('testKey', config);

  var isFunction = typeof middleware === "function";

  assert.true(isFunction);

  assert.end();
});

test('does not throw if only passed a token', (assert) => {
  assert.doesNotThrow(() => reduxMixpanel('testKey'));
  assert.end();
})

test('throws if not passed a token', (assert) => {
  assert.throws(reduxMixpanel);
  assert.end();
});

test('will initialize mixpanel with passed in api key', (assert) => {
  var spy = sinon.spy(Mixpanel, 'init');

  var middleware = reduxMixpanel('testKey');
  var store = {};
  var next = function(action){};
  var action = {};
  middleware(store)(next)(action);

  assert.ok(spy.calledWith('testKey'));
  Mixpanel.init.restore();
  assert.end();
});

test('will call track action', (assert) => {
  var tracked = false;

  sinon.stub(Mixpanel, 'init', () => {
    return {
      track(action) {
        tracked = true;
      }
    };
  });

  var middleware = reduxMixpanel('testKey');

  var store = {};
  var next = function(action){};
  var action = {};

  middleware(store)(next)(action);
  assert.ok(tracked);
  Mixpanel.init.restore();
  assert.end();
});

test('middleware will call the next action', (assert) => {
  var middleware = reduxMixpanel('testKey');

  var store = {};
  var next = function(action) {
    return {
      called: true
    };
  };

  var action = {};

  var result = middleware(store)(next)(action);

  assert.ok(result.called);
  assert.end();
})