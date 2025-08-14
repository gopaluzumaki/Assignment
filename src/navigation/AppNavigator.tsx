import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { EventDetailScreen } from '../screens/EventDetailScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { AuthContext } from '../store/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { state } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerBackVisible: false, headerLeft: () => {} }}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerBackVisible: false, headerLeft: () => {} }}
      />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
