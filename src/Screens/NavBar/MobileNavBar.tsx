import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  Pressable,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { MenuItems } from '../../Constants/MenuItems';
import MenuItem from '../../Components/MenuItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();

const FullScreen = () => (
  <View style={styles.screenStyles}>
    <Text>Navbar</Text>
  </View>
);

const MobileNavBar = ({ onClose }) => {
  const renderDrawerMenus = menuItem => {
    return (
      <Drawer.Screen
        name={menuItem.name}
        key={menuItem.name}
        component={FullScreen}
      />
    );
  };

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

const DrawerContent = (drawerProps: DrawerContentComponentProps) => {
  const currentRoute = drawerProps.state.routes[drawerProps.state.index];

  const handleOnPressClose = () => drawerProps.navigation.closeDrawer();

  const handleOnPressMenuItem = menu => {
    drawerProps.navigation.navigate(menu.name);
  };

  const rendermenuItems = menuItem => {
    return (
      <MenuItem
        nav={{ name: menuItem.name, route: menuItem.path }}
        onPress={handleOnPressMenuItem}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>{currentRoute.name}</Text>

        <View style={styles.icons}>
          <MaterialIcons name="search" size={24} color="#000" />
          <Pressable onPress={handleOnPressClose}>
            <MaterialIcons name="close" size={24} color="#000" />
          </Pressable>
        </View>
      </View>
      {drawerProps.state.routes.map(rendermenuItems)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginHorizontal: 24,
  },
  screenStyles: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  closeStyles: {
    fontSize: 20,
    textAlign: 'right',
    marginRight: 22,
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

export default MobileNavBar;
