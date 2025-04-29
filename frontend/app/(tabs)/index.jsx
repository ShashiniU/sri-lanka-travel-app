// App.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageScreen from '../screens/LanguageScreen';
import AuthScreen from '../screens/AuthScreen'; 
import AdminHomeScreen from '../(tabs)/AdminHomeScreen'; // adjust path if needed
import TourismPlacesScreen from '../../components/screens/TourismPlacesScreen'; 
import PlaceDetailScreen from '../../components/screens/PlaceDetailScreen'; 
import PaymentScreen from '../../components/screens/PaymentScreen'; 


const Stack = createNativeStackNavigator();

const App = () => {
  return (
     <Stack.Navigator initialRouteName="Language">
    <Stack.Screen name="Language" component={LanguageScreen} />
    <Stack.Screen name="Auth" component={AuthScreen} />
    <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
    <Stack.Screen name="UserHome" component={TourismPlacesScreen} />
    <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />

  </Stack.Navigator>
  );
};

export default App;
