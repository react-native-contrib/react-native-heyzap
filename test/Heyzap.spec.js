'use strict';

let chai   = require('chai');
let mock = require('mock-require');
// let rewire = require('rewire');
let sinon = require('sinon');

let expect = chai.expect;

let NativeHeyzapMock = {
    initialize: (publisherId) => {},
    showDebugPanel: () => {},
    showInterstitialAd: () => {},
    fetchVideoAd: () => {},
    showVideoAd: () => {},
    fetchIncentivizedAd: () => {},
    showIncentivizedAd: () => {},
};

let stub = sinon.stub(NativeHeyzapMock);

mock('NativeModules', {
    Heyzap: stub,
});
let heyzap = require('../Heyzap');

describe('Heyzap', () => {

    it('should initialize', () => {
        let publisherId = 'publisher-id';
        heyzap.initialize(publisherId);

        expect(stub.initialize.calledWith(publisherId)).to.be.true;
    });

    it('should show the debug panel', () => {
        heyzap.showDebugPanel();

        expect(stub.showDebugPanel.calledOnce).to.be.true;
    });

    it('should show an interstitial ad', () => {
        heyzap.showInterstitialAd();

        expect(stub.showInterstitialAd.calledOnce).to.be.true;
    });

    it('should fetch a video ad', () => {
        heyzap.fetchVideoAd();

        expect(stub.fetchVideoAd.calledOnce).to.be.true;
    });

    it('should show a video ad', () => {
        heyzap.showVideoAd();

        expect(stub.showVideoAd.calledOnce).to.be.true;
    });

    it('should fetch an incentivized ad', () => {
        heyzap.fetchIncentivizedAd();

        expect(stub.fetchIncentivizedAd.calledOnce).to.be.true;
    });

    it('should show an incentivized ad', () => {
        heyzap.showIncentivizedAd();

        expect(stub.showIncentivizedAd.calledOnce).to.be.true;
    });

});
