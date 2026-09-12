import api from "./api";

import type {
  LoginData,
  RegisterData,
  TokenResponse,
  User,
} from "../types";


// =========================
// REGISTER
// =========================

export const registerUser = async (
  data: RegisterData
): Promise<User> => {
  const response = await api.post<User>(
    "/auth/register",
    data
  );

  return response.data;
};


// =========================
// LOGIN
// =========================

export const loginUser = async (
  data: LoginData
): Promise<TokenResponse> => {
  const response = await api.post<TokenResponse>(
    "/auth/login",
    data
  );

  return response.data;
};


// =========================
// GET CURRENT USER
// =========================

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>(
    "/auth/me"
  );

  return response.data;
};