import { useAuth } from "@/src/hooks/use-auth";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AppHeaderProps = {
  showBack?: boolean;
};

const AppHeader = ({ showBack = false }: AppHeaderProps) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    logout(); // isAutenticated a false en el state.
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.back}>Volver</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        <Text style={styles.user}>{user?.userName ?? ""}</Text>
      </View>

      <View style={styles.right}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 4,
    right: 4,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    padding: 12,
  },
  left: {
    width: 50,
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  right: {
    width: 60,
    alignItems: "flex-end",
  },
  user: {
    color: "#969696",
    fontWeight: "bold",
  },
  back: {
    color: "#38bdf8",
  },
  logout: {
    color: "#ef4444",
  },
});
