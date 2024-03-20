import { getDishById } from '@/assets/data/restaurant';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dish = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getDishById(+id);
  const router = useRouter();

  const addToCart = (event: GestureResponderEvent) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.container}>
        <Animated.Image source={item?.img} style={styles.image}
          entering={FadeIn.duration(400).delay(200)} />

        <View style={{ padding: 20 }}>
          <Animated.Text style={styles.name}
            entering={FadeInLeft.duration(400).delay(200)}>
            {item?.name}
          </Animated.Text>
          <Animated.Text style={styles.info}
            entering={FadeInLeft.duration(400).delay(400)}>
            {item?.info}
          </Animated.Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
            <Text style={styles.footerText}>Add for ${item?.price}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  info: {
    fontSize: 16,
    color: Colors.mediumDark
  },
  footer: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Dish;
