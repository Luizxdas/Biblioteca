import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function FilterButton({ genres, selectedGenres = [], setSelectedGenres }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
        className="px-4 py-2 text-gray-700 rounded-md shadow-md bg-slate-200 focus:outline-none"
      >
        Gêneros
      </button>
      {isOpen && (
        <div className="absolute w-48 p-2 mt-2 transform -translate-x-1/2 rounded-md shadow-md left-1/2 bg-slate-200">
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
