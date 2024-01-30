import { categories } from '@/assets/data/home';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const Categories = () => {
  return (
    <ScrollView horizontal
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={{ padding: 15 }}
    >
      {categories.map((category) => (
        <View style={styles.categoryCard} key={category.text}>
          <Image source={category.img} />
          <Text style={styles.categoryText}>{category.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    marginEnd: 10,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    padding: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Categories;
