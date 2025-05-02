// app/(tabs)/language-settings.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLanguage, LANGUAGES } from '../screens/languageContext';

export default function LanguageSettings() {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Language</Text>
      
      {LANGUAGES.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={[
            styles.languageItem,
            currentLanguage === language.code && styles.selectedLanguage
          ]}
          onPress={() => changeLanguage(language.code)}
        >
          <Text style={[
            styles.languageText,
            currentLanguage === language.code && styles.selectedLanguageText
          ]}>
            {language.name}
          </Text>
          
          {currentLanguage === language.code && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedLanguage: {
    backgroundColor: '#f0f8ff',
  },
  languageText: {
    fontSize: 18,
  },
  selectedLanguageText: {
    fontWeight: 'bold',
    color: '#0066cc',
  },
  checkmark: {
    fontSize: 20,
    color: '#0066cc',
  },
});