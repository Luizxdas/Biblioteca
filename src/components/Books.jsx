import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Books({ search }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8081/books");
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5 md:gap-x-32">
      {books
        .filter((book) => {
          return search.toLowerCase() === ""
            ? book
            : book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase());
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
              <h2 className="text-center text-sm font-medium">{book.author}</h2>
            </li>
          );
        })}
    </div>
  );
}

Books.propTypes = {
  search: PropTypes.string.isRequired,
};

export default Books;
