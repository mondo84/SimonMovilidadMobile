import { SensorType } from "@/src/types/sensor-type";

const formatTimestamp = (timestamp: string): string => {
  return timestamp
    ? (() => {
        const timeSplit = timestamp.split("T");
        const [hour, minute] = timeSplit[1].split(":");
        return `${hour}:${minute}`;
      })()
    : "--";
};

export const fuelListMap = (sensorList: SensorType[]) => {
  return sensorList.length
    ? sensorList.reduce(
        (newList, item) => {
          const value = Number(item.FuelLevel);
          if (!isFinite(value)) return newList;

          const label = item.Timestamp ? formatTimestamp(item.Timestamp) : "";
          newList.labels.push(label);
          newList.datasets[0].data.push(value);

          return newList;
        },
        { labels: [] as string[], datasets: [{ data: [] as number[] }] },
      )
    : { labels: [], datasets: [{ data: [] }] };
};

export const speedListMap = (sensorList: SensorType[]) => {
  return sensorList.length
    ? sensorList.reduce(
        (newList, item) => {
          const value = Number(item.Speed);
          if (!isFinite(value)) return newList;

          const label = item.Timestamp ? formatTimestamp(item.Timestamp) : "";
          newList.labels.push(label);
          newList.datasets[0].data.push(value);

          return newList;
        },
        { labels: [] as string[], datasets: [{ data: [] as number[] }] },
      )
    : { labels: [], datasets: [{ data: [] }] };
};
