import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { useClickOutsideToClose } from "./utils/utils";

function OrderButton({ setBooksOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useClickOutsideToClose(dropdownRef, setIsOpen);

  const handleOrderChange = (event) => {
    setBooksOrder(event.target.name);
  };

  return (
    <div className="relative inline-block m-2 dropOrder">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 text-gray-700 rounded-md shadow-md bg-slate-200 focus:outline-none"
      >
        Ordenar
      </button>
      {isOpen && (
        <div className="absolute w-48 p-2 mt-2 transform -translate-x-1/2 rounded-md shadow-md left-1/2 bg-slate-200">
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
