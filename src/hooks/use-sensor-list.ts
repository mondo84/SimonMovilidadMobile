import { useQuery } from "@tanstack/react-query";
import { getSensor } from "../services/dashboard-service";

export const useSensorDataList = (
  date: string,
  showInactive = false,
  token: string,
) => {
  return useQuery({
    queryKey: ["sensordata", date, showInactive, token], // se puede usar un array para pasar parámetros a la función de consulta, lo que permite que React Query maneje el almacenamiento en caché y la invalidación de manera más eficiente.
    queryFn: () => getSensor(date, showInactive, token),
    staleTime: 1000 * 60, // 1 minuto cache
  });
};
