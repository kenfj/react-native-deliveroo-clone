# React Native Expo Another Demo App

* Inspired by Deliveroo Food Ordering Clone with React Native
  - https://www.youtube.com/watch?v=FXnnCrfiNGM
* Updated using Expo SDK 50

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

## Upgrade

```bash
npm install expo@50.0.4

npx expo-doctor
npx expo install --check

npx expo start --ios --clear
```

## Reference

* Best Practices etc.
  - https://qiita.com/nakapon9517/items/6b99adc29e4597ed47e1
