// App.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageScreen from '../screens/LanguageScreen';
import AuthScreen from '../screens/AuthScreen'; 
import AdminHomeScreen from '../screens/AdminHomeScreen'; // adjust path if needed
import TourismPlacesScreen from '../../components/screens/TourismPlacesScreen'; 
import PlaceDetailScreen from '../../components/screens/PlaceDetailScreen'; 
import PaymentScreen from '../../components/screens/PaymentScreen'; 


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="Language">
    <Stack.Screen
      name="Language"
      component={LanguageScreen}
      options={{ title: 'Choose Your Language' }}
    />
    <Stack.Screen
      name="Auth"
      component={AuthScreen}
      options={{ title: 'Login or Register' }}
    />
    <Stack.Screen
      name="AdminHome"
      component={AdminHomeScreen}
      options={{ title: 'Admin Dashboard' }}
    />
    <Stack.Screen
      name="UserHome"
      component={TourismPlacesScreen}
      options={{ title: 'Explore Sri Lanka' }}
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

export default App;
