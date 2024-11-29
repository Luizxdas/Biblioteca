import axios from "axios";

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: "https://localhost:8081",
});

export const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refresh");
    if (response.status === 200) {
      return true;
    } else if (response.status === 400) {
      throw new Error(
        "Falha ao obter refresh token: refresh_token não encontrado."
      );
    } else {
      throw new Error("Erro desconhecido ao obter refresh token");
    }
  } catch (error) {
    console.error("Erro no refreshToken:", error);
    throw error;
  }
};

export const fetchBooks = async (setBooks, setLoading, setGenres) => {
  try {
    const response = await api.get("/books");
    setBooks(response.data);
    setLoading(false);

    const uniqueGenres = [...new Set(response.data.map((book) => book.genre))];
    setGenres(uniqueGenres);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return;
    }
    console.error(error);
    setLoading(false);
  }
};

export default api;
