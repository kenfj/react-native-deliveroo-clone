# React Native Expo Another Demo App

* Inspired by Deliveroo Food Ordering Clone with React Native
  - https://www.youtube.com/watch?v=FXnnCrfiNGM
  - https://github.com/Galaxies-dev/clone-deliveroo-react-native
* Updated using Expo SDK 50
* updated using Reanimated for Parallax Scroll View
  - without using i6mi6/react-native-parallax-scroll-view
  - Easiest React Native Parallax Image Scroll EVER
  - https://www.youtube.com/watch?v=czP_egcFM9k

## Quick Start

```bash
node --version
# v20.11.0
npm --version
# 10.4.0

# install packages
npm ci

# start ios simulator
npm run ios

# start with cache clear sometimes
npx expo start --ios --clear

# shift + i to change iOS simulator version
# https://stackoverflow.com/questions/47709953
❯   iPhone 15 Pro Max (17.4)
```

## EAS Build

* formerly known as `expo publish`
* build as preview for testing
  - https://docs.expo.dev/build/setup/
  - https://docs.expo.dev/build/internal-distribution/
* Note: free tier up to 30 medium builds

```bash
npm install -g eas-cli
eas login

eas build --profile preview --platform android
# eas build --profile preview --platform ios

# When the build completes, you will be given
# a URL that you can share with your team
# to download and install the app.

# check build status
eas build:list
```

## Initial Project Setup Notes

```bash
# https://docs.expo.dev/router/installation/
npx create-expo-app@latest deliverooClone --template tabs@50

cd deliverooClone
npm run ios

# check command
npx expo-doctor
```

* React Native Bottom Sheet
  - https://github.com/gorhom/react-native-bottom-sheet
* React Native Reanimated
  - https://github.com/software-mansion/react-native-reanimated
* React Native Gesture Handler
  - https://github.com/software-mansion/react-native-gesture-handler

```bash
npm install @gorhom/bottom-sheet

# https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/
npx expo install react-native-reanimated
# edit babel.config.js
npx expo start -c

npx expo install react-native-gesture-handler
```

* React Native Bouncy Checkbox
  - https://github.com/WrathChaos/react-native-bouncy-checkbox

```bash
npx expo install react-native-bouncy-checkbox
```

* React Native Maps
  - https://docs.expo.dev/versions/latest/sdk/map-view/
* React Native Google Places Autocomplete
  - https://github.com/fullstackProDev/react-native-google-places-autocomplete

```bash
npx expo install react-native-maps
npx expo install react-native-google-places-autocomplete
```

* Expo Haptics (vibration)
  - https://docs.expo.dev/versions/latest/sdk/haptics/

```bash
npx expo install expo-haptics
```

* zustand
  - https://github.com/pmndrs/zustand
  - https://zustand-demo.pmnd.rs/

```bash
npx expo install zustand
```

* React Native confetti cannon
  - https://github.com/VincentCATILLON/react-native-confetti-cannon

```bash
npx expo install react-native-confetti-cannon
```

## Upgrade

```bash
npx expo-doctor
# ...
# ✖ Check that packages match versions required by installed Expo SDK
# The following packages should be updated for best compatibility
# with the installed expo version:
# ...
#   expo@50.0.6 - expected version: ~50.0.7
#   expo-font@11.10.2 - expected version: ~11.10.3
# ...
# Advice: Use 'npx expo install --check'
# to review and upgrade your dependencies.

npx expo install --check
# The following packages should be updated for best compatibility
# with the installed expo version:
#   expo@50.0.6 - expected version: ~50.0.7
#   expo-font@11.10.2 - expected version: ~11.10.3
# Your project may not work correctly
# until you install the correct versions of the packages.
# ? Fix dependencies? › (Y/n)

# Note: no need to install explicitly
# npm install expo@50.0.7

# check again
npx expo-doctor

# start expo server with clear cache option
npx expo start --ios --clear

# in case warning, run watchman commands and restart expo server
# warning: Watchman `watch-project` returned a warning:
# Recrawled this watch 3 times, most recently because: blah blah
watchman watch-del-all
watchman shutdown-server
```

## Reference

* Best Practices etc.
  - https://qiita.com/nakapon9517/items/6b99adc29e4597ed47e1
