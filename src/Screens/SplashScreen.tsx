// src/screens/SplashScreen.tsx
import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { initSslPinning } from '../services/sslPinning';
import { AuthContext } from '../store/AuthContext';

export const SplashScreen: React.FC = ({ navigation }) => {
  const { restoreToken } = useContext(AuthContext);

  useEffect(() => {
    const initialize = async () => {
      await initSslPinning();
      await restoreToken();
    };
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2500);
    initialize();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>City Pulse</Text>
      {/* <ActivityIndicator size="large" color="#000" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
});
