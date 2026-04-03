import { LoginRequest, LoginResp } from "../types/all-types";

export const loginRequest = async (data: LoginRequest): Promise<LoginResp> => {
  console.log(data);
  const response = await fetch("http://192.168.1.3:5010/api/auth/login", {
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
