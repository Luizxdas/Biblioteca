import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081",
});

export const fetchBooks = async () => {
  try {
    const response = await api.get("/books");
    const books = response.data;

    const uniqueGenres = [...new Set(books.map((book) => book.genre))];

    return { books, genres: uniqueGenres };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchBook = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    const book = response.data;

    return book;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    }
    console.error(error);
    throw error;
  }
};

export default api;
