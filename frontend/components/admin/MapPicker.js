import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function MapPicker({ onLocationSelected }) {
  const [marker, setMarker] = useState({
    latitude: 7.8731,
    longitude: 80.7718,
  });

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    onLocationSelected({ latitude, longitude });
  };

  const resetToDefault = () => {
    const defaultLocation = { latitude: 7.8731, longitude: 80.7718 };
    setMarker(defaultLocation);
    onLocationSelected(defaultLocation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap on the map to select a location</Text>

      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: marker.latitude,
            longitude: marker.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={handleMapPress}
        >
          <Marker coordinate={marker} />
        </MapView>
      </View>

      <Text style={styles.locationText}>
        📍 {marker.latitude.toFixed(5)}, {marker.longitude.toFixed(5)}
      </Text>

      <TouchableOpacity style={styles.resetButton} onPress={resetToDefault}>
        <Ionicons name="refresh-circle" size={24} color="white" />
        <Text style={styles.resetText}>Reset Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  mapWrapper: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationText: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
  },
  resetButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resetText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
});
