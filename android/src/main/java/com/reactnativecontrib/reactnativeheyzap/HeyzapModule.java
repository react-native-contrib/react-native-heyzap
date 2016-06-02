package com.reactnativecontrib.reactnativeheyzap;

import android.content.Intent;
import android.support.annotation.Nullable;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.heyzap.sdk.ads.HeyzapAds;
import com.heyzap.sdk.ads.IncentivizedAd;
import com.heyzap.sdk.ads.InterstitialAd;
import com.heyzap.sdk.ads.VideoAd;

public class HeyzapModule extends ReactContextBaseJavaModule implements LifecycleEventListener, ActivityEventListener {

  ReactApplicationContext reactContext;

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
    reactContext.addActivityEventListener(this);
  }

  /**
   * A convenience method for sending events to Javascript.
   *
   * @param eventName The name of the event to send
   * @param params    Any parameters to send with the event
   */
  private void sendEvent(String eventName, @Nullable WritableMap params) {
    this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
  }

  /**
   * Adds Heyzap listeners
   */
  private void addListeners() {
    HeyzapAds.OnStatusListener statusListener = new HeyzapAds.OnStatusListener() {

      @Override
      public void onShow(String tag) {
        HeyzapModule.this.sendEvent("DidShowAd", Arguments.createMap());
      }

      @Override
      public void onClick(String tag) {
        HeyzapModule.this.sendEvent("DidClickAd", Arguments.createMap());
      }

      @Override
      public void onHide(String tag) {
        HeyzapModule.this.sendEvent("DidHideAd", Arguments.createMap());
      }

      @Override
      public void onFailedToShow(String tag) {
        HeyzapModule.this.sendEvent("DidFailToShowAd", Arguments.createMap());
      }

      @Override
      public void onAvailable(String tag) {
        HeyzapModule.this.sendEvent("DidReceiveAd", Arguments.createMap());
      }

      @Override
      public void onFailedToFetch(String tag) {
        HeyzapModule.this.sendEvent("DidFailToReceiveAd", Arguments.createMap());
      }

      @Override
      public void onAudioStarted() {
        HeyzapModule.this.sendEvent("WillStartAdAudio", Arguments.createMap());
      }

      @Override
      public void onAudioFinished() {
        HeyzapModule.this.sendEvent("DidFinishAdAudio", Arguments.createMap());
      }
    };

    HeyzapAds.OnIncentiveResultListener incentiveResultListener = new HeyzapAds.OnIncentiveResultListener() {

      @Override
      public void onComplete(String tag) {

      }

      @Override
      public void onIncomplete(String tag) {

      }
    };

    HeyzapAds.setNetworkCallbackListener(new HeyzapAds.NetworkCallbackListener() {
      @Override
      public void onNetworkCallback(String network, String event) {
        HeyzapModule.this.sendEvent("NETWORK", Arguments.createMap());
      }
    });

    InterstitialAd.setOnStatusListener(statusListener);
    VideoAd.setOnStatusListener(statusListener);
    IncentivizedAd.setOnStatusListener(statusListener);
    IncentivizedAd.setOnIncentiveResultListener(incentiveResultListener);
  }

  @Override
  public String getName() {
    return "Heyzap";
  }

  @ReactMethod
  public void start(final String publisherId, Promise promise) {
    try {
      HeyzapAds.start(publisherId, getCurrentActivity());
      this.addListeners();
      promise.resolve(true);

    } catch (Exception e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void showDebugPanel() {
    HeyzapAds.startTestActivity(getCurrentActivity());
  }

  @ReactMethod
  public void showInterstitialAd(Promise promise) {
    try {
      InterstitialAd.display(getCurrentActivity());
      promise.resolve(true);

    } catch (Exception e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void fetchVideoAd(Promise promise) {
    try {
      VideoAd.fetch();

    } catch (Exception e) {
      promise.reject(e);
    }
  }

  /**
   * Shows a VideoAd if it has already been fetched.
   */
  @ReactMethod
  public void showVideoAd(Promise promise) {
    try {
      if (VideoAd.isAvailable()) {
        VideoAd.display(getCurrentActivity());
        promise.resolve(true);
      }

      throw new Exception("A video ad is currently unavailable");

    } catch (Exception e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void fetchIncentivizedAd(Promise promise) {
    try {
      IncentivizedAd.fetch();
      promise.resolve(true);

    } catch (Exception e) {
      promise.reject(e);
    }

  }

  /**
   * Shows an IncentivizedAd if it has already been fetched.
   */
  @ReactMethod
  public void showIncentivizedAd(Promise promise) {
    try {
      if (IncentivizedAd.isAvailable()) {
        IncentivizedAd.display(getCurrentActivity());
        promise.resolve(true);
      }

      throw new Exception("An incentivized ad is currently unavailable");

    } catch (Exception e) {
      promise.reject(e);
    }
  }

  /**
   * Called when host (activity/service) receives an {@link Activity#onActivityResult} call.
   *
   * @param requestCode
   * @param resultCode
   * @param data
   */
  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {

  }

  /**
   * Called when host (activity/service) receives resume event (e.g. {@link Activity#onResume}
   */
  @Override
  public void onHostResume() {

  }

  /**
   * Called when host (activity/service) receives pause event (e.g. {@link Activity#onPause}
   */
  @Override
  public void onHostPause() {

  }

  /**
   * Called when host (activity/service) receives destroy event (e.g. {@link Activity#onDestroy}
   */
  @Override
  public void onHostDestroy() {

  }

}
