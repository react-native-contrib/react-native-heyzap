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

import java.util.HashMap;
import java.util.Map;

public class HeyzapModule extends ReactContextBaseJavaModule implements LifecycleEventListener,
        ActivityEventListener {

    ReactApplicationContext reactContext;
    HeyzapAds.OnStatusListener statusListener;
    HeyzapAds.OnIncentiveResultListener incentiveResultListener;


    /**
     * Creates a new instance of this module.
     *
     * @param reactContext The React catalyst context
     */
    public HeyzapModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        HeyzapAds.framework = "react-native";

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

    private WritableMap createArgumentMap(String tag) {
        WritableMap map = Arguments.createMap();
        map.putString("tag", tag);
        return map;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put("NONE", HeyzapAds.NONE);
        constants.put("DISABLE_AUTOMATIC_FETCH", HeyzapAds.DISABLE_AUTOMATIC_FETCH);
        constants.put("INSTALL_TRACKING_ONLY", HeyzapAds.INSTALL_TRACKING_ONLY);
        constants.put("DISABLE_MEDIATION", HeyzapAds.DISABLE_MEDIATION);
        constants.put("NATIVE_ADS_ONLY", HeyzapAds.NATIVE_ADS_ONLY);
        constants.put("CHILD_DIRECTED_ADVERTISING", HeyzapAds.CHILD_DIRECTED_ADVERTISING);

        constants.put("HEYZAP", HeyzapAds.Network.HEYZAP);
        constants.put("FACEBOOK", HeyzapAds.Network.FACEBOOK);
        constants.put("UNITYADS", HeyzapAds.Network.UNITYADS);
        constants.put("APPLOVIN", HeyzapAds.Network.APPLOVIN);
        constants.put("VUNGLE", HeyzapAds.Network.VUNGLE);
        constants.put("CHARTBOOST", HeyzapAds.Network.CHARTBOOST);
        constants.put("ADCOLONY", HeyzapAds.Network.ADCOLONY);
        constants.put("ADMOB", HeyzapAds.Network.ADMOB);
        constants.put("IAD", HeyzapAds.Network.IAD);
        constants.put("HYPRMX", HeyzapAds.Network.HYPRMX);
        constants.put("INMOBI", HeyzapAds.Network.INMOBI);

        constants.put("INITIALIZED", HeyzapAds.NetworkCallback.INITIALIZED);
        constants.put("SHOW", HeyzapAds.NetworkCallback.SHOW);
        constants.put("AVAILABLE", HeyzapAds.NetworkCallback.AVAILABLE);
        constants.put("HIDE", HeyzapAds.NetworkCallback.HIDE);
        constants.put("FETCH_FAILED", HeyzapAds.NetworkCallback.FETCH_FAILED);
        constants.put("CLICK", HeyzapAds.NetworkCallback.CLICK);
        constants.put("DISMISS", HeyzapAds.NetworkCallback.DISMISS);
        constants.put("INCENTIVIZED_RESULT_COMPLETE",
                HeyzapAds.NetworkCallback.INCENTIVIZED_RESULT_COMPLETE);
        constants.put("INCENTIVIZED_RESULT_INCOMPLETE",
                HeyzapAds.NetworkCallback.INCENTIVIZED_RESULT_INCOMPLETE);
        constants.put("AUDIO_STARTING", HeyzapAds.NetworkCallback.AUDIO_STARTING);
        constants.put("AUDIO_FINISHED", HeyzapAds.NetworkCallback.AUDIO_FINISHED);
        constants.put("LEAVE_APPLICATION", HeyzapAds.NetworkCallback.LEAVE_APPLICATION);
        constants.put("DISPLAY_FAILED", HeyzapAds.NetworkCallback.DISPLAY_FAILED);

        return constants;
    }

    /**
     * Adds Heyzap listeners.
     */
    private void addListeners() {
        statusListener = new HeyzapAds.OnStatusListener() {

            @Override
            public void onShow(String tag) {
                HeyzapModule.this.sendEvent("DidShowAd", HeyzapModule.this.createArgumentMap(tag));
            }

            @Override
            public void onClick(String tag) {
                HeyzapModule.this.sendEvent("DidClickAd", HeyzapModule.this.createArgumentMap(tag));
            }

            @Override
            public void onHide(String tag) {
                HeyzapModule.this.sendEvent("DidHideAd", HeyzapModule.this.createArgumentMap(tag));
            }

            @Override
            public void onFailedToShow(String tag) {
                HeyzapModule.this.sendEvent("DidFailToShowAd", HeyzapModule.this.createArgumentMap(tag));
            }

            @Override
            public void onAvailable(String tag) {
                HeyzapModule.this.sendEvent("DidReceiveAd", HeyzapModule.this.createArgumentMap(tag));
            }

            @Override
            public void onFailedToFetch(String tag) {
                HeyzapModule.this.sendEvent("DidFailToReceiveAd", HeyzapModule.this.createArgumentMap(tag));
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

        incentiveResultListener = new HeyzapAds.OnIncentiveResultListener() {

            @Override
            public void onComplete(String tag) {
                HeyzapModule.this.sendEvent("DidCompleteIncentivizedAd", HeyzapModule.this.createArgumentMap(tag));
            }

            @Override
            public void onIncomplete(String tag) {
                HeyzapModule.this.sendEvent("DidFailToCompleteIncentivizedAd", HeyzapModule.this.createArgumentMap(tag));
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


    /**
     * Starts the Heyzap SDK.
     */
    @ReactMethod
    public void start(final String publisherId, Promise promise) {
        try {
            HeyzapAds.start(publisherId, getCurrentActivity());
            this.addListeners();
            promise.resolve(getStatus());

        } catch (Exception exception) {
            promise.reject(exception);
        }
    }
    }

    @ReactMethod
    public void showDebugPanel() {
        HeyzapAds.startTestActivity(getCurrentActivity());
    }

    /**
     * Shows an interstitial ad.
     */
    @ReactMethod
    public void showInterstitialAd(Promise promise) {
        try {
            InterstitialAd.display(getCurrentActivity());
            promise.resolve(true);

        } catch (Exception exception) {
            promise.reject(exception);
        }
    }

    /**
     * Fetches a video ad and returns a promise.
     */
    @ReactMethod
    public void fetchVideoAd(Promise promise) {
        try {
            VideoAd.fetch();
            promise.resolve(true);

        } catch (Exception exception) {
            promise.reject(exception);
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

        } catch (Exception exception) {
            promise.reject(exception);
        }
    }

    /**
     * Fetches an incentivized ad and returns a promise.
     */
    @ReactMethod
    public void fetchIncentivizedAd(Promise promise) {
        try {
            IncentivizedAd.fetch();
            promise.resolve(true);

        } catch (Exception exception) {
            promise.reject(exception);
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

        } catch (Exception exception) {
            promise.reject(exception);
        }
    }

    /**
     * Called when host (activity/service) receives an {@link Activity#onActivityResult} call.
     *
     * @param requestCode The integer request code originally supplied to
     *                    startActivityForResult().
     * @param resultCode The integer result code returned by the child activity
     *                   through its setResult().
     * @param data An Intent, which can return result data to the caller.
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
