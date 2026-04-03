import AppHeader from "@/components/app-header";
import { useSignalR } from "@/components/SignalRContext";
import { fuelListMap, speedListMap } from "@/hooks/sensor-list-map";
import { useAuth } from "@/src/hooks/use-auth";
import { useSensorDataList } from "@/src/hooks/use-sensor-list";
import { SensorType } from "@/src/types/sensor-type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

// Devuelve dimensiones de la pantalla. width, height
const { width } = Dimensions.get("window");

export default function Dashboard() {
  const { token } = useAuth();
  const { data, isSuccess, refetch } = useSensorDataList(false, token ?? "");
  const [sensorList, setSensorList] = useState<SensorType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { subscribe, unsubscribe } = useSignalR();

  useEffect(() => {
    if (isSuccess && data?.data) {
      setSensorList(data?.data); // inicializa desde backend.
    }
  }, [isSuccess, data]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const result = await refetch(); // react-query refetch
      if (result?.data?.data) {
        setSensorList(result.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  useEffect(() => {
    // callback que recibirá los datos del evento
    const handleSensorUpdate = (data: SensorType) => {
      setSensorList((prev) => [...prev, data]);
    };

    subscribe<SensorType>("LOCATION_UPDATE_ONE", handleSensorUpdate);
    return () => {
      unsubscribe<SensorType>("LOCATION_UPDATE_ONE", handleSensorUpdate);
    };
  }, [subscribe, unsubscribe]);

  const chartFuelData = fuelListMap(sensorList);
  const charSpeedData = speedListMap(sensorList);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        colors={["#020617", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.content]}
      >
        <AppHeader showBack={true} />

        <View style={[styles.card]}>
          <Text style={styles.title}>Combustible</Text>
          {chartFuelData.datasets[0].data.length ? (
            <LineChart
              data={chartFuelData}
              width={width - 5}
              height={300}
              chartConfig={{
                backgroundGradientFrom: "#020617",
                backgroundGradientTo: "#000000",
                color: () => "#9b944b",
              }}
              style={{ borderRadius: 10 }}
              bezier
            />
          ) : (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="fuel"
                size={100}
                color="#9b944b"
                style={{ textAlign: "center" }}
              />
            </View>
          )}
        </View>

        <View style={[styles.card]}>
          <Text style={styles.title}>Velocidad</Text>
          {charSpeedData.datasets[0].data.length ? (
            <LineChart
              data={charSpeedData}
              width={width - 5}
              height={300}
              chartConfig={{
                backgroundGradientFrom: "#000000",
                backgroundGradientTo: "#020617",
                color: () => "#38bdf8",
              }}
              style={{ borderRadius: 10 }}
            />
          ) : (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="speedometer"
                size={100}
                color="#38bdf8"
                style={{
                  textAlign: "center",
                }}
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 110,
    paddingHorizontal: 2,
  },
  card: {
    backgroundColor: "#0b1628",
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#a8a8a8",
    fontSize: 16,
    marginBottom: 5,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
});
