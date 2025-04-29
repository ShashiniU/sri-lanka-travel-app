import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import BASE_URL from '../../constants/config'; 

const TourismPlacesScreen = ({ navigation }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/tourism/tourism-places`);
     
      // Correct way to set state with just one argument
      setPlaces(response.data);
    } catch (error) {
 
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    // Create a full URL for the image by combining BASE_URL with the image path
    const imageUrl = item.images && item.images.length > 0 
      ? `${BASE_URL}/${item.images[0]}` 
      : 'https://via.placeholder.com/150';
    

    
    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('PlaceDetail', { place: {
          ...item,
          // Also update image URLs in the place object we pass to the detail page
          images: item.images?.map(img => `${BASE_URL}/${img}`) || []
        }})}
      >
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price_per_night} / Per night</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading places...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text>No places found</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 8,
  },
  price: {
    color: '#00BFA6',
    fontSize: 14,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default TourismPlacesScreen;