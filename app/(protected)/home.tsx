import AppHeader from "@/components/app-header";
import { useSignalR } from "@/components/SignalRContext";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

// Configurar notificaciones mientras la app está abierta
if (Platform.OS !== "web") {
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      return {
        shouldShowAlert: true,
        shouldSetBadge: false,
        shouldPlaySound: true,
        shouldShowBanner: true,
        shouldShowList: true,
      };
    },
  });
}

export default function Home() {
  const router = useRouter();
  const { subscribe, unsubscribe } = useSignalR();
  const [hasPermission, setHasPermission] = useState(false);

  // Permisos
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === "web") return;

      const { status } = await Notifications.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    requestPermissions();
  }, []);

  // signalr
  useEffect(() => {
    if (!hasPermission) return;

    const handler = (data: any) => {
      console.log("EVENTO: ", data);
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Nuevo dato del sensor",
          body: `Ver el historial en Gráficas`,
        },
        trigger: null, // inmediata
      });
    };

    subscribe<any>("LOCATION_UPDATE_ONE", handler);

    return () => {
      unsubscribe<any>("LOCATION_UPDATE_ONE", handler);
    };
  }, [hasPermission]);

  return (
    <LinearGradient
      colors={["#020617", "#000000"]} // gradiente top → bottom
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <AppHeader />

      <Text style={styles.title}>Menu</Text>

      <TouchableOpacity style={styles.card} onPress={() => router.push("/map")}>
        <Text style={styles.text}>Mapa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.text}>Gráficas</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#aaaaaa",
    fontSize: 24,
    marginBottom: 20,
    marginStart: "auto",
    marginEnd: "auto",
  },
  card: {
    backgroundColor: "#003279",
    padding: 20,
    marginBottom: 5,
  },
  text: {
    color: "#d9d9d9",
    fontSize: 16,
  },
});
