import { useEffect, useState } from "react";
import { fetchBook } from "../api/apiService";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Title from "./Title";
import Credits from "./Credits";

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
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center">Carregando...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center mt-10">
        <Title />
      </div>
      <div className="flex justify-center h-screen mt-10">
        <div className="shadow-xl bg-slate-200 w-[20em] h-fit md:w-[80em] md:h-[38em] md:flex justify-between">
          <div className="absolute mt-4">
            <button
              onClick={handleGoHome}
              className="p-2 bg-transparent border-none cursor-pointer"
            >
              <ChevronLeft size={38} />
            </button>
          </div>
          <div className="mt-5 ml-16 md:ml-36 w-fit">
            {book !== null ? (
              <img
                src={book.image}
                alt="Imagem de capa do livro"
                className="w-48 h-64 md:w-[24em] md:h-[35em] shadow-lg rounded-lg"
              />
            ) : (
              <div className="w-44 h-72 md:w-[24em] md:h-[35em] bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Sem imagem disponível</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center mt-4 mr-44 w-full p-4 md:w-[30em] md:p-0">
            {book !== null ? (
              <>
                <h1 className="text-4xl font-medium">{book.title}</h1>
                <h2 className="text-2xl font-medium text-center">
                  {book.author}
                </h2>
                <p className="mt-4 overflow-scroll text-xl h-[18em] md:h-[21em] md:mb-0 mb-8">
                  {book.synopsis}
                </p>
                <div className="mt-auto">
                  <Credits />
                </div>
              </>
            ) : (
              <h1 className="text-2xl font-medium text-center">
                Livro não encontrado
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
