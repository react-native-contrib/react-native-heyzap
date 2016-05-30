'use strict';

let NativeModules = require('NativeModules');
let NativeHeyzap = NativeModules.Heyzap;

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
