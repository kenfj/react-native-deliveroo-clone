import { restaurant } from '@/assets/data/restaurant';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import React from 'react';
import { Image, SectionList, SectionListRenderItem, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Details = () => {
  const DATA = restaurant.food.map((item, index) => ({
    index,
    title: item.category,
    data: item.meals,
  }));

  const separator = () => <View style={styles.separator} />;

  const renderItem: SectionListRenderItem<any> = ({ item, index }) => (
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

  return (
    <ParallaxScrollView
      style={styles.container}
      imageHeight={250}
      imageSource={restaurant.img}
      headerText={restaurant.name}
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
          sections={DATA}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          keyExtractor={(item, index) => `${item.id + index}`}
          renderSectionHeader={({ section: { title, index } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          ItemSeparatorComponent={separator}
          SectionSeparatorComponent={separator}
          renderItem={renderItem}
        />
      </View>
    </ParallaxScrollView>
  );
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
});

export default Details;
