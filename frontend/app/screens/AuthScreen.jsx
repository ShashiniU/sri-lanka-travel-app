// screens/AuthScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = () => {
    if (!isLogin && password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    
      if (isLogin) {
        console.log('Logging in with:', email, password);
      } else {
        console.log('Registering with:', email, password, confirmPassword);
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
