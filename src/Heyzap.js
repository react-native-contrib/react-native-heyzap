'use strict';

import React, {
    Component,
    PropTypes,
} from 'react';

import {
    DeviceEventEmitter,
    NativeModules,
    NativeAppEventEmitter,
    Platform,
} from 'react-native';

let NativeHeyzap = NativeModules.Heyzap;

/**
 * A Heyzap component for React Native
 */
class Heyzap extends Component {

    constructor(props) {
        super(props);
        NativeHeyzap.start(props.publisherId).then((data) => console.log(data));

        // Set correct emitter for platform
        this.emitter = Platform.OS === 'ios'
            ? NativeAppEventEmitter
            : DeviceEventEmitter;

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
        return NativeHeyzap.showInterstitialAd();
    }

    /**
     * Fetches a video ad.
     *
     * @return {void}
     */
    fetchVideoAd() {
        return NativeHeyzap.fetchVideoAd();
    }

    /**
     * Shows a video ad.
     *
     * @return {void}
     */
    showVideoAd() {
        return NativeHeyzap.showVideoAd();
    }

    /**
     * Fetches an incentivized ad.
     *
     * @return {void}
     */
    fetchIncentivizedAd() {
        return NativeHeyzap.fetchIncentivizedAd();
    }

    /**
     * Shows an incentivized ad.
     *
     * @return {void}
     */
    showIncentivizedAd() {
        return NativeHeyzap.showIncentivizedAd();
    }

    /* Event listeners */

    /**
     * Triggers `this.props.onReceiveAd` when an ad is received by Heyzap.
     *
     * @param  {Object} event An object containing the event data
     *
     * @return {void}
     */
    onReceiveAd(event) {
        this.props.onReceiveAd(event);
    }

    /**
     * Triggers `this.props.onFailToReceiveAd` when an ad failed to be received
     * by Heyzap.
     *
     * @param  {Object} event An object containing the event data
     *
     * @return {void}
     */
    onFailToReceiveAd(event) {
        this.props.onFailToReceiveAd(event);
    }

    /**
     * Triggers `this.props.onShowAd` when an ad is displayed.
     *
     * @param  {Object} event An object containing the event data
     *
     * @return {void}
     */
    onShowAd(event) {
        this.props.onShowAd(event);
    }

    /**
     * Triggers `this.props.onFailToShowAd` when an ad failed to be displayed.
     *
     * @param  {Object} event An object containing the event data
     *
     * @return {void}
     */
    onFailToShowAd(event) {
        this.props.onFailToShowAd(event);
    }

    /**
     * Triggers `this.props.onClickAd` when an ad is clicked.
     *
     * @param  {Object} event An object containing the event data
     *
     * @return {void}
     */
    onClickAd(event) {
        this.props.onClickAd(event);
    }

    /**
     * Triggers `this.props.onHideAd` when an ad is dismissed.
     *
     * @param  {Object} event An object containing the event data
     *
     * @return {void}
     */
    onHideAd(event) {
        this.props.onHideAd(event);
    }

    /**
     * Triggers `this.props.onStartAdAudio` when an ad is about to start playing
     * audio.
     *
     * @param  {Object} event An object containing the event data
     *
     * @return {void}
     */
    onStartAdAudio(event) {
        this.props.onStartAdAudio(event);
    }

    /**
     * Triggers `this.props.onFinishAdAudio` when an ad has finished playing
     * audio.
     *
     * @param  {Object} event An object containing the event data
     *
     * @return {void}
     */
    onFinishAdAudio(event) {
        this.props.onFinishAdAudio(event);
    }

    /* Component lifecycle */

    /**
     * Invoked once, immediately before the initial rendering occurs.
     *
     * @return {void}
     */
    componentWillMount() {
        this.emitter.addListener('DidReceiveAd', this.props.onReceiveAd);
        this.emitter.addListener('DidFailToReceiveAd', this.props.onFailToReceiveAd);
        this.emitter.addListener('DidShowAd', this.props.onShowAd);
        this.emitter.addListener('DidFailToShowAd', this.props.onFailToShowAd);
        this.emitter.addListener('DidClickAd', this.props.onClickAd);
        this.emitter.addListener('DidHideAd', this.props.onHideAd);
        this.emitter.addListener('WillStartAdAudio', this.props.onStartAdAudio);
        this.emitter.addListener('DidFinishAdAudio', this.props.onFinishAdAudio);
    }

    /**
     * Invoked immediately before a component is unmounted from the DOM.
     *
     * @return {void}
     */
    componentWillUnmount() {
        this.emitter.removeAllListeners();
    }

    /**
     * Renders a component. Usually there would be some JSX here, but Heyzap
     * doesn't need to render anything, so it returns `null`.
     *
     * @return {null}
     */
    render() {
        return null;
    }
};

/**
 * Property types for `Heyzap`.
 *
 * @type {Object}
 */
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

/**
 * Default property values for `Heyzap`.
 * @type {Object}
 */
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
