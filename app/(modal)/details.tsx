import { restaurant } from '@/assets/data/restaurant';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, ImageSourcePropType, NativeScrollEvent, NativeSyntheticEvent, SectionList, SectionListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Item = {
  id: number;
  name: string;
  price: number;
  info: string;
  img: ImageSourcePropType;
};

type Section = {
  index: number;
  title: string;
  data: Item[];
};

const Details = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<TouchableOpacity[]>([]);
  const sectionListRef = useRef<SectionList<Item, Section>>(null);

  const DATA = restaurant.food.map((item, index) => ({
    index,
    title: item.category,
    data: item.meals,
  }));

  const separator = () => <View style={styles.separator} />;

  const selectCategory = (index: number) => {
    console.log(`selectCategory(${index})`);

    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });

    sectionListRef.current?.scrollToLocation({
      sectionIndex: index,
      itemIndex: 1,
    });
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;

    opacity.value = (y > 350) ? withTiming(1) : withTiming(0);
  };

  const renderItem: SectionListRenderItem<Item, Section> = ({ item, index }) => (
    <Link href={'/'} asChild>
      <TouchableOpacity style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text style={styles.dish}>{item.name}</Text>
          <Text style={styles.dishText}>{item.info}</Text>
          <Text style={styles.dishText}>${item.price}</Text>
        </View>
        <Image source={item.img} style={styles.dishImage} />
      </TouchableOpacity>
    </Link>
  );

  return <>
    <ParallaxScrollView
      style={styles.container}
      imageHeight={250}
      imageSource={restaurant.img}
      headerText={restaurant.name}
      onScroll={onScroll}
    >
      <View style={styles.detailsContainer}>
        <Text style={styles.restName}>{restaurant.name}</Text>
        <Text style={styles.restDesc}>
          {restaurant.delivery} {restaurant.tags.map((tag, i) => (
            `${tag}${i < restaurant.tags.length - 1 ? '・' : ''}`
          ))}
        </Text>
        <Text style={styles.restDesc}>{restaurant.about}</Text>

        <SectionList
          ref={sectionListRef}
          sections={DATA}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          keyExtractor={(item, index) => `${item.id + index}`}
          // ListHeaderComponent={(foo) => (
          //   <Text style={styles.sectionHeader}>{"title"}</Text>
          // )}
          renderSectionHeader={({ section: { title, index } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          ItemSeparatorComponent={separator}
          SectionSeparatorComponent={separator}
          renderItem={renderItem}
        />
      </View>
    </ParallaxScrollView>

    <Animated.View style={[styles.stickySegments, animatedStyle]}>
      <View style={styles.segmentsShadow}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.segmentScrollView}
        >
          {restaurant.food.map((item, index) => (
            <TouchableOpacity
              ref={ref => itemsRef.current[index] = ref!}
              key={`${item.category}${index + 1}`}
              onPress={() => selectCategory(index)}
              style={activeIndex === index
                ? styles.segmentButtonActive
                : styles.segmentButton}
            >
              <Text
                style={activeIndex === index
                  ? styles.segmentTextActive
                  : styles.segmentText}
              >
                {item.category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Animated.View>
  </>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  detailsContainer: {
    height: 2000,
    backgroundColor: Colors.lightGrey,
  },
  restName: {
    fontSize: 30,
    margin: 16,
  },
  restDesc: {
    fontSize: 16,
    margin: 16,
    lineHeight: 22,
    color: Colors.medium
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    margin: 16,
  },
  separator: {
    marginHorizontal: 16,
    height: 1,
    backgroundColor: Colors.grey,
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
  },
  dishImage: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  dish: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishText: {
    fontSize: 14,
    color: Colors.mediumDark,
    paddingVertical: 4,
  },
  stickySegments: {
    position: 'absolute',
    height: 50,
    left: 0,
    right: 0,
    top: 100,
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingBottom: 4,
  },
  segmentsShadow: {
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentText: {
    color: Colors.primary,
    fontSize: 16,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentTextActive: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  segmentScrollView: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 20,
    paddingBottom: 4,
  }
});

export default Details;
