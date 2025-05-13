// AppStack.jsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import LanguageScreen from '../screens/LanguageScreen';
import AuthScreen from '../screens/AuthScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import TourismPlacesScreen from '../../components/screens/TourismPlacesScreen';
import PlaceDetailScreen from '../../components/screens/PlaceDetailScreen';
import PaymentScreen from '../../components/screens/PaymentScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="Language">
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{ title: t('choose_language') }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ title: t('login') }}
      />
      <Stack.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{ title: 'Admin Dashboard' }}
      />
      <Stack.Screen
        name="UserHome"
        component={TourismPlacesScreen}
        options={{ title: t('explore') }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{ title: 'Place Details' }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: 'Payment' }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
