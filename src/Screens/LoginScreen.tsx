// src/screens/LoginScreen.tsx
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {
  isBiometricAvailable,
  promptBiometric,
  storeCredentials,
  retrieveCredentials,
} from '../auth/biometric';
import { AuthContext } from '../store/AuthContext';
import jwt from 'react-native-jwt-io';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  username: string;
  email: string;
  token: string;
}

export const LoginScreen: React.FC = ({ navigation }) => {
  const { signIn, state } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    (async () => {
      const { available } = await isBiometricAvailable();
      setBiometricSupported(available);
      if (available) {
        const token = await retrieveCredentials();
        if (token) promptBiometric().then(success => success && signIn(token));
      }
    })();
  }, []);

  const onLogin = async () => {
    let result = await AsyncStorage.getItem('user_data');
    let updatedResult = JSON.parse(result);
    const token = jwt.encode({ id: username, password: password }, 'gopal@123');
    console.log('updatedResult.token === token', updatedResult.token, token);
    if (!result || updatedResult.token !== token) {
      setUsername('');
      setPassword('');
      Alert.alert('No Match', 'Please create an account');
      return;
    }
    if (username && password) {
      await storeCredentials(username, token);
      signIn(token);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Enter username & password');
    }
  };

  const createAccount = () => {
    setIsSignup(true);
  };

  const signUp = async () => {
    // setIsSignup(true);
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const token = jwt.encode({ id: username, password: password }, 'gopal@123');

    const user: UserData = { username, email, token };

    try {
      await AsyncStorage.setItem('user_data', JSON.stringify(user));
      Alert.alert('Success', 'User registered successfully!');
      setIsSignup(false);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.warn('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <View style={styles.container}>
      {isSignup ? (
        <Text style={styles.title}>Signup Screen</Text>
      ) : (
        <Text style={styles.title}>Login Screen</Text>
      )}
      {isSignup ? (
        <>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </>
      )}
      {!isSignup ? (
        <>
          <Button title="Login" onPress={onLogin} />{' '}
          <Button title="createAccount" onPress={createAccount} />
        </>
      ) : (
        <></>
      )}

      {isSignup ? <Button title="SignUp" onPress={signUp} /> : <></>}

      {biometricSupported ? (
        <Text style={styles.note}>Biometric login enabled</Text>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 15,
    padding: 10,
  },
  note: { marginTop: 15, color: 'green', textAlign: 'center' },
});
