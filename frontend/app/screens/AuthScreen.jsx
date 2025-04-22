// screens/AuthScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../constants/config'; // Adjust the import path as necessary

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async () => {
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
 
    try {
      if (isLogin) {
        // Login request
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {
          email,
          password,
        });
  console.log('Login response:', response.data);
        const { token, user } = response.data;
  
        await AsyncStorage.setItem('userToken', token);
        if (response.data.token) {
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
          }
        alert(`Welcome back, ${user.name}!`);
        console.log('Logged in user:', user);
        
      } else {
        // Register request
        console.log('Registering user:', { name, email, password, BASE_URL });
        const response = await axios.post(`${BASE_URL}/api/auth/register`, {
          name,
          email,
          password,
        });
        if (response.data.token) {
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
          }
        alert('Registration successful! You can now log in.');
        setIsLogin(true); // switch to login mode after successful registration
      }
  
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred. Please try again.');
      }
      console.error('Auth error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
      {!isLogin && (
  <TextInput
    placeholder="Name"
    style={styles.input}
    value={name}
    onChangeText={setName}
  />
)}
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {!isLogin && (
  <TextInput
    placeholder="Confirm Password"
    style={styles.input}
    secureTextEntry
    value={confirmPassword}
    onChangeText={setConfirmPassword}
  />
)}

      <Button title={isLogin ? 'Login' : 'Register'} onPress={handleSubmit} />

      <TouchableOpacity onPress={toggleMode}>
        <Text style={styles.toggle}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
    backgroundColor: '#f9f9f9',
  },
  toggle: {
    textAlign: 'center',
    marginTop: 20,
    color: '#007bff',
  },
});
