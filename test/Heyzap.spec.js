'use strict';

let chai   = require('chai');
let mock = require('mock-require');
let sinon = require('sinon');

let expect = chai.expect;

let heyzapStub = sinon.stub({
    initialize: (publisherId) => {},
    showDebugPanel: () => {},
    showInterstitialAd: () => {},
    fetchVideoAd: () => {},
    showVideoAd: () => {},
    fetchIncentivizedAd: () => {},
    showIncentivizedAd: () => {},
});

mock('NativeModules', {
    Heyzap: heyzapStub,
});
let heyzap = require('../src/Heyzap');

describe('Heyzap', () => {

    it('should initialize', () => {
        let publisherId = 'publisher-id';
        heyzap.initialize(publisherId);

        expect(heyzapStub.initialize.calledWith(publisherId)).to.be.true;
    });

    it('should show the debug panel', () => {
        heyzap.showDebugPanel();

        expect(heyzapStub.showDebugPanel.calledOnce).to.be.true;
    });

    it('should show an interstitial ad', () => {
        heyzap.showInterstitialAd();

        expect(heyzapStub.showInterstitialAd.calledOnce).to.be.true;
    });

    it('should fetch a video ad', () => {
        heyzap.fetchVideoAd();

        expect(heyzapStub.fetchVideoAd.calledOnce).to.be.true;
    });

    it('should show a video ad', () => {
        heyzap.showVideoAd();

        expect(heyzapStub.showVideoAd.calledOnce).to.be.true;
    });

    it('should fetch an incentivized ad', () => {
        heyzap.fetchIncentivizedAd();

        expect(heyzapStub.fetchIncentivizedAd.calledOnce).to.be.true;
    });

    it('should show an incentivized ad', () => {
        heyzap.showIncentivizedAd();

        expect(heyzapStub.showIncentivizedAd.calledOnce).to.be.true;
    });

});
