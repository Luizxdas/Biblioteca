import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function FilterButton({ genres, selectedGenres = [], setSelectedGenres }) {
  const [isOpen, setIsOpen] = useState(false);

  // Fechar/Abrir os gêneros.
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Checar se o gênero está marcado e inserir na lista de marcados.
  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    let updatedGenres;

    if (checked) {
      updatedGenres = [...selectedGenres, value];
    } else {
      updatedGenres = selectedGenres.filter((genre) => genre !== value);
    }

    setSelectedGenres(updatedGenres);
  };

  // Clicar fora fecha os gêneros.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropGenre")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block dropGenre">
      <button
        onClick={toggleDropdown}
        className="bg-stone-300 text-gray-700 px-4 py-2 rounded-md focus:outline-none"
      >
        Gêneros
      </button>
      {isOpen && (
        <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-stone-300 shadow-md rounded-md p-2">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={handleGenreChange}
                className="mr-2"
              />
              <label className="text-gray-700">{genre}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

FilterButton.propTypes = {
  genres: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
};

export default FilterButton;
