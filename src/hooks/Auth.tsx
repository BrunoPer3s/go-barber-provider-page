import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@GoBarber: token");
    const user = localStorage.getItem("@GoBarber: user");

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@GoBarber: token", token);
    localStorage.setItem("@GoBarber: user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@GoBarber: token");
    localStorage.removeItem("@GoBarber: user");


    setData({} as AuthState);
  }, []);

  const updateUser = useCallback((user: User) => {
    localStorage.setItem("@GoBarber: user", JSON.stringify(user));

    setData({
      token: data.token,
      user
    });

  }, [data.token]);

  return (
    <AuthContext.Provider value={{ user: data.user, token: data.token, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  
  return context;
}

export { AuthProvider, useAuth };
