'use strict';

let rewire = require('rewire');
let sinon = require('sinon');
require('sinon-as-promised');

import React from 'react-native';
import {
    DeviceEventEmitter,
    NativeAppEventEmitter,
    NativeModules,
    Platform,
} from 'react-native';
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';

let NativeHeyzapMock = {
    start: (publisherId) => sinon.stub().resolves(true)(),
    showDebugPanel: sinon.spy(),
    showInterstitialAd: () => sinon.stub().resolves(true)(),
    fetchVideoAd: () => sinon.stub().resolves(true)(),
    showVideoAd: () => sinon.stub().resolves(true)(),
    fetchIncentivizedAd: () => sinon.stub().resolves(true)(),
    showIncentivizedAd: () => sinon.stub().resolves(true)(),
};

let Heyzap = rewire('../src/Heyzap');
Heyzap.__set__('NativeHeyzap', NativeHeyzapMock);

describe('<Heyzap/>', () => {

    it('should render nothing', () => {
        const wrapper = shallow(<Heyzap publisherId="123" />);
        expect(wrapper.length).to.equal(1);
    });

    it('should show the debug panel', () => {
        const wrapper = shallow(<Heyzap publisherId="123" />);
        wrapper.instance().showDebugPanel();
        expect(NativeHeyzapMock.showDebugPanel.calledOnce).to.be.true;
    });

    it('should show an interstitial ad', () => {
        const wrapper = shallow(<Heyzap publisherId="123" />);
        wrapper.instance().showInterstitialAd().then(() => {
            expect(NativeHeyzapMock.showInterstitialAd.calledOnce).to.be.true;
        });
    });

    it('should fetch a video ad', () => {
        const wrapper = shallow(<Heyzap publisherId="123" />);
        wrapper.instance().fetchVideoAd().then(() => {
            expect(NativeHeyzapMock.fetchVideoAd.calledOnce).to.be.true;
        });
    });

    it('should show a video ad', () => {
        const wrapper = shallow(<Heyzap publisherId="123" />);
        wrapper.instance().showVideoAd().then(() => {
            expect(NativeHeyzapMock.showVideoAd.calledOnce).to.be.true;
        });
    });

    it('should fetch an incentivized ad', () => {
        const wrapper = shallow(<Heyzap publisherId="123" />);
        wrapper.instance().fetchIncentivizedAd().then(() => {
            expect(NativeHeyzapMock.fetchIncentivizedAd.calledOnce).to.be.true;
        });
    });

    it('should show an incentivized ad', () => {
        const wrapper = shallow(<Heyzap publisherId="123" />);
        wrapper.instance().showIncentivizedAd().then(() => {
            expect(NativeHeyzapMock.showIncentivizedAd.calledOnce).to.be.true;
        });
    });

});
