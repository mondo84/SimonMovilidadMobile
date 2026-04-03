import { ApiResponseTypeG } from "../types/all-types";
import { SensorType } from "../types/sensor-type";

export const getSensor = async (
  showInactive: boolean,
  token: string,
): Promise<ApiResponseTypeG<SensorType[]>> => {
  const response = await fetch(
    `http://192.168.1.3:5010/api/sensor?showInactive=${showInactive}`,
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
