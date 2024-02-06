import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Region } from 'react-native-maps';

const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY ?? "";

const defaultLocation: Region = {
  latitude: 51.5078788,
  longitude: -0.0877321,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Region>(defaultLocation);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Search or move the map'
        fetchDetails={true}
        onPress={(data, details) => {
          const point = details?.geometry.location;
          if (!point) return;

          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{ key: API_KEY, language: 'en' }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons
              name='search-outline'
              size={24}
              color={Colors.medium}
            />
          </View>
        )}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            padding: 8,
            backgroundColor: 'white',
          }
        }}
      />

      <MapView
        showsUserLocation={true}
        region={location}
        style={styles.map} />

      <View style={styles.absoluteBox}>
        <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  boxIcon: {
    position: 'absolute',
    left: 15,
    top: 18,
    zIndex: 1,
  },
});

export default LocationSearch;
