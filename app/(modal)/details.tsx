import { restaurant } from '@/assets/data/restaurant';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Details = () => {
  return (
    <ParallaxScrollView
      style={styles.container}
      imageHeight={250}
      imageSource={restaurant.img}
      headerText={restaurant.name}
    >
      <View style={styles.detailsContainer}>
        <Text>Details</Text>
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
});

export default Details;
