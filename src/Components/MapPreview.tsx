// src/components/MapPreview.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MapPreviewProps {
  lat: number;
  lon: number;
}

const MapPreview: React.FC<MapPreviewProps> = ({ lat, lon }) => (
  <View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={{ latitude: lat, longitude: lon }} />
    </MapView>
  </View>
);

const styles = StyleSheet.create({
  container: { height: 200, marginVertical: 10 },
  map: { flex: 1 },
});

export default MapPreview;
