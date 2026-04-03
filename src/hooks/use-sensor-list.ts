import { useQuery } from "@tanstack/react-query";
import { getSensor } from "../services/dashboard-service";

export const useSensorDataList = (showInactive = false, token: string) => {
  return useQuery({
    queryKey: ["sensordata", showInactive, token], // se puede usar un array para pasar parámetros a la función de consulta, lo que permite que React Query maneje el almacenamiento en caché y la invalidación de manera más eficiente.
    queryFn: () => getSensor(showInactive, token),
    staleTime: 1000 * 60, // 1 minuto cache
  });
};
