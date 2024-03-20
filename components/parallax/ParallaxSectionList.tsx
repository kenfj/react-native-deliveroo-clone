import Colors from '@/constants/Colors';
import { Stack, useNavigation } from 'expo-router';
import { ReactElement, ReactNode, useRef, useState } from 'react';
import { Dimensions, SectionList, SectionListData, SectionListRenderItem, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { HeaderBackground, HeaderLeft, HeaderRight } from './headers/ScreenHeader';
import { StickyMenu } from './menu/StickyMenu';

const { width } = Dimensions.get('window');

type SectionHeader<ITEM, SECTION> = (info: {
  section: SectionListData<ITEM, SECTION>;
}) => ReactElement;

type Props<ITEM, SECTION extends { title: string }> = {
  headerText: string,
  imageSource: number,
  imageHeight: number,
  ListHeader: ReactNode,
  SectionHeader: SectionHeader<ITEM, SECTION>,
  SectionItem: SectionListRenderItem<ITEM, SECTION>,
  sections: SectionListData<ITEM, SECTION>[],
  containerStyle?: StyleProp<ViewStyle>,
  sectionListStyle?: StyleProp<ViewStyle>,
};

const Separator = () => <View style={styles.separator} />;

export const ParallaxSectionList = <ITEM, SECTION extends { title: string }>({
  headerText,
  imageSource,
  imageHeight,
  ListHeader,
  SectionHeader,
  SectionItem,
  sections,
  containerStyle,
  sectionListStyle,
}: Props<ITEM, SECTION>) => {
  const navigation = useNavigation();

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionListRef = useRef<SectionList<ITEM, SECTION>>(null);

  const menuOpacity = useSharedValue(0);
  const menuStyle = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
  }));

  const AnimatedSectionList = Animated
    .createAnimatedComponent(SectionList<ITEM, SECTION>);

  // use useAnimatedScrollHandler instead of useScrollViewOffset
  // https://docs.swmansion.com/react-native-reanimated/docs/scroll/useAnimatedScrollHandler/
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    const y = event.contentOffset.y;

    scrollOffset.value = y;
    menuOpacity.value = withTiming(y > imageHeight ? 1 : 0);
  });

  const listHeaderImageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [-imageHeight, 0, imageHeight / 3, imageHeight],
        [1, 1, 1, 0]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-imageHeight, 0, imageHeight],
            [imageHeight * -0.5, 0, imageHeight * 0.75]
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

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, imageHeight / 1.5],
        [0, 1]
      )
    };
  });

  const selectSection = (index: number) => {
    console.log(`selectSection(${index})`);

    setActiveIndex(index);

    // workaround https://stackoverflow.com/questions/76787877
    const wait = new Promise(resolve => setTimeout(resolve, 300));
    wait.then(() => {
      sectionListRef.current?.scrollToLocation({
        sectionIndex: index,
        itemIndex: 1, // Note: must be 1 somehow
        viewPosition: 0.2,
        animated: false,
      })
    });
  };

  const ListHeaderContainer = (
    <>
      <Animated.Image
        source={imageSource}
        style={[
          { width, height: imageHeight },
          listHeaderImageStyle
        ]}
      />

      {ListHeader}
    </>
  );

  return (
    <View style={containerStyle}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: Colors.primary,
          headerLeft: () => HeaderLeft({ onPress() { navigation.goBack() }, }),
          headerRight: HeaderRight,
          headerBackground: () => HeaderBackground({ headerText, headerStyle }),
        }}
      />

      <AnimatedSectionList
        ref={sectionListRef}
        style={sectionListStyle}
        sections={sections}
        keyExtractor={(item, index) => `${item}-${index}`}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        ListHeaderComponent={ListHeaderContainer}
        renderSectionHeader={SectionHeader}
        renderItem={SectionItem}
        ItemSeparatorComponent={Separator}
        SectionSeparatorComponent={Separator}
      />

      <StickyMenu
        titles={sections.map(_ => _.title)}
        menuStyle={menuStyle}
        activeIndex={activeIndex}
        handleOnPress={selectSection}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  separator: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: Colors.grey,
  },
});
