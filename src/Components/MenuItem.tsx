import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const MenuItem = ({ item, onPress }) => {
  const handleOnPress = () => {
    if (onPress) onPress(item);
  };

  return (
    <Pressable style={styles.container} onPress={handleOnPress}>
      <Text>{item.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});

export default MenuItem;
