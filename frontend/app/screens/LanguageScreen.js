// screens/LanguageScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LanguageScreen = ({ navigation }) => {
  const [language, setLanguage] = useState('en');
  const [type, setType] = useState('all');
  const [filter, setFilter] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sri Lanka Travel App</Text>

      <Text style={styles.label}>Select Language</Text>
      <Picker selectedValue={language} onValueChange={setLanguage} style={styles.picker}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Sinhala" value="si" />
        <Picker.Item label="Tamil" value="ta" />
      </Picker>

      <Text style={styles.label}>Select Type</Text>
      <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Beach" value="beach" />
        <Picker.Item label="Temple" value="temple" />
        <Picker.Item label="Hill Country" value="hill" />
      </Picker>

      <Text style={styles.label}>Filter by Keyword</Text>
      <TextInput
        placeholder="Search..."
        value={filter}
        onChangeText={setFilter}
        style={styles.textInput}
      />

      <Button title="Continue to Login/Register" onPress={() => navigation.navigate('Auth')} />
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { marginTop: 10, fontSize: 16 },
  picker: { height: 50, backgroundColor: '#f0f0f0' },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#f9f9f9',
    marginTop: 5,
    marginBottom: 20,
  },
});
