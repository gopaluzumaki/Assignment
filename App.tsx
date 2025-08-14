import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from './src/store/FavoritesContext';
import { AuthProvider } from './src/store/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
