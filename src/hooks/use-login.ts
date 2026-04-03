import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../services/auth-service";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};
