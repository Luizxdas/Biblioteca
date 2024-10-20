import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Books({ search, setGenres, selectedGenres, booksOrder }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  {
    /*  Conecta a API, salva os dados (setBooks) e os gêneros (setGenres). */
  }
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8081/books");
        setBooks(response.data);
        setLoading(false);

        const uniqueGenres = [
          ...new Set(response.data.map((book) => book.genre)),
        ];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [setGenres]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5 md:gap-x-32">
        {books
          .filter((book) => {
            {
              /* Filtra os livros com base na pesquisa e/ou gênero. */
            }
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
            {
              /* Ordena os livros com base na ordem especificada em booksOrder. */
            }
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
          .map((book) => {
            {
              /* Mapeia cada livro para um elemento de lista. */
            }
            return (
              <li key={book.id} className="list-none">
                <img
                  src={book.image}
                  alt="Imagem de capa do livro"
                  className="w-44 h-72 md:w-52 md:h-80"
                />
                <h1 className="text-center text-lg font-medium mt-2">
                  {book.title}
                </h1>
                <h2 className="text-center text-sm font-medium">
                  {book.author}
                </h2>
              </li>
            );
          })}
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
