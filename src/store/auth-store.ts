import { create } from "zustand";
import { AuthState } from "../types/all-types";

// Creamos el state para mantener datos globales y validar isAuthenticated
// en cada layout. adicionalmente acceso a los datos del usuario.
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: ({ data, token }) =>
    set({ user: data, token, isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));
