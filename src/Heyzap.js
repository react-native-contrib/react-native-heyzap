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
        this.props.onReceiveAd(event);
    }

    onFailToReceiveAd(event) {
        this.props.onFailToReceiveAd(event);
    }

    onShowAd(event) {
        this.props.onShowAd(event);
    }

    onFailToShowAd(event) {
        this.props.onFailToShowAd(event);
    }

    onClickAd(event) {
        this.props.onClickAd(event);
    }

    onHideAd(event) {
        this.props.onHideAd(event);
    }

    onStartAdAudio(event) {
        this.props.onStartAdAudio(event);
    }

    onFinishAdAudio(event) {
        this.props.onFinishAdAudio(event);
    }

    /* Component lifecycle */

    componentWillMount() {
        NativeAppEventEmitter.addListener('DidReceiveAd', this.props.onReceiveAd);
        NativeAppEventEmitter.addListener('DidFailToReceiveAd', this.props.onFailToReceiveAd);
        NativeAppEventEmitter.addListener('DidShowAd', this.props.onShowAd);
        NativeAppEventEmitter.addListener('DidFailToShowAd', this.props.onFailToShowAd);
        NativeAppEventEmitter.addListener('DidClickAd', this.props.onClickAd);
        NativeAppEventEmitter.addListener('DidHideAd', this.props.onHideAd);
        NativeAppEventEmitter.addListener('WillStartAdAudio', this.props.onStartAdAudio);
        NativeAppEventEmitter.addListener('DidFinishAdAudio', this.props.onFinishAdAudio);
    }

    componentWillUnmount() {
        NativeAppEventEmitter.removeAllListeners();
    }

    render() {
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
