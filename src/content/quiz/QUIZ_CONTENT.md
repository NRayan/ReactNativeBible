# Quiz Content Map

## Under the Hood

1. What was the main performance problem with the Bridge in the Old Architecture? (base answer: serializing everything to JSON + a shared asynchronous queue — becomes a bottleneck for large updates, long lists, and fast gestures)
2. What does JSI allow that the Bridge didn't? (base answer: JS holding direct references to native C++ objects and calling native methods synchronously, with no serialization)
3. Why are TurboModules faster for app startup time than the old Native Modules? (base answer: lazy loading — a module is only instantiated on first use, instead of eagerly loading every module at startup)
4. What does Fabric move to C++ compared to the old UIManager? (base answer: the shadow tree, previously computed in JS — now shared in C++ between the JS reconciler and native rendering via JSI, enabling synchronous measurements)
5. What is the role of Codegen in the New Architecture? (base answer: generates C++ code from TypeScript specs at build time, ensuring any JS/native mismatch becomes a build error instead of a runtime crash)
6. What did Fiber introduce that the old React reconciler didn't have? (base answer: pausable/resumable units of work, allowing rendering to be split into chunks and urgent updates to be prioritized over low-priority ones)
7. Why couldn't the Old Architecture become synchronous, regardless of device speed? (base answer: the limitation was structural — the Bridge only supported fire-and-forget asynchronous communication by design, not due to lack of hardware performance)
8. Which option correctly describes how the pieces of the New Architecture relate to each other? (base answer: JSI is the foundation that enables synchronous communication; TurboModules and Fabric are built on top of it — TurboModules for native modules, Fabric for rendering; Codegen generates the C++ code that ensures JS and native honor the same contract)

## Layout

