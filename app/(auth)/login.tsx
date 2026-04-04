import ErrorMessage from "@/components/error-message";
import { useLogin } from "@/src/hooks/use-login";
import { loginSchema, LoginSchema } from "@/src/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../../src/hooks/use-auth";

const Login = () => {
  const router = useRouter();
  const { setAuth } = useAuth();
  const { mutate, isPending } = useLogin(); // Reack tanstack query.
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authError, setAuthError] = useState<string | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: (res) => {
        router.replace("/home"); // No queda en historial de navegacion.
        // Guardamos datos en el state Zustand,
        setAuth({ data: res.data, token: res.token });
      },
      onError: (err) => {
        setAuthError(err.message);
      },
    });
  };

  return (
    <LinearGradient
      colors={["#020617", "#000000"]} // gradiente top → bottom
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>IOT APP</Text>

      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <>
            <TextInput
              placeholder="Usuario"
              placeholderTextColor="#c0c0c0"
              style={styles.input}
              value={field.value}
              onChangeText={(text) => {
                field.onChange(text);
                setAuthError(undefined);
              }}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#c0c0c0"
              secureTextEntry={!passwordVisible}
              style={styles.input}
              value={value}
              onChangeText={(text) => {
                onChange(text);
                setAuthError(undefined);
              }}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
        <Text style={styles.toggle}>
          {passwordVisible ? "Ocultar" : "Mostrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleLogin)}
      >
        <Text style={styles.buttonText}>
          {isPending ? "Cargando..." : "Entrar"}
        </Text>
      </TouchableOpacity>
      <ErrorMessage message={authError} />
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#e5e5e5",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 14,
    marginBottom: 5,
  },
  toggle: {
    color: "#38bdf8",
    textAlign: "right",
    marginBottom: 10,
  },
  error: {
    color: "#ef4444",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#003279",
    padding: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "#d9d9d9",
    fontWeight: "bold",
  },
});
