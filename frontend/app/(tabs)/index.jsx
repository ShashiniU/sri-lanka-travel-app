// App.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageScreen from '../screens/LanguageScreen';
import AuthScreen from '../screens/AuthScreen'; 
import AdminHomeScreen from '../(tabs)/AdminHomeScreen'; // adjust path if needed


const Stack = createNativeStackNavigator();

const App = () => {
  return (
     <Stack.Navigator initialRouteName="Language">
    <Stack.Screen name="Language" component={LanguageScreen} />
    <Stack.Screen name="Auth" component={AuthScreen} />
    <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
  </Stack.Navigator>
  );
};

export default App;
