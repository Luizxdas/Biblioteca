import axios from "axios";

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
