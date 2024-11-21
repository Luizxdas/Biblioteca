import axios from "axios";
import { useAuth } from "./auth/useAuth";

export const api = axios.create({
  baseURL: "http://localhost:8081",
});

{
  /*  Conecta a API, salva os dados (setBooks) e os gêneros (setGenres). */
}
export const fetchBooks = async (setBooks, setLoading, setGenres) => {
  try {
    const response = await api.get("/books");
    setBooks(response.data);
    setLoading(false);

    const uniqueGenres = [...new Set(response.data.map((book) => book.genre))];
    setGenres(uniqueGenres);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

{
  /*  Intercepta e trata o erro 401. */
}
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const { checkLoginStatus } = useAuth();
        await checkLoginStatus();

        return axios();
      } catch (refreshError) {
        console.log("Refresh token inválido, deslogando...");
        window.location.href = "/?login=true"; // Ou use React Router: history.push('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
