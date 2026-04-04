import { SignalRContextType } from "@/src/types/all-types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import Constants from "expo-constants";
import React, { createContext, useContext, useEffect, useRef } from "react";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const SignalRContext = createContext<SignalRContextType>({
  connection: null, // Conexion
  subscribe: () => {}, // Escuachar eventos
  unsubscribe: () => {}, // Remover evento al desmontar el componente.
});

export const useSignalR = () => useContext(SignalRContext); // Global.

// Envuelve el layout para tener contexto solo en las rutas protegidas.
export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${API_URL}/ws/alerts`)
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection
      .start()
      .then(() => console.log("SignalR conectado"))
      .catch((err) => console.log("Error al conectar", err));

    return () => {
      connectionRef.current?.stop();
      connectionRef.current = null;
    };
  }, []);

  // , Indica generico a TS, no JSX.
  const subscribe = <T,>(event: string, callback: (data: T) => void) => {
    connectionRef.current?.on(event, callback);
  };

  // , indica generico TS, no JSX.
  const unsubscribe = <T,>(event: string, callback: (data: T) => void) => {
    connectionRef.current?.off(event, callback);
  };

  return (
    <SignalRContext.Provider
      value={{ connection: connectionRef.current, subscribe, unsubscribe }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
