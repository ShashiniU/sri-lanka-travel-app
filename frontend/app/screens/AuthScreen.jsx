// screens/AuthScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../constants/config';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async () => {
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      if (isLogin) {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {
          email,
          password,
        });
        const { token, user } = response.data;

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        alert(`Welcome back, ${user.name}!`);
        if (user.isadmin === 1) {
          navigation.navigate('AdminHome');
        } else {
          navigation.navigate('UserHome');
        }
      } else {
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
        setIsLogin(true);
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/logo.jpg')} // Add a relevant icon
          style={styles.logo}
        />
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isLogin ? 'Login' : 'Register'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleMode}>
          <Text style={styles.toggle}>
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E90FF',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    backgroundColor: '#F9FAFB',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggle: {
    marginTop: 15,
    textAlign: 'center',
    color: '#1E40AF',
  },
});
