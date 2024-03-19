import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import React, { PropsWithChildren } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type Props = {
  style?: StyleProp<ViewStyle>,
  imageHeight: number,
  imageSource: number,
  headerText: string,
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
};

const ParallaxScrollView = ({
  children,
  style,
  imageHeight,
  imageSource,
  headerText,
  onScroll,
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-imageHeight, 0, imageHeight],
            [-imageHeight / 2, 0, imageHeight * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-imageHeight, 0, imageHeight],
            [2, 1, 1]
          ),
        },
      ]
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, imageHeight / 1.5],
        [0, 1]
      )
    };
  });

  const headerLeft = () => (
    <TouchableOpacity onPress={navigation.goBack} style={styles.roundButton}>
      <Ionicons name='arrow-back' size={24} color={Colors.primary} />
    </TouchableOpacity>
  );

  const headerRight = () => (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.roundButton}>
        <Ionicons name='share-outline' size={24} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.roundButton}>
        <Ionicons name='search-outline' size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const headerBackground = () => (
    <Animated.View style={[styles.stickySection, headerAnimatedStyle]}>
      <Text style={styles.stickySectionText}>{headerText}</Text>
    </Animated.View>
  );

  return (
    <View style={style}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.primary,
          headerLeft: headerLeft,
          headerRight: headerRight,
          headerBackground: headerBackground,
        }}
      />
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        <Animated.Image
          source={imageSource}
          style={[{ width, height: imageHeight }, imageAnimatedStyle]} />
        {children}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  stickySection: {
    flex: 1,
    flexDirection: 'column-reverse',
    height: 100,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  stickySectionText: {
    fontSize: 20,
    marginBottom: 10,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  }
});

export default ParallaxScrollView;
