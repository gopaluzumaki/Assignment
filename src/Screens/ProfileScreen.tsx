// src/screens/ProfileScreen.tsx
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../store/AuthContext';
import { FavoritesContext } from '../store/FavoritesContext';
import { CommonActions } from '@react-navigation/native';
import { Colors } from '../constants/colors';

export const ProfileScreen: React.FC = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('profile')}</Text>
      <Text style={styles.subtitle}>{t('favorites')}</Text>
      <FlatList
        data={favorites}
        keyExtractor={item => item}
        renderItem={({ item }) => <Text>- {item}</Text>}
        ListEmptyComponent={
          <Text style={{ marginTop: 8 }}>{t('noFavorites')}</Text>
        }
      />
      <Button
        title={t('logout')}
        onPress={() => {
          Alert.alert('LoggedOut successfully');
          signOut();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }),
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 18, marginTop: 20, color: Colors.blue },
});
