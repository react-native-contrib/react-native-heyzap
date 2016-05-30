#import "Heyzap.h"

@implementation Heyzap

RCT_EXPORT_MODULE(Heyzap)

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(initialize : (NSString *)publisherId) {
  [HeyzapAds startWithPublisherID:publisherId];
}

RCT_EXPORT_METHOD(showDebugPanel) {
  [HeyzapAds presentMediationDebugViewController];
}

RCT_EXPORT_METHOD(showInterstitialAd) { [HZInterstitialAd show]; }

RCT_EXPORT_METHOD(fetchVideoAd) { [HZVideoAd fetch]; }

RCT_EXPORT_METHOD(showVideoAd) { [HZVideoAd show]; }

RCT_EXPORT_METHOD(fetchIncentivizedAd) { [HZIncentivizedAd fetch]; }

RCT_EXPORT_METHOD(showIncentivizedAd) { [HZIncentivizedAd show]; }

@end
