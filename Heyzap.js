'use strict';

let NativeHeyzap = require('NativeModules').Heyzap;

/**
 * High-level docs for the Heyzap API can be written here.
 */

let Heyzap = {
    initialize: function(publisherId) {
        NativeHeyzap.initialize(publisherId);
    },

    showDebugPanel: function() {
        NativeHeyzap.showDebugPanel();
    },

    showInterstitialAd: function() {
        NativeHeyzap.showInterstitialAd();
    },

    fetchVideoAd: function() {
        NativeHeyzap.fetchVideoAd();
    },

    showVideoAd: function() {
        NativeHeyzap.showVideoAd();
    },

    fetchIncentivizedAd: function() {
        NativeHeyzap.fetchIncentivizedAd();
    },

    showIncentivizedAd: function() {
        NativeHeyzap.showIncentivizedAd();
    },
};

module.exports = Heyzap;
