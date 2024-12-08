import { useEffect, useRef, useState } from "react";
import { useClickOutsideToClose, creditsStyle } from "./utils/utils";
import { fetchCredits } from "../api/apiService";
import { useParams } from "react-router-dom";
import { isValidURL } from "./utils/utils";
import CreditItem from "./CreditItem";

function Credits() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const creditsData = await fetchCredits(id);
        setCredits(creditsData);
      } catch (err) {
        console.error("Erro ao buscar créditos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useClickOutsideToClose(dropdownRef, setIsOpen);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <button className="mt-auto mb-8" onClick={toggleDropdown}>
        Texto e imagem com base na Wikipedia
      </button>
      {isOpen && (
        <>
          {/* Fundo escuro */}
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal */}
          <div className="flex items-center justify-center">
            <div
              ref={dropdownRef}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20rem] md:w-[40rem] h-[26rem] bg-gray -400 z-20"
            >
              {credits ? (
                <div className="flex flex-col justify-center w-full p-3 space-y-4 bg-gray-100">
                  {/* Fonte da imagem */}
                  <CreditItem
                    name="Fonte da imagem"
                    link={credits.image_source}
                    linkName={"Wikipedia"}
                  />

                  {/* Autor da imagem */}
                  <CreditItem
                    name="Autor da imagem"
                    spanContent={credits.image_author}
                  />

                  {/* Tipo de lincença da imagem */}
                  <CreditItem
                    name="Tipo de licença da imagem"
                    spanContent={credits.image_license}
                  />

                  {/* Fonte do texto */}
                  <CreditItem
                    name="Fonte do texto"
                    link={
                      isValidURL(credits.text_source)
                        ? credits.text_source
                        : null
                    }
                    linkName={
                      isValidURL(credits.text_source) ? "Wikipedia" : null
                    }
                    spanContent={
                      !isValidURL(credits.text_source)
                        ? credits.text_source
                        : null
                    }
                  />

                  {/* Tipo de licença do texto */}
                  <CreditItem
                    name="Tipo de licença do texto"
                    spanContent={credits.text_license}
                  />

                  {/* Se o texto foi modificado mostrar */}
                  {credits.modified && (
                    <div>
                      <h1 className={creditsStyle.creditsTitle}>
                        O texto foi modificado.
                      </h1>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-44 h-72 md:w-[24em] md:h-[35em] bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Sem créditos disponível</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Credits;
