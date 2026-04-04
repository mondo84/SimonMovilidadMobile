# 📱 IOT MOBILE – DESIGN DOCUMENT

## 🧾 Descripción General

**IOT Mobile** es una aplicación móvil enfocada en el monitoreo y visualización de dispositivos IoT en tiempo real. Permite a los usuarios consultar datos de sensores, visualizar información histórica, recibir alertas y ubicar dispositivos en un mapa interactivo.

---

## 🏗️ Arquitectura

La aplicación sigue una arquitectura cliente-servidor:

- **Frontend (Mobile App)**
  Aplicación desarrollada con React Native y Expo.

- **Backend (API REST + WebSockets)**
  Servicio encargado de la lógica de negocio, acceso a datos y comunicación en tiempo real.

- **Base de Datos**
  Almacenamiento de sensores, eventos y alertas.

- **Comunicación en Tiempo Real**
  Implementada mediante SignalR.

---

## ⚙️ Tecnologías Usadas

### 📱 Mobile

- React Native + Expo
- TypeScript

### 🎨 UI / UX

- expo-linear-gradient
- react-native-chart-kit
- react-native-maps

### 📡 Comunicación

- @microsoft/signalr
- @tanstack/react-query

### 🧠 Estado y Formularios

- zustand
- react-hook-form
- @hookform/resolvers
- zod

### 🔔 Sistema y Utilidades

- expo-notifications
- expo-constants (.env)
- date-fns (format())

---

### 🔐 Autenticación

- Login de usuario
- Validación de formularios con Zod
- Manejo de estado con Zustand + React Context

---

### 📊 Dashboard

- Visualización de datos en tiempo real
- Gráficas de sensores usando chart-kit
- Actualización automática con React Query

---

### 🚨 Alertas

- Listado de eventos del dia actual

---

### 🗺️ Mapa

- Visualización de dispositivos en Google Maps
- Marcadores dinámicos
- Interacción con ubicaciones

---

### 🔔 Notificaciones

- Recepción de eventos en tiempo real
- Integración con Expo Notifications
- Conexión persistente con SignalR

---

## 🔄 Flujo de Datos

1. El usuario inicia sesión
2. Se realizan consultas a la API mediante React Query
3. Se establece conexión con SignalR
4. Se reciben eventos en tiempo real
5. Se actualiza el estado global (Zustand)
6. Se renderiza la UI dinámicamente

---

## 🧠 Manejo de Estado

- **Global:** Zustand
- **Server State:** React Query
- **Formularios:** React Hook Form + Zod

---

## 🔐 Seguridad

- Validación de datos con Zod
- Manejo de sesiones en frontend
- Comunicación con backend mediante endpoints seguros

---

## 📶 Conectividad

- Requiere conexión a internet o red local
- Compatible con entornos LAN (backend local)
- Manejo de reconexión en SignalR

---

## ⚠️ Consideraciones Técnicas

- Android requiere configuración adicional para tráfico HTTP (`usesCleartextTraffic`)
- Google Maps requiere API Key en entorno nativo
- APK release incluye bundle JS (no depende de Metro)

---

## 🚀 Futuras Mejoras

- Notificaciones push avanzadas
- Mejoras en rendimiento del mapa

---

## 👨‍💻 Autor

Yesid Davila. Aplicación desarrollada como prueba tecnica IoT para monitoreo en tiempo real.

---
