import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  number1: string;
  number2: string;
};

const AddingTwoNumber = ({ onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [result, setResult] = React.useState<number | null>(null);

  const onSubmit = (data: FormData) => {
    const sum = parseFloat(data.number1) + parseFloat(data.number2);
    setResult(sum);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeStyles}>X</Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>Adding Two Numbers</Text>

          <Controller
            control={control}
            name="number1"
            rules={{
              required: 'First number is required',
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: 'Enter a valid number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter first number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.number1 && (
                  <Text style={styles.error}>{errors.number1.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="number2"
            rules={{
              required: 'Second number is required',
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: 'Enter a valid number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter second number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.number2 && (
                  <Text style={styles.error}>{errors.number2.message}</Text>
                )}
              </View>
            )}
          />

          <View style={styles.buttonContainer}>
            <Button title="Add Two Numbers" onPress={handleSubmit(onSubmit)} />
          </View>

          <Text style={styles.resultText}>Total: {result}</Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddingTwoNumber;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  closeStyles: {
    fontSize: 20,
    textAlign: 'right',
    marginRight: 22,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 13,
  },
  buttonContainer: {
    marginVertical: 16,
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});
