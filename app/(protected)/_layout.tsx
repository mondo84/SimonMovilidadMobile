import { SignalRProvider } from "@/components/SignalRContext";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../src/hooks/use-auth";

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  // Guard.
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <SignalRProvider>
      {/* Conexion global para toda la app */}
      <Stack screenOptions={{ headerShown: false }} />
    </SignalRProvider>
  );
}
