import { useState, useEffect } from "react";

function OrderButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Fechar/Abrir as opções.
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Clicar fora fecha as opções.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropOrder")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block dropOrder m-2">
      <button
        onClick={toggleDropdown}
        className="bg-stone-300 text-gray-700 px-4 py-2 rounded-md focus:outline-none"
      >
        Ordenar
      </button>
      {isOpen && (
        <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-stone-300 shadow-md rounded-md p-2">
          <div className="flex flex-col">
            <button>Nome</button>
            <button>Gênero</button>
            <button>Autor</button>
            <button>Data</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderButton;
