import { useState, useEffect } from "react";
import { fetchBooks } from "../api/apiService";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Books({ search, setGenres, selectedGenres, booksOrder }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks()
      .then(({ books, genres }) => {
        setBooks(books);
        setGenres(genres);
      })
      .catch((err) => console.error("Erro ao buscar livros:", err))
      .finally(() => setLoading(false));
  }, [setGenres]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5 md:gap-x-32">
        {books
          .filter((book) => {
            const matchesSearch =
              search === "" ||
              book.title.toLowerCase().includes(search.toLowerCase()) ||
              book.author.toLowerCase().includes(search.toLowerCase());

            const matchesGenre =
              selectedGenres.length === 0 ||
              selectedGenres.some((genre) => book.genre.includes(genre));

            return matchesSearch && matchesGenre;
          })
          .sort((a, b) => {
            switch (booksOrder) {
              case "author":
                return a.author.localeCompare(b.author);
              case "genre":
                return a.genre.localeCompare(b.genre);
              case "name":
                return a.title.localeCompare(b.title);
              case "date":
                return new Date(a.date) - new Date(b.date);
              default:
                return 0;
            }
          })
          .map((book) => (
            <li key={book.id} className="list-none">
              <Link to={`/books/${book.id}`} className="block">
                <img
                  src={book.image}
                  alt="Imagem de capa do livro"
                  className="w-44 h-72 md:w-52 md:h-80"
                />
                <h1 className="mt-2 text-lg font-medium text-center">
                  {book.title}
                </h1>
                <h2 className="text-sm font-medium text-center">
                  {book.author}
                </h2>
              </Link>
            </li>
          ))}
      </div>
    </div>
  );
}

Books.propTypes = {
  search: PropTypes.string.isRequired,
  setGenres: PropTypes.func.isRequired,
  selectedGenres: PropTypes.array,
  booksOrder: PropTypes.string,
};

export default Books;
