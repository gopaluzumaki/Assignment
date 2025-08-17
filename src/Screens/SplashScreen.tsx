import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../store/AuthContext';

export const SplashScreen: React.FC = ({ navigation }: any) => {
  const { restoreToken } = useContext(AuthContext);

  useEffect(() => {
    const initialize = async () => {
      await restoreToken();
    };
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
    initialize();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
});
