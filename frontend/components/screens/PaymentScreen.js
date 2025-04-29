import React, { useState } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import BASE_URL from '../../constants/config';
import axios from 'axios';

const PaymentScreen = ({ route, navigation }) => {
  const { place, checkInDate, checkOutDate, persons, totalAmount } = route.params;
  const [paymentType, setPaymentType] = useState('visa');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePaymentSuccess = async () => {
    try {
      // 1. Create booking
      const bookingRes = await axios.post(`${BASE_URL}/api/tourism/bookings`, {
        userid: 1, // Replace with actual logged-in user ID
        location: place.name,
        checkin: checkInDate,
        checkout: checkOutDate,
        noofpersons: persons,
      });

      const booking = bookingRes.data;

      // 2. Create payment
      await axios.post(`${BASE_URL}/api/tourism/payments`, {
        bookingid: booking.bookingid,
        amount: totalAmount,
        paymentmethod: paymentType, // Dynamically set payment method
        cardnumber: cardNumber,
        expirydate: expiryDate,
        cvv: cvv,
      });

      // 3. Navigate to success screen
      navigation.navigate('Success');
    } catch (error) {
      console.error(error);
      Alert.alert('Payment Failed', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalAmountText}>Total: ${totalAmount.toFixed(2)}</Text>

      {/* Payment Method Selection */}
      <Text style={styles.sectionTitle}>Select Payment Method</Text>
      <View style={styles.paymentTypeContainer}>
        <TouchableOpacity
          style={[styles.paymentTypeButton, paymentType === 'visa' && styles.selectedPaymentType]}
          onPress={() => setPaymentType('visa')}>
          <Text style={[styles.paymentTypeText, paymentType === 'visa' && styles.selectedpaymentTypeText]}>Visa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentTypeButton, paymentType === 'mastercard' && styles.selectedPaymentType]}
          onPress={() => setPaymentType('mastercard')}>
          <Text style={[styles.paymentTypeText, paymentType === 'mastercard' && styles.selectedpaymentTypeText]}>MasterCard</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentTypeButton, paymentType === 'paypal' && styles.selectedPaymentType]}
          onPress={() => setPaymentType('paypal')}>
          <Text style={[styles.paymentTypeText, paymentType === 'paypal' && styles.selectedpaymentTypeText]}>PayPal</Text>
        </TouchableOpacity>
      </View>

      {/* Card Details Section */}
      <Text style={styles.sectionTitle}>Card Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <View style={styles.cardExpiryContainer}>
        <TextInput
          style={[styles.input, styles.cardInput]}
          placeholder="MM/YY"
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.cardInput]}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handlePaymentSuccess}>
        <Text style={styles.submitButtonText}>Submit Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  totalAmountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BFA6',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  paymentTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentTypeButton: {
    backgroundColor: '#fff',
    borderColor: '#00BFA6',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedPaymentType: {
    backgroundColor: '#00BFA6',
    borderColor: '#0FFF5',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedpaymentTypeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentTypeText: {
    color: '#00BFA6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  cardExpiryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInput: {
    flex: 0.48,
  },
  submitButton: {
    backgroundColor: '#00BFA6',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
