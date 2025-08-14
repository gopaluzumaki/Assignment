// App.tsx
import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from './src/store/FavoritesContext';
import i18n, { toggleLanguage } from './src/i18n';
import { initSslPinning } from './src/services/sslPinning';
import { AuthProvider } from './src/store/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  useEffect(() => {
    initSslPinning();
  }, []);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <AppNavigator />
          {/* Optional: Add a button somewhere to toggle languages */}
          {/* Example usage:
            <Button title="Toggle Lang" onPress={() => {
              toggleLanguage().then(() => {
                // Optionally reload to apply RTL layout
              });
            }} />
          */}
        </NavigationContainer>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
