// app/_layout.js
import React from 'react';
import { Stack } from 'expo-router';
import { LanguageProvider } from '../(tabs)/languageContext';
import { useTranslation } from 'react-i18next';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <RootLayoutNav />
    </LanguageProvider>
  );
}

function RootLayoutNav() {
  const { t } = useTranslation();
  
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="language-settings"
        options={{ 
          title: t('languageSettings'),
          presentation: 'modal'
        }}
      />
    </Stack>
  );
}