import { useEffect, useState } from "react";
import { fetchBook } from "../api/apiService";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Title from "./Title";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook(id)
      .then((data) => {
        setBook(data);
      })
      .catch((err) => console.error("Erro ao buscar livro:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleGoHome = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!book) {
    return <div>Livro não encontrado</div>;
  }

  return (
    <div>
      <div className="mt-10">
        <Title />
      </div>
      <div className="flex justify-center h-screen mt-10">
        <div className="border border-blue-500 w-[80em] h-[38em] flex justify-between">
          <div className="absolute mt-4">
            <button
              onClick={handleGoHome}
              className="p-2 bg-transparent border-none cursor-pointer"
            >
              <ChevronLeft size={38} />
            </button>
          </div>
          <div className="mt-5 ml-36 w-fit">
            <img
              src={book.image}
              alt="Imagem de capa do livro"
              className="w-44 h-72 md:w-[24em] md:h-[35em]"
            />
          </div>

          <div className="flex flex-col items-center mt-4 mr-44 w-[30em]">
            <h1 className="text-4xl font-medium">{book.title}</h1>
            <h2 className="text-2xl font-medium text-center">{book.author}</h2>
            <p className="mt-4 text-xl">{book.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
