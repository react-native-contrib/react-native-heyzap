package com.heyzap.reactnative;

import android.support.annotation.Nullable;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.heyzap.sdk.ads.HeyzapAds;
import com.heyzap.sdk.ads.IncentivizedAd;
import com.heyzap.sdk.ads.InterstitialAd;
import com.heyzap.sdk.ads.VideoAd;

public class HeyzapModule extends ReactContextBaseJavaModule implements LifecycleEventListener, HeyzapAds.OnStatusListener {

  ReactApplicationContext reactContext;
  HeyzapAds heyzapAds;

  /**
   * Creates a new instance of this module.
   *
   * @param reactContext The React catalyst context
   */
  public HeyzapModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

    // Get lifecycle notifications to flush Heyzap on pause or destroy
    reactContext.addLifecycleEventListener(this);

    // Add Heyzap event listeners
    InterstitialAd.setOnStatusListener(this);
    VideoAd.setOnStatusListener(this);
    IncentivizedAd.setOnStatusListener(this);
  }

  private void sendEvent(String eventName, @Nullable WritableMap params) {
    this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
  }

  @Override
  public String getName() {
    return "Heyzap";
  }

  @ReactMethod
  public void initialize(final String publisherId) {
    HeyzapAds.start(publisherId, getCurrentActivity());
  }

  @ReactMethod
  public void showDebugPanel() {
    HeyzapAds.startTestActivity(getCurrentActivity());
  }

  @ReactMethod
  public void showInterstitialAd() {
    InterstitialAd.display(getCurrentActivity());
  }

  @ReactMethod
  public void fetchVideoAd() {
    VideoAd.fetch();
  }

  /**
   * Shows a VideoAd if it has already been fetched.
   */
  @ReactMethod
  public void showVideoAd() {
    if (VideoAd.isAvailable()) {
      VideoAd.display(getCurrentActivity());
    }
  }

  @ReactMethod
  public void fetchIncentivizedAd() {
    IncentivizedAd.fetch();
  }

  /**
   * Shows an IncentivizedAd if it has already been fetched.
   */
  @ReactMethod
  public void showIncentivizedAd() {
    if (IncentivizedAd.isAvailable()) {
      IncentivizedAd.display(getCurrentActivity());
    }
  }

  @Override
  public void onHostResume() {

  }

  @Override
  public void onHostPause() {

  }

  @Override
  public void onHostDestroy() {

  }

  @Override
  public void onShow(String s) {
    this.sendEvent("DidShowAd", Arguments.createMap());
  }

  @Override
  public void onClick(String s) {
    this.sendEvent("DidClickAd", Arguments.createMap());
  }

  @Override
  public void onHide(String s) {
    this.sendEvent("DidHideAd", Arguments.createMap());
  }

  @Override
  public void onFailedToShow(String s) {
    this.sendEvent("DidFailToShowAd", Arguments.createMap());
  }

  @Override
  public void onAvailable(String s) {
    this.sendEvent("DidReceiveAd", Arguments.createMap());
  }

  @Override
  public void onFailedToFetch(String s) {
    this.sendEvent("DidFailToReceiveAd", Arguments.createMap());
  }

  @Override
  public void onAudioStarted() {
    this.sendEvent("WillStartAdAudio", Arguments.createMap());
  }

  @Override
  public void onAudioFinished() {
    this.sendEvent("DidFinishAdAudio", Arguments.createMap());
  }
}
