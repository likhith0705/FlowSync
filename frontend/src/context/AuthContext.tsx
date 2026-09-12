import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  LoginData,
  RegisterData,
  User,
} from "../types";

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../api/auth";


interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (data: LoginData) => Promise<void>;

  register: (data: RegisterData) => Promise<void>;

  logout: () => void;
}


const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);


export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);


  // =========================
  // LOAD USER ON APP START
  // =========================

  useEffect(() => {

    const loadUser = async () => {

      const token =
        localStorage.getItem("access_token");


      if (!token) {
        setLoading(false);
        return;
      }


      try {

        const currentUser =
          await getCurrentUser();

        setUser(currentUser);

      } catch (error) {

        console.error(
          "Failed to load user:",
          error
        );

        localStorage.removeItem(
          "access_token"
        );

      } finally {

        setLoading(false);

      }

    };


    loadUser();

  }, []);


  // =========================
  // LOGIN
  // =========================

  const login = async (
    data: LoginData
  ) => {

    const response =
      await loginUser(data);


    localStorage.setItem(
      "access_token",
      response.access_token
    );


    const currentUser =
      await getCurrentUser();

    setUser(currentUser);

  };


  // =========================
  // REGISTER
  // =========================

  const register = async (
    data: RegisterData
  ) => {

    await registerUser(data);

  };


  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    localStorage.removeItem(
      "access_token"
    );

    setUser(null);

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


export function useAuth() {

  const context =
    useContext(AuthContext);


  if (!context) {

    throw new Error(
      "useAuth must be used within AuthProvider"
    );

  }


  return context;

}