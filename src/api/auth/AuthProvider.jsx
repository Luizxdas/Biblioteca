import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Função de Registro
  const register = async (email, username, password) => {
    if (!email || !username || !password) {
      return { error: "Todos os campos são obrigatórios." };
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/register",
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

  // Função de Login
  const login = async (username, password) => {
    try {
      await axios.post("http://localhost:8081/login", {
        username,
        password,
      });

      setIsLoggedIn(true);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ register, login, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
