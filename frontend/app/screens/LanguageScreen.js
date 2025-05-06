// screens/LanguageScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LanguageScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.jpg')} // Add your logo or a related image
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.subtitle}>Sri Lanka Travel App</Text>

      <Text style={styles.label}>Choose Your Language</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={language}
          onValueChange={setLanguage}
          style={styles.picker}
          dropdownIconColor="#333"
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Français (French)" value="fr" />
<Picker.Item label="Deutsch (German)" value="de" />

        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue to Login/Register"
          color="#1E90FF"
          onPress={() => navigation.navigate('Auth')}
        />
      </View>
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 50,
    width: '100%',
    overflow: 'hidden',
  },
  picker: {
    height: 55,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});
