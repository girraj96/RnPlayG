This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# Prepared some JEST test cases

Dashboard Screen Test Cases

- Mocks useAlbumStore
- Verifies album title is displayed
- Ensures component renders store-driven UI correctly
- Mocks actions.getAlbumList
- Verifies it runs inside useEffect
- Ensures lifecycle behavior is correct

AlbumDetails Screen Test Cases

- Validates: Album title, Artist name, Genre, Price, Description
- Shows Play button when previewUrl exists
- State update via useState
- Conditional rendering behavior
- User interaction flow

# Third-Party Libraries Used

This project uses the following third-party libraries to support scalability, offline capability, performance optimization, and clean architecture.

# @react-native-async-storage/async-storage

Purpose:
Used to persist album data locally to support offline mode.

Why Used:
The assignment requires the album list to be available without network connectivity. AsyncStorage provides a simple key-value storage mechanism suitable for caching API responses.

Pros:

- Official community-supported solution
- Easy to integrate
- Suitable for small to medium data sets
  -Stable and widely adopted

Cons:

- Not encrypted by default
- Not ideal for very large datasets
- Slower compared to native storage engines like MMKV

Alternatives Considered:

- react-native-mmkv, SQLite , Realm

AsyncStorage was chosen due to simplicity and suitability for this assignment scope.

# @react-native-community/netinfo

Purpose:
Detects network connectivity state.

Why Used:
Required to switch between online API data and locally cached data when offline.

Pros:

- Reliable network state detection
- Supports both iOS and Android
- Simple API

NetInfo was selected because it provides accurate device-level connectivity status.

# i18next & react-i18next

Purpose:
Internationalization (multi-language support).

Why Used:
Supports white-label architecture and scalability for multi-region deployment.

Pros:

- Industry standard
- Supports dynamic language switching
- Scalable for large applications

Alternatives Considered:

- react-native-localize (lighter but less powerful)

# zustand

Purpose:
Global state management.

Why Used:
To manage album state, network status, and UI state without excessive boilerplate.

Pros:

- Lightweight
- Minimal boilerplate
- Excellent TypeScript support
- Easy to scale

Cons:

- Smaller ecosystem compared to Redux
- DevTools not as extensive as Redux

Alternatives Considered:

- Redux Toolkit, React Context API

Zustand was chosen for its simplicity and reduced complexity.

# immer

Purpose:
Immutable state updates.

Why Used:
Used alongside Zustand to simplify immutable state updates and prevent mutation-related bugs.

Pros:

- Cleaner state update logic
- Reduces accidental mutation issues
- Improves readability

Cons:

- Slight runtime overhead
- Not necessary for very simple state logic

Redux Toolkit (includes Immer internally)

# lodash

Purpose:
Utility helper functions (e.g., debounce, data formatting).

Why Used:
Reduces boilerplate code and improves readability for common utility operations.

Pros:

- Reliable
- Wide range of utility functions

Cons:

- Can increase bundle size if not imported selectively

Alternatives Considered:

- Native ES6+ methods

# react-native-dotenv

Purpose:
Environment variable management.

Why Used:
Separates configuration such as API base URLs from source code, supporting white-label and environment-based builds.

Pros:

- Clean configuration management
- Supports environment separation

Cons:

- Requires Babel configuration
- Not suitable for storing sensitive secrets

Alternatives Considered:

- react-native-config

# react-native-fast-image

Purpose:
Optimized image rendering and caching.

Why Used:
Improves performance when rendering album thumbnails and artwork.

Pros:

- Better caching than default Image component
- Improved performance for media-heavy lists

Cons:

- Slightly increases app size

# react-native-video

Purpose:
Video playback for album preview.

Why Used:
Required to play preview videos provided by the API (previewUrl).

react-native-video was selected as it is the most appropriate solution for React Native CLI projects.

# react-native-toast-message

Purpose:
User feedback notifications (e.g., error messages).

Why Used:
Provides clean and non-intrusive user feedback for network errors and actions.

Pros:

- Lightweight
- Easy integration
- Customizable
