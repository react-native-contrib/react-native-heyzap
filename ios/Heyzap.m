#import "Heyzap.h"

@implementation Heyzap

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(Heyzap)

NSString *const ERROR_DOMAIN = @"HEYZAP";

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (void)addObservers {
  [[NSNotificationCenter defaultCenter]
      addObserver:self
         selector:@selector(didReceiveAdNotificationHandler:)
             name:HZMediationDidReceiveAdNotification
           object:nil];

  [[NSNotificationCenter defaultCenter]
      addObserver:self
         selector:@selector(didFailToReceiveAdNotificationHandler:)
             name:HZMediationDidFailToReceiveAdNotification
           object:nil];

  [[NSNotificationCenter defaultCenter]
      addObserver:self
         selector:@selector(didShowAdNotificationHandler:)
             name:HZMediationDidShowAdNotification
           object:nil];

  [[NSNotificationCenter defaultCenter]
      addObserver:self
         selector:@selector(didFailToShowAdNotificationHandler:andError:)
             name:HZMediationDidFailToShowAdNotification
           object:nil];

  [[NSNotificationCenter defaultCenter]
      addObserver:self
         selector:@selector(didClickAdNotificationHandler:)
             name:HZMediationDidClickAdNotification
           object:nil];

  [[NSNotificationCenter defaultCenter]
      addObserver:self
         selector:@selector(didHideAdNotificationHandler:)
             name:HZMediationDidHideAdNotification
           object:nil];

  [[NSNotificationCenter defaultCenter]
      addObserver:self
         selector:@selector(willStartAdAudioNotificationHandler:)
             name:HZMediationWillStartAdAudioNotification
           object:nil];

  [[NSNotificationCenter defaultCenter]
      addObserver:self
         selector:@selector(didFinishAdAudioNotificationHandler:)
             name:HZMediationDidFinishAdAudioNotification
           object:nil];

  [[NSNotificationCenter defaultCenter]
      addObserver:self
         selector:@selector(didCompleteIncentivizedAdNotificationHandler:)
             name:HZMediationDidCompleteIncentivizedAdNotification
           object:nil];

  [[NSNotificationCenter defaultCenter]
      addObserver:self
         selector:@selector(didFailToCompleteIncentivizedAdNotificationHandler:)
             name:HZMediationDidFailToCompleteIncentivizedAdNotification
           object:nil];
}

