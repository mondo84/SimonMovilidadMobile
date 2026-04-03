import AsyncStorage from "@react-native-async-storage/async-storage";

// Guardar un dato del sensor en cache
export const saveSensorData = async (data: any) => {
  try {
    const oldData = await AsyncStorage.getItem("sensorData");
    const parsed = oldData ? JSON.parse(oldData) : [];
    parsed.push(data);
    await AsyncStorage.setItem("sensorData", JSON.stringify(parsed));
  } catch (e) {
    console.log("Error guardando datos en caché", e);
  }
};

// Cargar datos del cache
export const loadSensorData = async () => {
  try {
    const stored = await AsyncStorage.getItem("sensorData");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.log("Error leyendo datos de caché", e);
    return [];
  }
};
