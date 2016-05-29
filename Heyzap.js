/**
 * @providesModule Heyzap
 * @flow
 */
'use strict';

var NativeHeyzap = require('NativeModules').Heyzap;

/**
 * High-level docs for the Heyzap API can be written here.
 */

var Heyzap = {
  initialize: function(publisherId) {
    NativeHeyzap.initialize(publisherId);
  },

  showDebugPanel: function() {
    NativeHeyzap.showDebugPanel();
  }
};

module.exports = Heyzap;
