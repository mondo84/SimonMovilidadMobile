import AppHeader from "@/components/app-header";
import { useSignalR } from "@/components/SignalRContext";
import { SensorType } from "@/src/types/sensor-type";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Coords = {
  latitude: number;
  longitude: number;
};

export default function Map() {
  const mapRef = useRef<MapView>(null);
  const [coords, setCoords] = useState<Coords | null>(null);
  const { subscribe, unsubscribe } = useSignalR();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      setCoords({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    // callback que recibirá los datos del evento
    const handleMapUpdate = (data: SensorType) => {
      if (data) {
        const newCoords = {
          latitude: data.Lat,
          longitude: data.Long,
        };

        setCoords(newCoords);

        // Mover el mapa al nuevo marker
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              ...newCoords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            500, // duración de la animación en ms
          );
        }
      }
    };

    subscribe<SensorType>("LOCATION_UPDATE_ONE", handleMapUpdate);
    return () => {
      unsubscribe<SensorType>("LOCATION_UPDATE_ONE", handleMapUpdate);
    };
  }, [subscribe, unsubscribe]);

  return (
    <View style={styles.container}>
      <AppHeader showBack={true} />
      {coords && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={coords} />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  map: { flex: 1 },
});
