import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Books({ search, setGenres, selectedGenres }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Conectar a API, salvar os dados (setBooks) e os gêneros (setGenres).
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

  // Filtrar os livros caso o usuário pesquise algo e/ou filtre gêneros e depois mapear cada livro como uma lista.
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
          .map((book) => {
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
};

export default Books;
