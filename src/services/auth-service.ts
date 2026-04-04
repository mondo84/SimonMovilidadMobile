import Constants from "expo-constants";
import { LoginRequest, LoginResp } from "../types/all-types";
const API_URL = Constants.expoConfig?.extra?.API_URL;

export const loginRequest = async (data: LoginRequest): Promise<LoginResp> => {
  console.log(data);
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error en login");
  }

  return response.json();
};
