import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function OrderButton({ setBooksOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  {
    /* Fecha/abre as opções. */
  }
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOrderChange = (event) => {
    setBooksOrder(event.target.name);
  };

  {
    /* Clicar fora da div de opções fecha ela. */
  }
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
            <button name="name" onClick={handleOrderChange}>
              Nome
            </button>
            <button name="genre" onClick={handleOrderChange}>
              Gênero
            </button>
            <button name="author" onClick={handleOrderChange}>
              Autor
            </button>
            <button name="date" onClick={handleOrderChange}>
              Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

OrderButton.propTypes = {
  setBooksOrder: PropTypes.func,
};

export default OrderButton;
