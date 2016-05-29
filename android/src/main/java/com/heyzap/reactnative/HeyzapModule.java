package com.heyzap.reactnative;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.heyzap.sdk.ads.HeyzapAds;
import com.heyzap.sdk.ads.IncentivizedAd;
import com.heyzap.sdk.ads.InterstitialAd;
import com.heyzap.sdk.ads.VideoAd;

public class HeyzapModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

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
  }

  @Override
  public String getName() {
    return "Heyzap";
  }

  @ReactMethod
  public void initialize(final String publisherId) {
    heyzapAds.start(publisherId, getCurrentActivity());
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
}
