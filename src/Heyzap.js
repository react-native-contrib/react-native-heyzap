'use strict';

let NativeModules = require('NativeModules');
let NativeHeyzap = NativeModules.Heyzap;

/**
 * React Native Heyzap module.
 *
 * @module react-native-heyzap
 */
let Heyzap = {

    /**
     * Initializes the Heyzap SDK with a valid publisher ID.
     *
     * @param  {string} publisherId
     *
     * @return {void}
     */
    initialize: function(publisherId) {
        NativeHeyzap.initialize(publisherId);
    },

    /**
     * Shows the Heyzap Mediation Debug screen.
     *
     * @return {void}
     */
    showDebugPanel: function() {
        NativeHeyzap.showDebugPanel();
    },

    /**
     * Shows an interstitial ad.
     *
     * @return {void}
     */
    showInterstitialAd: function() {
        NativeHeyzap.showInterstitialAd();
    },

    /**
     * Fetches a video ad.
     *
     * @return {void}
     */
    fetchVideoAd: function() {
        NativeHeyzap.fetchVideoAd();
    },

    /**
     * Shows a video ad.
     *
     * @return {void}
     */
    showVideoAd: function() {
        NativeHeyzap.showVideoAd();
    },

    /**
     * Fetches an incentivized ad.
     *
     * @return {void}
     */
    fetchIncentivizedAd: function() {
        NativeHeyzap.fetchIncentivizedAd();
    },

    /**
     * Shows an incentivized ad.
     *
     * @return {void}
     */
    showIncentivizedAd: function() {
        NativeHeyzap.showIncentivizedAd();
    },
};

module.exports = Heyzap;
