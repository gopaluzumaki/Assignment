import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

// type NavBarItemPropsType = {
//   nav: NavItemType;
//   onPress?: (navItem: NavItemType) => void;
// };

const MenuItem = ({ nav, onPress }) => {
  const handleOnPress = () => onPress?.(nav);

  return (
    <Pressable style={styles.container} onPress={handleOnPress}>
      <Text>{nav.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});

export default MenuItem;
