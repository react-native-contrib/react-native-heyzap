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
      [NSError
          errorWithDomain:ERROR_DOMAIN
                     code:-57
                 userInfo:[NSDictionary
                              dictionaryWithObjectsAndKeys:ERROR_DOMAIN,
                                                           errorMessage, nil]]);
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

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"DidReceiveAd"
                      body:@{
                        @"tag" : notification.userInfo[@"HZAdTagUserInfoKey"]
                      }];
}

- (void)didFailToReceiveAdNotificationHandler:(NSNotification *)notification {

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"DidFailToReceiveAd"
                      body:@{
                        @"tag" : notification.userInfo[@"HZAdTagUserInfoKey"]
                      }];
}

- (void)didShowAdNotificationHandler:(NSNotification *)notification {

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"DidShowAd"
                      body:@{
                        @"tag" : notification.userInfo[@"HZAdTagUserInfoKey"],
                        @"network" :
                            notification.userInfo[@"HZNetworkNameUserInfoKey"]
                      }];
}

- (void)didFailToShowAdNotificationHandler:(NSNotification *)notification
                                  andError:(NSError *)error {

  NSString *networkName = nil;
  NSString *errorReason = nil;

  if ([notification.userInfo objectForKey:@"HZNetworkNameUserInfoKey"]) {
    networkName = notification.userInfo[@"HZNetworkNameUserInfoKey"];
  }

  if ([notification.userInfo objectForKey:@"NSUnderlyingErrorKey"]) {
    errorReason = notification.userInfo[@"NSUnderlyingErrorKey"];
  }

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"DidFailToShowAd"
                      body:@{
                        @"tag" : notification.userInfo[@"HZAdTagUserInfoKey"],
                        @"network" : networkName,
                        @"errorReason" : errorReason,
                        @"error" : error
                      }];
}

- (void)didClickAdNotificationHandler:(NSNotification *)notification {

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"DidClickAd"
                      body:@{
                        @"tag" : notification.userInfo[@"HZAdTagUserInfoKey"],
                        @"network" :
                            notification.userInfo[@"HZNetworkNameUserInfoKey"]
                      }];
}

- (void)didHideAdNotificationHandler:(NSNotification *)notification {

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"DidHideAd"
                      body:@{
                        @"tag" : notification.userInfo[@"HZAdTagUserInfoKey"],
                        @"network" :
                            notification.userInfo[@"HZNetworkNameUserInfoKey"]
                      }];
}

- (void)willStartAdAudioNotificationHandler:(NSNotification *)notification {

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"WillStartAdAudio"
                      body:@{
                        @"tag" : notification.userInfo[@"HZAdTagUserInfoKey"],
                        @"network" :
                            notification.userInfo[@"HZNetworkNameUserInfoKey"]
                      }];
}

- (void)didFinishAdAudioNotificationHandler:(NSNotification *)notification {

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"DidFinishAdAudio"
                      body:@{
                        @"tag" : notification.userInfo[@"HZAdTagUserInfoKey"],
                        @"network" :
                            notification.userInfo[@"HZNetworkNameUserInfoKey"]
                      }];
}

- (void)didCompleteIncentivizedAdNotificationHandler:
        (NSNotification *)notification {

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"DidCompleteIncentivizedAd"
                      body:@{
                        @"tag" : notification.userInfo[@"HZAdTagUserInfoKey"],
                        @"network" :
                            notification.userInfo[@"HZNetworkNameUserInfoKey"]
                      }];
}

- (void)didFailToCompleteIncentivizedAdNotificationHandler:
        (NSNotification *)notification {

  [self.bridge.eventDispatcher
      sendAppEventWithName:@"DidFailToCompleteIncentivizedAd"
                      body:@{
                        @"tag" : notification.userInfo[@"HZAdTagUserInfoKey"],
                        @"network" :
                            notification.userInfo[@"HZNetworkNameUserInfoKey"]
                      }];
}

@end
