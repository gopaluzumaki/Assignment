// src/screens/EventDetailScreen.tsx
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getEventById } from '../api/ticketmaster';
import { FavoritesContext } from '../store/FavoritesContext';
import MapPreview from '../Components/MapPreview';

type EventDetailRouteProp = RouteProp<
  { EventDetail: { id: string } },
  'EventDetail'
>;

export const EventDetailScreen: React.FC = () => {
  const route = useRoute<EventDetailRouteProp>();
  const eventId = route.params.id;
  const [event, setEvent] = useState<any>(null);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    getEventById(eventId).then(res => setEvent(res));
  }, [eventId]);

  if (!event) return <Text>Loading...</Text>;

  const lat = event._embedded?.venues?.[0]?.location?.latitude;
  const lon = event._embedded?.venues?.[0]?.location?.longitude;
  const isFav = favorites.includes(eventId);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {event.images?.[0]?.url && (
        <Image source={{ uri: event.images[0].url }} style={styles.image} />
      )}
      <Text style={styles.title}>{event.name}</Text>
      <Text>
        {event.dates?.start?.localDate} at {event._embedded?.venues?.[0]?.name}
      </Text>
      <Button
        title={isFav ? 'Unfavorite' : 'Favorite'}
        onPress={() => toggleFavorite(eventId)}
      />
      {lat && lon && <MapPreview lat={parseFloat(lat)} lon={parseFloat(lon)} />}
      <Text style={styles.description}>
        {event.info || event.description || 'No description available.'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: '100%', height: 200, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  description: { marginTop: 15, fontSize: 16, lineHeight: 22 },
});
