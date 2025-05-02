import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  Button,Linking 
} from 'react-native';
import Swiper from 'react-native-swiper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';


const PlaceDetailScreen = ({ route, navigation }) => {
  const { place } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [numPersons, setNumPersons] = useState(1);

  const nights = moment(checkOutDate).diff(moment(checkInDate), 'days');
  const total = nights > 0 ? nights * place.price_per_night * numPersons : 0;

  const handleBooking = () => {
    setModalVisible(true);
  };

  const confirmBooking = () => {
    setModalVisible(false);
    alert('Booking Confirmed!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper showsButtons autoplay>
          {place.images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.image} />
          ))}
        </Swiper>
      </View>

      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.price}>${place.price_per_night} / night</Text>
      <Text style={styles.description}>{place.description}</Text>

      <Text style={styles.facilitiesTitle}>Facilities</Text>
      <View style={styles.facilities}>
        {place.facilities.map((facility, index) => (
          <Text key={index} style={styles.facility}>{facility}</Text>
        ))}
      </View>
      <TouchableOpacity
  style={styles.button}
  onPress={() => {
    const lat = place.latitude;
    const lng = place.longitude;
    const label = encodeURIComponent(place.name);
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${label}`;
    Linking.openURL(url);
  }}
>
  <Text style={styles.buttonText}>View Location on Map</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Booking Details</Text>

            <TouchableOpacity onPress={() => setShowCheckInPicker(true)}>
              <Text style={styles.modalText}>
                Check-in: {moment(checkInDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowCheckOutPicker(true)}>
              <Text style={styles.modalText}>
                Check-out: {moment(checkOutDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>

            {showCheckInPicker && (
              <DateTimePicker
                value={checkInDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowCheckInPicker(Platform.OS === 'ios');
                  if (selectedDate) setCheckInDate(selectedDate);
                }}
              />
            )}

            {showCheckOutPicker && (
              <DateTimePicker
                value={checkOutDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowCheckOutPicker(Platform.OS === 'ios');
                  if (selectedDate) setCheckOutDate(selectedDate);
                }}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Number of Persons"
              keyboardType="numeric"
              value={numPersons.toString()}
              onChangeText={(text) => setNumPersons(parseInt(text) || 1)}
            />

            <Text style={styles.totalAmount}>Total: ${total.toFixed(2)}</Text>

            <TouchableOpacity
  style={styles.button}
  onPress={() =>
    navigation.navigate('Payment', {
        place,
        checkInDate,
        checkOutDate,
        persons: numPersons,
        totalAmount: total,
      })
      
  }
>
              <Text style={styles.buttonText}>Confirm Booking</Text>
            </TouchableOpacity>

            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  swiperContainer: { height: 250 },
  image: { width: '100%', height: 250 },
  title: { fontSize: 24, fontWeight: 'bold', padding: 10 },
  price: { fontSize: 20, color: '#00BFA6', paddingHorizontal: 10 },
  description: { fontSize: 16, padding: 10, color: '#555' },
  facilitiesTitle: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10, marginTop: 20 },
  facilities: { flexDirection: 'row', flexWrap: 'wrap', padding: 10 },
  facility: { backgroundColor: '#E0F7FA', padding: 6, margin: 4, borderRadius: 8 },
  button: { backgroundColor: '#00BFA6', padding: 15, borderRadius: 10, margin: 20, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },

  // Modal styles
  modalBackground: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { margin: 20, backgroundColor: 'white', borderRadius: 10, padding: 20, elevation: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  modalText: { fontSize: 16, marginVertical: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 10 },
  totalAmount: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 15 },
  confirmButton: { backgroundColor: '#00BFA6', padding: 15, borderRadius: 10, alignItems: 'center' },
});

export default PlaceDetailScreen;
