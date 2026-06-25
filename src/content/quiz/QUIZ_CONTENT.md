# Quiz Content Map

## Layout

1. What is the default value of `flexDirection` in React Native?
2. What is the default value of `alignContent` in React Native?
3. What is the default value of `position` in React Native?
4. An element with `position: 'absolute'` in React Native is positioned relative to which ancestor?
5. Which statement about `useWindowDimensions` is correct?
6. On Android, what does `Dimensions.get('window')` exclude compared to `Dimensions.get('screen')`?

## Performance

1. Which thread handles JavaScript execution in React Native?
2. What is the main advantage of the Hermes engine over V8 in React Native?
3. Which `FlatList` prop prevents unnecessary re-renders of list items?
4. What does `useMemo` do when its dependency array is empty?
5. What happens when the JS thread is blocked in React Native?
6. Which prop should you always provide to `FlatList` to help it recycle list items efficiently?
7. Why is it recommended to wrap `FlatList`'s `renderItem` with `useCallback`?

## Under the Hood

1. What was the main bottleneck of the Old Architecture's Bridge?
2. What does JSI stand for and what problem does it solve?
3. Which component of the New Architecture replaces the Bridge for native module communication?
4. What is the role of Codegen in the New Architecture?
5. What is Fabric responsible for in React Native?
6. What does the Fiber reconciler do in React?
7. Which serialization format did the Old Bridge use to communicate between JS and native?
8. What is the difference between TurboModules and the old Native Modules?

## Debugging

1. What tool is used to debug React Native apps in the New Architecture?
2. What does the Performance Monitor overlay display?
3. What is the purpose of the Profiler tab in React Native DevTools?
4. What is a source map used for in React Native debugging?
5. What does LogBox display?

## Accessibility

1. What is the purpose of the `accessibilityLabel` prop?
2. What does `accessibilityHint` provide to screen reader users?
3. Which prop makes a component invisible to screen readers?
4. What does `AccessibilityInfo.isScreenReaderEnabled()` return?
5. What is the default `accessibilityRole` of a `TouchableOpacity`?
6. Which prop controls the order in which a screen reader focuses elements?

## Android

1. What is the purpose of the `AndroidManifest.xml` file?
2. What does the `gradlew` command do in an Android React Native project?
3. What is the difference between `compileSdkVersion` and `targetSdkVersion`?
4. Where should Android permissions be declared in a React Native project?
5. What is the Android SDK and what role does it play in React Native development?
6. What is the JDK and why is it required to build Android apps?
7. What is an Android API Level and how does it affect a React Native app?

## iOS

1. What is the purpose of the `Info.plist` file in an iOS React Native project?
2. What does CocoaPods do in a React Native iOS project?
3. What command is used to install iOS dependencies in a React Native project?
4. What is the iOS Deployment Target and why does it matter?
5. Where should iOS permissions be declared in a React Native project?
6. What is the iOS Simulator and how does it differ from a real device?

## Publishing

1. What is the purpose of a keystore file in Android app publishing?
2. What is the difference between a debug and a release build in React Native?
3. What can and cannot be updated via OTA (Over the Air) in React Native?
4. What is App Store Connect used for?
5. What is the purpose of a provisioning profile in iOS publishing?
6. What is the difference between `versionCode` and `versionName` in Android?
