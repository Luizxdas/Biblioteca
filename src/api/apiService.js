import axios from "axios";

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: "https://localhost:8081",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn(
        "Não autorizado: Usuário não autenticado ou sessão expirada."
      );
      return Promise.resolve(null);
    } else if (error.response && error.response.status === 400) {
      console.warn(
        "Não autenticado: Usuário não autenticado ou token não encontrado."
      );
      return Promise.resolve(null);
    } else {
      console.error("Erro inesperado:", error);
      return Promise.reject(error);
    }
  }
);

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh");
  return response ? true : false;
};

export const fetchUserData = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    }
    console.error(error);
    throw error;
  }
};

export const fetchBooks = async () => {
  try {
    const response = await api.get("/books");
    const books = response.data;

    const uniqueGenres = [...new Set(books.map((book) => book.genre))];

    return { books, genres: uniqueGenres };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    }
    console.error(error);
    throw error;
  }
};

export default api;
