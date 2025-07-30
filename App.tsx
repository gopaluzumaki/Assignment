import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import AddTwoNumbersScreen from './src/Screens/AddingTwoNumber';
import { GetTargetIndex } from './src/Screens/GetTargetIndex';
import MobileNavBar from './src/Screens/NavBar/MobileNavBar';

const App = () => {
  const [screen, setScreen] = useState('');
  useEffect(() => {}, []);

  const handlePress = text => {
    setScreen(text);
  };

  const onClose = () => {
    setScreen('');
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      {screen.length === 0 && (
        <>
          <View style={styles.buttonGroup}>
            <Button
              title="Challenge 1 ==> Show Calculator"
              onPress={() => handlePress('Calculator')}
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Challenge 2 ==> Show NavBar"
              onPress={() => handlePress('NavBar')}
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Challenge 3 ==> Show GettingTargetIndex"
              onPress={() => handlePress('GetTargetIndex')}
            />
          </View>
        </>
      )}
      {screen === 'Calculator' ? (
        <AddTwoNumbersScreen onClose={onClose} />
      ) : screen === 'NavBar' ? (
        <MobileNavBar onClose={onClose} />
      ) : (
        screen === 'GetTargetIndex' && <GetTargetIndex onClose={onClose} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonGroup: {
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 0.5,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
