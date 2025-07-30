import React from 'react';
import { SafeAreaView } from 'react-native';
import AddTwoNumbersScreen from './src/AddingTwoNumber';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AddTwoNumbersScreen />
    </SafeAreaView>
  );
};

export default App;
