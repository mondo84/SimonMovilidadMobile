import { HubConnection } from "@microsoft/signalr";

export type LoginRequest = {
  username: string;
  password: string;
};

export type UserApp = {
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  role: string;
};

export type LoginResp = {
  data: UserApp;
  success: boolean;
  message: string;
  errors: string[];
  token: string;
  status: number;
};

export type AuthState = {
  user: UserApp | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (response: { data: UserApp; token: string }) => void;
  logout: () => void;
};

// =============================

export interface ApiResponseType {
  success: boolean;
  message: string;
  errors: string[];
  token: string;
  status: number;
}

export interface ApiResponseTypeG<T> extends ApiResponseType {
  data?: T;
}

// ===========================

export type LineType = {
  value: number;
  label: string;
};

// ========= Context SingnalR

export type SignalRContextType = {
  connection: HubConnection | null;
  // subscribe: (event: string, callback: (...args: any[]) => void) => void;
  subscribe: <T>(event: string, callback: (data: T) => void) => void;
  unsubscribe: <T>(event: string, callback: (data: T) => void) => void;
};
