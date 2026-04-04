import Constants from "expo-constants";
import { ApiResponseTypeG } from "../types/all-types";
import { SensorType } from "../types/sensor-type";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const getSensor = async (
  date: string,
  showInactive: boolean,
  token: string,
): Promise<ApiResponseTypeG<SensorType[]>> => {
  const response = await fetch(
    `${API_URL}/api/sensor?date=${date}&showInactive=${showInactive}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Error obteniendo lista de sensor data");
  }

  return response.json();
};
