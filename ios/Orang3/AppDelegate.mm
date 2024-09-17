#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

// Custom import
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Custom Google API key (must be first call here)
  NSString *GOOGLE_MAPS_API_KEY = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"GOOGLE_MAPS_API_KEY"];
  [GMSServices provideAPIKey: GOOGLE_MAPS_API_KEY];

  self.moduleName = @"Orang3";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  bool didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  if (didFinish) {
    RCTRootView *rootView = (RCTRootView *)self.window.rootViewController.view;
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
    [rootView setLoadingView:[[storyboard instantiateInitialViewController] view]];
    rootView.loadingViewFadeDelay = 0.5;
    rootView.loadingViewFadeDuration = 0.2;
  }

  return didFinish;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}
 
- (NSURL *)bundleURL
{
#if DEBUG  
 return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else  
 return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
