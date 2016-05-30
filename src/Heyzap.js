'use strict';

import React, { Component, PropTypes } from 'react';
import { NativeModules, NativeAppEventEmitter } from 'react-native';

let NativeHeyzap = NativeModules.Heyzap;

/**
 * A Heyzap component for React Native
 */
class Heyzap extends Component {

    constructor(props) {
        super(props);
        NativeHeyzap.initialize(props.publisherId);

        // Bind listeners
        this.onReceiveAd = this.onReceiveAd.bind(this);
        this.onFailToReceiveAd = this.onFailToReceiveAd.bind(this);
        this.onShowAd = this.onShowAd.bind(this);
        this.onFailToShowAd = this.onFailToShowAd.bind(this);
        this.onClickAd = this.onClickAd.bind(this);
        this.onHideAd = this.onHideAd.bind(this);
        this.onStartAdAudio = this.onStartAdAudio.bind(this);
        this.onFinishAdAudio = this.onFinishAdAudio.bind(this);
    }

    /* Actions */

    /**
     * Shows the Heyzap Mediation Debug screen.
     *
     * @return {void}
     */
    showDebugPanel() {
        NativeHeyzap.showDebugPanel();
    }

    /**
     * Shows an interstitial ad.
     *
     * @return {void}
     */
    showInterstitialAd() {
        NativeHeyzap.showInterstitialAd();
    }

    /**
     * Fetches a video ad.
     *
     * @return {void}
     */
    fetchVideoAd() {
        NativeHeyzap.fetchVideoAd();
    }

    /**
     * Shows a video ad.
     *
     * @return {void}
     */
    showVideoAd() {
        NativeHeyzap.showVideoAd();
    }

    /**
     * Fetches an incentivized ad.
     *
     * @return {void}
     */
    fetchIncentivizedAd() {
        NativeHeyzap.fetchIncentivizedAd();
    }

    /**
     * Shows an incentivized ad.
     *
     * @return {void}
     */
    showIncentivizedAd() {
        NativeHeyzap.showIncentivizedAd();
    }

    /* Event listeners */

    onReceiveAd(event) {
        NativeAppEventEmitter.addListener('DidReceiveAd', this.props.onReceiveAd);
    }

    onFailToReceiveAd(event) {
        NativeAppEventEmitter.addListener('DidFailToReceiveAd', this.props.onFailToReceiveAd);
    }

    onShowAd(event) {
        NativeAppEventEmitter.addListener('DidShowAd', this.props.onShowAd);
    }

    onFailToShowAd(event) {
        NativeAppEventEmitter.addListener('DidFailToShowAd', this.props.onFailToShowAd);
    }

    onClickAd(event) {
        NativeAppEventEmitter.addListener('DidClickAd', this.props.onClickAd);
    }

    onHideAd(event) {
        NativeAppEventEmitter.addListener('DidHideAd', this.props.onHideAd);
    }

    onStartAdAudio(event) {
        NativeAppEventEmitter.addListener('WillStartAdAudio', this.props.onStartAdAudio);
    }

    onFinishAdAudio(event) {
        NativeAppEventEmitter.addListener('DidFinishAdAudio', this.props.onFinishAdAudio);
    }

    /* Component lifecycle */
    componentWillUnmount() {
        NativeAppEventEmitter.removeAllListeners();
    }

    render() {
        NativeHeyzap.showDebugPanel();
        return null;
    }
};

Heyzap.propTypes = {
    /* Required */
    publisherId: PropTypes.string,

    /* Options */
    childDirectedAds: PropTypes.bool,
    disableAutoPrefetch: PropTypes.bool,
    disableMediation: PropTypes.bool,
    disableAutoIapRecording: PropTypes.bool,
    installTrackingOnly: PropTypes.bool,

    /* Events */
    onReceiveAd: PropTypes.func,
    onFailToReceiveAd: PropTypes.func,
    onShowAd: PropTypes.func,
    onFailToShowAd: PropTypes.func,
    onClickAd: PropTypes.func,
    onHideAd: PropTypes.func,
    onStartAdAudio: PropTypes.func,
    onFinishAdAudio: PropTypes.func,
    onCompleteIncentivizedAd: PropTypes.func,
    onFailToCompleteIncentivizedAd: PropTypes.func,
};

Heyzap.defaultProps = {
    childDirectedAds: false,
    disableAutoPrefetch: false,
    disableMediation: false,
    disableAutoIapRecording: false,
    installTrackingOnly: false,
    onReceiveAd: (event) => { console.log(`Received tag: ${event.tag}`) },
    onFailToReceiveAd: (event) => { console.log(`Failed tag: ${event.tag}`) },
    onShowAd: (event) => { console.log(`Showing tag: ${event.tag}`) },
    onFailToShowAd: (event) => { console.log(`Failed to show tag: ${event.tag}`) },
    onClickAd: (event) => { console.log(`Clicked tag: ${event.tag}`) },
    onHideAd: (event) => { console.log(`Dismissed tag: ${event.tag}`) },
    onStartAdAudio: (event) => { console.log(`Starting tag: ${event.tag}`) },
    onFinishAdAudio: (event) => { console.log(`Finishing tag: ${event.tag}`) },
};

module.exports = Heyzap;