RCT_EXPORT_METHOD(start
                  : (NSString *)publisherId resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {

  [HeyzapAds startWithPublisherID:publisherId];
  if ([HeyzapAds isStarted]) {
    [self addObservers];

    NSArray *options = [NSArray
        arrayWithObjects:
            [NSNumber numberWithInteger:HZAdOptionsDisableAutoPrefetching],
            [NSNumber numberWithInteger:HZAdOptionsInstallTrackingOnly],
            [NSNumber numberWithInteger:HZAdOptionsDisableMedation],
            [NSNumber
                numberWithInteger:HZAdOptionsDisableAutomaticIAPRecording],
            [NSNumber numberWithInteger:HZAdOptionsChildDirectedAds], nil];
    return resolve(options);
  }

  NSString *errorMessage = @"Heyzap failed to start";
  return reject(
      ERROR_DOMAIN, errorMessage,
      [NSError errorWithDomain:ERROR_DOMAIN code:-57 userInfo:errorMessage]);
}

RCT_EXPORT_METHOD(showDebugPanel) {
  [HeyzapAds presentMediationDebugViewController];
}

RCT_EXPORT_METHOD(showInterstitialAd
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  if ([HZInterstitialAd isAvailable]) {
    [HZInterstitialAd show];
    return resolve([NSMutableDictionary dictionary]);
  }

  NSString *errorMessage = @"An interstitial ad is not available";
  return reject(
      ERROR_DOMAIN, errorMessage,
      [NSError errorWithDomain:ERROR_DOMAIN code:-57 userInfo:errorMessage]);
}

RCT_EXPORT_METHOD(fetchVideoAd
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {

  [HZVideoAd fetchWithCompletion:^(BOOL result, NSError *error) {
    if (result) {
      return resolve([NSMutableDictionary dictionary]);
    }
    return reject(ERROR_DOMAIN, @"A video ad could not be fetched", error);
  }];
}

RCT_EXPORT_METHOD(showVideoAd
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  if ([HZVideoAd isAvailable]) {
    [HZVideoAd show];
    return resolve([NSMutableDictionary dictionary]);
  }

  NSString *errorMessage = @"A video ad is not available";
  return reject(
      ERROR_DOMAIN, errorMessage,
      [NSError errorWithDomain:ERROR_DOMAIN code:-57 userInfo:errorMessage]);
}

RCT_EXPORT_METHOD(fetchIncentivizedAd
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  [HZIncentivizedAd fetchWithCompletion:^(BOOL result, NSError *error) {
    if (result) {
      return resolve([NSMutableDictionary dictionary]);
    }
    return reject(ERROR_DOMAIN, @"An incentivized ad could not be fetched",
                  error);
  }];
}

RCT_EXPORT_METHOD(showIncentivizedAd
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  if ([HZIncentivizedAd isAvailable]) {
    [HZIncentivizedAd show];
    return resolve([NSMutableDictionary dictionary]);
  }

  NSString *errorMessage = @"An incentivized ad is not available";
  return reject(
      ERROR_DOMAIN, errorMessage,
      [NSError errorWithDomain:ERROR_DOMAIN code:-57 userInfo:errorMessage]);
}

#pragma mark - Observers

- (void)didReceiveAdNotificationHandler:(NSNotification *)notification {
  NSString *tagName = notification.userInfo[@"HZAdTagUserInfoKey"];

  [self.bridge.eventDispatcher sendAppEventWithName:@"DidReceiveAd"
                                               body:@{
                                                 @"tag" : tagName
                                               }];
}

- (void)didFailToReceiveAdNotificationHandler:(NSNotification *)notification {
  NSString *tagName = notification.userInfo[@"HZAdTagUserInfoKey"];

  [self.bridge.eventDispatcher sendAppEventWithName:@"DidFailToReceiveAd"
                                               body:@{
                                                 @"tag" : tagName
                                               }];
}

- (void)didShowAdNotificationHandler:(NSNotification *)notification {
  NSString *tagName = notification.userInfo[@"HZAdTagUserInfoKey"];
  NSString *networkName = notification.userInfo[@"HZNetworkNameUserInfoKey"];

  [self.bridge.eventDispatcher sendAppEventWithName:@"DidShowAd"
                                               body:@{
                                                 @"tag" : tagName,
                                                 @"network" : networkName
                                               }];
}

- (void)didFailToShowAdNotificationHandler:(NSNotification *)notification
                                  andError:(NSError *)error {
  NSString *tagName = notification.userInfo[@"HZAdTagUserInfoKey"];
  NSString *networkName =
      [notification.userInfo objectForKey:@"HZNetworkNameUserInfoKey"]
          ? notification.userInfo[@"HZNetworkNameUserInfoKey"]
          : nil;
  NSString *errorName =
      [notification.userInfo objectForKey:@"NSUnderlyingErrorKey"]
          ? notification.userInfo[@"NSUnderlyingErrorKey"]
          : nil;

  [self.bridge.eventDispatcher sendAppEventWithName:@"DidFailToShowAd"
                                               body:@{
                                                 @"tag" : tagName,
                                                 @"network" : networkName,
                                                 @"error" : errorName
                                               }];
}

- (void)didClickAdNotificationHandler:(NSNotification *)notification {
  NSString *tagName = notification.userInfo[@"HZAdTagUserInfoKey"];
  NSString *networkName = notification.userInfo[@"HZNetworkNameUserInfoKey"];

  [self.bridge.eventDispatcher sendAppEventWithName:@"DidClickAd"
                                               body:@{
                                                 @"tag" : tagName,
                                                 @"network" : networkName
                                               }];
}

- (void)didHideAdNotificationHandler:(NSNotification *)notification {
  NSString *tagName = notification.userInfo[@"HZAdTagUserInfoKey"];
  NSString *networkName = notification.userInfo[@"HZNetworkNameUserInfoKey"];

  [self.bridge.eventDispatcher sendAppEventWithName:@"DidHideAd"
                                               body:@{
                                                 @"tag" : tagName,
                                                 @"network" : networkName
                                               }];
}

- (void)willStartAdAudioNotificationHandler:(NSNotification *)notification {
  NSString *tagName = notification.userInfo[@"HZAdTagUserInfoKey"];
  NSString *networkName = notification.userInfo[@"HZNetworkNameUserInfoKey"];

  [self.bridge.eventDispatcher sendAppEventWithName:@"WillStartAdAudio"
                                               body:@{
                                                 @"tag" : tagName,
                                                 @"network" : networkName
                                               }];
}

- (void)didFinishAdAudioNotificationHandler:(NSNotification *)notification {
  NSString *tagName = notification.userInfo[@"HZAdTagUserInfoKey"];
  NSString *networkName = notification.userInfo[@"HZNetworkNameUserInfoKey"];

  [self.bridge.eventDispatcher sendAppEventWithName:@"DidFinishAdAudio"
                                               body:@{
                                                 @"tag" : tagName,
                                                 @"network" : networkName
                                               }];
}

- (void)didCompleteIncentivizedAdNotificationHandler:
        (NSNotification *)notification {
  NSString *tagName = notification.userInfo[@"HZAdTagUserInfoKey"];
  NSString *networkName = notification.userInfo[@"HZNetworkNameUserInfoKey"];

  [self.bridge.eventDispatcher sendAppEventWithName:@"DidCompleteIncentivizedAd"
                                               body:@{
                                                 @"tag" : tagName,
                                                 @"network" : networkName
                                               }];
}

- (void)didFailToCompleteIncentivizedAdNotificationHandler:
        (NSNotification *)notification {
  NSString *tagName = notification.userInfo[@"HZAdTagUserInfoKey"];
  NSString *networkName = notification.userInfo[@"HZNetworkNameUserInfoKey"];

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"DidFailToCompleteIncentivizedAd"
                      body:@{
                        @"tag" : tagName,
                        @"network" : networkName
                      }];
}

@end
