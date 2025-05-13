import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import i18n from '../translations/i18n'; // Adjust path if needed

const LanguageScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation();
  console.log('Current language:', i18n.language); // Debugging line
  console.log('Available languages:', i18n.options.resources); // Debugging line
console.log('t', t); // Debugging line

console.log('t("welcome")', t('welcome')); // Debugging line
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>{t('welcome')}</Text>
      <Text style={styles.subtitle}>{t('appName')}</Text>
      <Text style={styles.label}>{t('chooseLanguage')}</Text>
      <View style={styles.pickerContainer}>
        <Picker
         selectedValue={language}
         onValueChange={(lang) => {
           setLanguage(lang);
           i18n.changeLanguage(lang); // This line was missing from your Picker!
         }}
         style={styles.picker}
         dropdownIconColor="#333"
        >
          <Picker.Item label="English" value="en" selectedValue={"en"}   onValueChange={(lang) => {
           setLanguage(lang);
           i18n.changeLanguage(lang); // This line was missing from your Picker!
         }}/>
          <Picker.Item label="Français (French)" value="fr" selectedValue={"fr"}   onValueChange={(lang) => {
           setLanguage(lang);
           i18n.changeLanguage(lang); // This line was missing from your Picker!
         }} />
          <Picker.Item label="Deutsch (German)" value="de" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={t('continue')}
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

// ...styles remain unchanged