1. What is the default value of `flexDirection` in React Native, and how does it differ from the web? (base answer: `"column"` — unlike CSS on the web, where the default is `"row"`; that's why children stack vertically by default)
2. How do `justifyContent` and `alignItems` behave when `flexDirection` switches from `"column"` to `"row"`? (base answer: the axes flip — `justifyContent` now controls horizontal alignment and `alignItems` controls vertical)
3. What is a `position: "absolute"` element positioned relative to? (base answer: its nearest parent, regardless of whether that parent is `"relative"` or `"absolute"` — unlike CSS on the web, which requires an explicit `position: relative` on the parent)
4. When two absolutely positioned elements overlap, what decides which one appears on top? (base answer: `zIndex` — a higher value renders on top; and this comparison only applies between siblings of the same parent, not globally)
5. What is the main difference between `Dimensions.get("window")` and `useWindowDimensions()`? (base answer: `Dimensions.get` returns a static snapshot at the time of the call; `useWindowDimensions` is reactive and automatically re-renders the component when dimensions change, e.g. on screen rotation)

## Performance

1. Why do animations running with `useNativeDriver: true` stay smooth even when the JS thread is blocked? (base answer: those animations run entirely on the UI thread, so they're unaffected by any blocking that happens on the JS thread)
2. What is the main difference between how Hermes and V8/JavaScriptCore handle JavaScript compilation? (base answer: Hermes compiles to bytecode at build time and the app ships with that bytecode ready to run; V8/JSC parse and compile at runtime, which delays Time to Interactive)
3. Why is `keyExtractor` essential for `FlatList` performance? (base answer: gives each item a stable identity, letting FlatList efficiently recycle cells instead of recreating everything)
4. What does `getItemLayout` let `FlatList` skip, and why does that matter for `scrollToIndex`? (base answer: it skips the per-item measurement pass — it provides height/offset upfront; without it, `scrollToIndex` doesn't work correctly)
5. Why does defining `renderItem` inline break a `React.memo` optimization on the item component? (base answer: it creates a new function reference on every parent render, causing the item to re-render even with `React.memo`, since the prop looks "new" every time)
6. When does it make sense to use `useMemo`, and when can it cost more than it helps? (base answer: worth it for expensive computations — sorting/filtering a large array, deriving data from a big list — or when the result feeds a memoized child; for cheap operations, the cost of comparing dependencies can outweigh just recomputing)
7. When does it make sense to use `useCallback`, and what happens if the function isn't memoized in that case? (base answer: when the function is passed as a prop to a `React.memo` component, or appears in another hook's dependency array — without `useCallback`, the reference changes every render and breaks the memoization/re-triggers the hook)
8. Why is `FlatList` recommended over `ScrollView` for large lists? (base answer: `FlatList` virtualizes — it only renders items within a configurable window around the visible area and unmounts the rest to free memory; `ScrollView` renders all items at once, so large lists become heavy in memory and initial render time)

## Debugging

1. What is React Native DevTools and which tools does it bring together in one place? (base answer: the official debugger built on the Chrome DevTools Protocol — bundles the JS Debugger, React DevTools, Network inspector, and Console; requires Hermes and doesn't work with JavaScriptCore)
2. How should you interpret it when UI FPS drops but JS FPS stays high in the Performance Monitor? (base answer: the bottleneck is in native rendering — a heavy layout pass, too many views, or an expensive shadow tree update — not the JS thread)
3. What does the Profiler's flame chart show about each component, and what triggers a new commit? (base answer: each component's render duration per commit, and the reason for the re-render — prop change, state change, context change, or parent re-render)
4. Why is a source map needed to interpret a production stack trace? (base answer: the production bundle is minified — without a source map, the stack trace shows minified variable names and byte offsets, unrelated to the original TypeScript source)
5. What's the difference between how LogBox handles an uncaught error versus a `console.warn()`? (base answer: an uncaught error produces a full-screen red overlay with a stack trace; `console.warn()` shows up as a collapsible yellow banner at the bottom, without blocking the screen)
6. When an app crashes with no red screen and no Metro output, where is the problem usually located? (base answer: the fault is almost certainly in the native layer — something only tools like Logcat/Android Studio or Xcode/LLDB can reveal, not the JS debugger)

## Accessibility

1. What's the difference between `accessibilityLabel` and `accessibilityHint`? (base answer: `accessibilityLabel` announces what the element is; `accessibilityHint` announces, after a pause, what happens if the user activates it — used when the outcome isn't obvious from the label alone)
2. Why shouldn't you include the element's role inside `accessibilityLabel` (e.g. "Delete button")? (base answer: the screen reader already announces the role automatically from `accessibilityRole` — repeating it in the label is redundant and verbose)
3. What problem does `AccessibilityInfo.announceForAccessibility()` solve that a silent visual change wouldn't? (base answer: it notifies the screen reader about a state change that has no perceptible visual representation through direct reading — e.g. "item added to cart" after a background action)
4. In what order do screen readers navigate elements on screen, and what does NOT affect that order? (base answer: they follow document order — top to bottom, left to right, based on the component tree; visual positioning via `position: "absolute"` or `zIndex` does not change reading order)
5. What does `accessible={true}` do when applied to a container with multiple children? (base answer: collapses all its children into a single accessible element, announced using the container's `accessibilityLabel` — useful for cards and list items, avoiding fragmented, noisy reading)
6. What should be verified when testing an entire flow using only VoiceOver or TalkBack, without looking at the screen? (base answer: that every interactive element is reachable by swiping, announces a meaningful label and role, performs the expected action on double-tap, that modals trap focus, and that loading/success/error states are announced)

## Android

1. What is the purpose of the `AndroidManifest.xml` file? (base answer: declares the app's identity — package name, all components (activities, services, receivers, providers), and metadata the OS and Play Store need; Android won't run a component that isn't registered there)
2. What does the `gradlew` command do in a React Native Android project? (base answer: a wrapper script that downloads and runs the exact Gradle version declared in the project, ensuring consistent builds across machines — orchestrates dependency resolution, compilation, packaging, and R8)
3. What's the difference between `compileSdkVersion` and `targetSdkVersion`? (base answer: `compileSdkVersion` is the SDK the code compiles against, should always be the latest; `targetSdkVersion` indicates which version the app was designed and tested for, used by the OS to decide compatibility behaviors)
4. Where should Android permissions be declared in a React Native project? (base answer: in `AndroidManifest.xml`, with `<uses-permission>`; from API 23+, dangerous permissions also require runtime approval via `PermissionsAndroid`)
5. What is the Android SDK and what role does it play in React Native development? (base answer: a set of tools, libraries, and platform APIs — platform tools (`adb`), build tools (`aapt2`, `d8`), and the `android.jar` the code compiles against)
6. What is the JDK and why is it required to build Android apps? (base answer: Gradle runs on the JVM, so a JDK must be installed; `JAVA_HOME` must point to it — version mismatch is one of the most common setup failures)
7. What is an Android API Level and how does it affect a React Native app? (base answer: an integer that identifies each Android version and determines which APIs are available at runtime; calling a newer-level API on an older device crashes without a version guard)

## iOS

1. What is the purpose of the `Info.plist` file in an iOS React Native project? (base answer: a key-value XML file read by iOS before launching the app — declares name, bundle identifier, version, supported orientations, URL schemes, and usage description strings for permission prompts)
2. What does CocoaPods do in a React Native iOS project? (base answer: the dependency manager that installs and links every native iOS module, first-party or third-party; dependencies declared in the `Podfile`)
3. What command is used to install iOS dependencies in a React Native project? (base answer: `pod install`, inside the `ios/` folder — resolves the `Podfile`'s pods and generates the `.xcworkspace`)
4. What is the iOS Deployment Target and why does it matter? (base answer: the minimum iOS version the app runs on, set in the `Podfile` and in Xcode's settings — both must match, or it generates linker warnings/errors)
5. Where should iOS permissions be declared in a React Native project? (base answer: in `Info.plist`, with a usage description key per sensitive permission — without it, iOS silently crashes the app when the permission is requested)
6. What is the iOS Simulator and how does it differ from a real device? (base answer: runs natively compiled code, so it's fast, but it's a different binary than an App Store build — different CPU target; has real limitations like no push via APNs, camera, or NFC)

## Publishing

1. What is the purpose of a keystore file when publishing an Android app? (base answer: a binary holding the key pairs used to sign the app — Google Play ties updates to the signing key; losing the keystore prevents publishing updates to an existing listing, unless Play App Signing was enrolled)
2. What's the difference between a debug build and a release build in React Native? (base answer: release builds are generated via `./gradlew assembleRelease`/`bundleRelease` and go through optimizations like R8; debug builds via `assembleDebug` are faster to generate but aren't the distribution artifacts)
3. What can and can't be updated via OTA in React Native? (base answer: only the JavaScript layer and static assets are updatable via OTA; changes to native code, new native modules, or updated native SDKs always require a full store submission)
4. What is App Store Connect used for? (base answer: Apple's portal for managing listing, metadata, screenshots, build submission, and TestFlight distribution)
5. What is the purpose of a provisioning profile in iOS publishing? (base answer: a file that binds a certificate, an App ID, and a set of devices or a distribution method — together with the certificate, it forms the signing identity Xcode uses)
6. What's the difference between `versionCode` and `versionName` on Android? (base answer: `versionCode` is the internal integer Google Play uses to know if one build is newer than another; `versionName` is the human-readable string shown to the user, e.g. "1.2.0")
