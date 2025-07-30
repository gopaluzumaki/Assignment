import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  numbers: string;
  target: string;
};

export const GetTargetIndex = ({ onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [result, setResult] = React.useState<number[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    setError(null);
    try {
      const nums = data.numbers
        .split(',')
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n));
      const target = parseInt(data.target);

      if (!Array.isArray(nums) || nums.length < 2) {
        throw new Error('Invalid number array');
      }

      const indices = twoSum(nums, target);
      setResult(indices);
    } catch (err: any) {
      setResult(null);
      setError(err.message || 'Something went wrong');
    }
  };

  const twoSum = (numbers: number[], target: number): number[] => {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
      const sum = numbers[left] + numbers[right];
      if (sum === target) {
        return [left + 1, right + 1];
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }

    throw new Error('No valid pair found');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeStyles}>X</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>Two Sum (Sorted Input)</Text>

        <Controller
          control={control}
          name="numbers"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter sorted numbers (e.g. 2,7,11,15)"
              style={styles.input}
              onChangeText={onChange}
              value={value}
              keyboardType="numbers-and-punctuation"
            />
          )}
        />
        {errors.numbers && <Text style={styles.error}>Array is required</Text>}

        <Controller
          control={control}
          name="target"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter target (e.g. 9)"
              style={styles.input}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
        />
        {errors.target && <Text style={styles.error}>Target is required</Text>}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />

        {result && (
          <Text style={styles.result}>
            Result: [{result[0]}, {result[1]}]
          </Text>
        )}
        {error && (
          <Text style={[styles.error, { textAlign: 'center' }]}> {error}</Text>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  closeStyles: {
    fontSize: 20,
    textAlign: 'right',
    marginRight: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'left',
  },
});
