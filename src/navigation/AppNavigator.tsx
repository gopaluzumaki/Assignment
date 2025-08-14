// src/navigation/AppNavigator.tsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { EventDetailScreen } from '../screens/EventDetailScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { AuthContext } from '../store/AuthContext';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  EventDetail: { id: string };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { state } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerBackVisible: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
