import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Switch,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { searchEvents } from '../api/ticketmaster';
import { FavoritesContext } from '../store/FavoritesContext';
import Icons from '../../android/app/assets';
import i18n from '../il8n';

export const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const onSearch = async () => {
    setIsLoading(true);
    const res = await searchEvents(keyword, city);
    console.log('res', JSON.stringify(res));
    setEvents(res);
    setIsLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={() => navigation.navigate('EventDetail', { id: item.id })}
    >
      <View style={{ borderWidth: 0.5, padding: 12, marginVertical: 8 }}>
        <Text>{item.name}</Text>
      </View>
      <View>
        <Button
          title={favorites.includes(item.name) ? 'Unfavorite' : 'Favorite'}
          onPress={() => toggleFavorite(item.name)}
        />
      </View>
    </TouchableOpacity>
  );

  const toggleSwitch = async () => {
    const newLanguage = isEnabled ? 'en' : 'ar';
    await i18n.changeLanguage(newLanguage);
    I18nManager.forceRTL(newLanguage === 'ar');
    setIsEnabled(!isEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Switch
          trackColor={{ false: '#767577', true: 'light-green' }}
          thumbColor={isEnabled ? 'f4f3f4' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={Icons.Profile}
            style={{ height: 30, width: 30 }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <TextInput
          placeholder={t('search')}
          value={keyword}
          onChangeText={setKeyword}
          style={styles.keyworkTextInputStyle}
        />
        <View style={{ marginVertical: 14 }} />
        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
          style={styles.keyworkTextInputStyle}
        />
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            padding: 12,
            marginTop: 24,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={onSearch}
        >
          <Text>{t('search')}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 100 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          events.length > 0 && (
            <>
              <Text
                style={{
                  textAlign: 'left',
                  color: 'blue',
                  fontWeight: 'bold',
                  marginBottom: 24,
                }}
              >
                {'List of events'}
              </Text>
              <FlatList
                data={events}
                keyExtractor={item => item.id}
                renderItem={renderItem}
              />
            </>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  subContainer: {
    marginTop: 48,
  },
  keyworkTextInputStyle: {
    borderWidth: 0.5,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
});
