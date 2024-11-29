import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import { api, refreshToken } from "../apiService";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const refresh = await refreshToken();

      if (refresh) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (username, password) => {
    if (!username || !password) {
      return { error: "Todos os campos são obrigatórios." };
    }

    try {
      const response = await api.post(
        "/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setIsLoggedIn(true);

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

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
