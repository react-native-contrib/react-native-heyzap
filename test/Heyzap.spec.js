'use strict';

let rewire = require('rewire');
let sinon = require('sinon');

import React from 'react-native';
import {
    DeviceEventEmitter,
    NativeAppEventEmitter,
    NativeModules,
    Platform,
} from 'react-native';
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';

// let Heyzap = require('../src/Heyzap');

let returnsPromise = () => {
    return new Promise(function (fulfill, reject) {
        fulfill();
        // fs.readFile(filename, enc, function (err, res) {
        //     // if (err) reject(err);
        //     else fulfill(res);
        // });
    });
}

let heyzapStub = sinon.stub({
    start: (publisherId) => returnsPromise,
    showDebugPanel: () => {},
    showInterstitialAd: () => {},
    fetchVideoAd: () => {},
    showVideoAd: () => {},
    fetchIncentivizedAd: () => {},
    showIncentivizedAd: () => {},
});

let Heyzap = rewire('../src/Heyzap');

Heyzap.__set__('NativeHeyzap', heyzapStub);


describe('<Heyzap/>', () => {

  it('should render nothing', () => {
    const wrapper = shallow(<Heyzap publisherId="123" />);
    expect(wrapper).to.be.null;
    // let mockData = [
    //   { name: 'test' },
    //   { name: 'test' }
    // ];
    // let wrapper = shallow(<OurComponent items={mockData}/>);
    // let items = wrapper.findWhere((component) => {
    //   return component.props().children === 'test';
    // });
    // expect(items.length).to.equal(2);
  });

});

// describe('Heyzap', () => {

//     it('should initialize', () => {
//         let publisherId = 'publisher-id';
//         heyzap.initialize(publisherId);

//         expect(heyzapStub.initialize.calledWith(publisherId)).to.be.true;
//     });

//     it('should show the debug panel', () => {
//         heyzap.showDebugPanel();

//         expect(heyzapStub.showDebugPanel.calledOnce).to.be.true;
//     });

//     it('should show an interstitial ad', () => {
//         heyzap.showInterstitialAd();

//         expect(heyzapStub.showInterstitialAd.calledOnce).to.be.true;
//     });

//     it('should fetch a video ad', () => {
//         heyzap.fetchVideoAd();

//         expect(heyzapStub.fetchVideoAd.calledOnce).to.be.true;
//     });

//     it('should show a video ad', () => {
//         heyzap.showVideoAd();

//         expect(heyzapStub.showVideoAd.calledOnce).to.be.true;
//     });

//     it('should fetch an incentivized ad', () => {
//         heyzap.fetchIncentivizedAd();

//         expect(heyzapStub.fetchIncentivizedAd.calledOnce).to.be.true;
//     });

//     it('should show an incentivized ad', () => {
//         heyzap.showIncentivizedAd();

//         expect(heyzapStub.showIncentivizedAd.calledOnce).to.be.true;
//     });

// });
