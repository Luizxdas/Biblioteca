import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import { api } from "../apiService";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
    }
  }, []);

  const register = async (email, username, password) => {
    if (!email || !username || !password) {
      return { error: "Todos os campos são obrigatórios." };
    }

    try {
      const response = await api.post(
        "/auth/register",
        { email, username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const status = error.response ? error.response.status : null;
      const errorMessage = error.response
        ? error.response.data
        : "Erro desconhecido ao registrar";

      console.error("Erro ao fazer registro:", errorMessage);
      return {
        success: false,
        error: errorMessage,
        statusCode: status,
      };
    }
  };

  const login = async (username, password) => {
    if (!username || !password) {
      return { error: "Todos os campos são obrigatórios." };
    }
    try {
      const response = await api.post(
        "/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoggedIn(true);
      localStorage.setItem("username", username);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const status = error.response ? error.response.status : null;
      const errorMessage = error.response
        ? error.response.data
        : "Erro desconhecido ao fazer login";

      console.error("Erro ao fazer login:", errorMessage);
      setIsLoggedIn(false);
      return {
        success: false,
        error: errorMessage,
        statusCode: status,
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("username");
      setIsLoggedIn(false);
    } catch (error) {
      const status = error.response ? error.response.status : null;
      const errorMessage = error.response
        ? error.response.data
        : "Erro desconhecido ao fazer logout";

      console.error("Erro ao fazer logout:", errorMessage);
      return {
        success: false,
        error: errorMessage,
        statusCode: status,
      };
    }
  };

  const checkLoginStatus = async () => {
    try {
      const response = await api.post("/auth/refresh");
      setIsLoggedIn(response.data.isLoggedIn);
    } catch (error) {
      console.error("Erro ao verificar status de login:", error);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ register, checkLoginStatus, login, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
