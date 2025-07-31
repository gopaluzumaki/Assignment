import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerContent } from '../../Components/DrawerContent';
import { MenuItems } from '../../Constants/MenuItems';

const Drawer = createDrawerNavigator();

const MobileNavBar = ({ onClose }) => {
  const renderDrawerMenus = menuItem => {
    return (
      <Drawer.Screen
        name={menuItem.name}
        key={menuItem.name}
        component={() => (
          <View style={styles.screenStyles}>
            <Text>{menuItem.name}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons
              name="close"
              size={24}
              color="black"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        ),
        drawerType: 'front',
      }}
    >
      {MenuItems.map(renderDrawerMenus)}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  screenStyles: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  closeStyles: {
    fontSize: 20,
    textAlign: 'right',
    marginRight: 22,
  },
});

export default MobileNavBar;
