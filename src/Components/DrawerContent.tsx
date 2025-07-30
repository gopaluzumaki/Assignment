import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import MenuItem from './MenuItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const selectedItem = props.state.routes[props.state.index];

  const handleOnPressMenuItem = menu => {
    props.navigation.navigate(menu.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>{selectedItem.name}</Text>

        <View style={styles.icons}>
          <MaterialIcons name="search" size={24} />
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <MaterialIcons name="close" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {props.state.routes.map(item => {
        return (
          <MenuItem
            item={{ name: item.name, route: item.path }}
            onPress={handleOnPressMenuItem}
          />
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingVertical: 14,
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
