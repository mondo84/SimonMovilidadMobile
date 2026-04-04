# ⚙️ IOT MOBILE – SETUP GUIDE

## 📦 Repositorio

Clonar el proyecto desde:

```bash
git clone https://github.com/mondo84/SimonMovilidadMobile.git
```

---

## 📥 Instalación de dependencias

Una vez descargado el proyecto, ejecutar:

```bash
npm install
```

Esto instalará todas las dependencias necesarias para ejecutar la aplicación.

---

## ▶️ Variable de entorno

Cambiar la Ip (no acepta localhost porque es Mobile, no web) en la que está el servidor.
EJ: API_URL=http://192.168.1.3:5010

---

## ▶️ Ejecutar el proyecto

Para iniciar la aplicación en modo desarrollo:

```bash
npx expo start
```

O si necesitas limpiar la caché:

```bash
npx expo start -c
```

---

## 📱 Ejecutar en dispositivo móvil

1. Al ejecutar el proyecto, se mostrará un **código QR** en la consola o en el navegador.
2. Instalar la app Expo Go desde Play Store.
3. Abrir la aplicación.
4. Seleccionar la opción **“Scan QR Code”**.
5. Escanear el código QR generado.

👉 La aplicación se cargará automáticamente en el dispositivo.

---

## 🖥️ Logs de desarrollo

Una vez iniciado el proyecto:

- Los logs se visualizarán en la consola donde ejecutaste `expo start`.
- También puedes ver logs directamente en Expo Go.

---

## 📦 Generar APK (Android)

Desde la carpeta `android/` del proyecto, ejecutar en **Git Bash**:

```bash
chmod +x gradlew
./gradlew assembleRelease
```

ejecutar en **CMD**:

```bash
gradlew.bat assembleRelease
```

ejecutar en **PowerShell**:

```bash
.\gradlew assembleRelease
```

---

## 📂 Ubicación del APK generado

```bash
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🗺️ Configurar API Key de Google Maps

Después de generar el APK, debes agregar tu API Key:

1. Ir a:

```bash
android/app/src/main/AndroidManifest.xml
```

2. Dentro de la etiqueta `<application>`, agregar:

```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="tu_api_key_google_maps_for_android"/>
```

---

## ⚠️ Importante

- Es necesario activar **Maps SDK for Android** en tu API Key.
- Después de agregar la API Key, debes volver a compilar el APK.
- Para desarrollo local, asegúrate de que el backend esté accesible desde tu red.

---

## 📶 Requisitos

- Node.js instalado
- Expo CLI (opcional)
- Dispositivo móvil con Expo Go
- Conexión a la misma red WiFi (PC y celular)

---

## 🚀 Notas adicionales

- Si tienes problemas de conexión en Android (APK), habilita tráfico HTTP en el `AndroidManifest.xml`:

```xml
android:usesCleartextTraffic="true"
```

- El APK en modo release funciona de forma independiente (no requiere Metro).

---

## 👨‍💻 Uso

Una vez configurado todo:

- Ejecuta el proyecto con Expo
- O instala el APK en tu dispositivo

---
