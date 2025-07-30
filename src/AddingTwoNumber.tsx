import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const AddTwoNumbersScreen = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const addNumbers = () => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    if (!isNaN(num1) && !isNaN(num2)) {
      setResult(num1 + num2);
    } else {
      setResult(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Adding Two Numbers</Text>

      <TextInput
        style={styles.input}
        placeholder="First Number"
        keyboardType="numeric"
        value={firstNumber}
        onChangeText={setFirstNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Second Number"
        keyboardType="numeric"
        value={secondNumber}
        onChangeText={setSecondNumber}
      />

      <View style={{ borderWidth: 1, backgroundColor: 'lightgrey' }}>
        <Button title="Add Two Numbers" color="black" onPress={addNumbers} />
      </View>

      <Text style={styles.result}>Total: {result !== null ? result : ''}</Text>
    </SafeAreaView>
  );
};

export default AddTwoNumbersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginHorizontal: 24,
    borderRadius: 32,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  result: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
