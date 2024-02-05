import { restaurants } from '@/assets/data/home';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Restaurants = () => {
  return (
    <ScrollView horizontal
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={{ padding: 15 }}
    >
      {restaurants.map((restaurant) => (
        <Link href={'/details'} key={restaurant.name} asChild>
          <TouchableOpacity>
            <View style={styles.categoryCard}>
              <Image source={restaurant.img} style={styles.image} />
              <View style={styles.categoryBox}>
                <Text style={styles.categoryText}>{restaurant.name}</Text>
                <Text style={{ color: Colors.green }}>
                  {restaurant.rating} {restaurant.ratings}
                </Text>
                <Text style={{ color: Colors.medium }}>{restaurant.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
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
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
  imageContainer: {
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
});

export default Restaurants;
