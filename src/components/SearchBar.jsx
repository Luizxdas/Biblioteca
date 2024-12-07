import PropTypes from "prop-types";

function SearchBar({ search, setSearch }) {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="w-full mt-8 text-center">
      <div className="relative w-1/3 mx-auto min-w-80">
        <input
          type="search"
          value={search}
          placeholder="Pesquise um título ou autor..."
          onChange={handleChange}
          aria-label="Search"
          className="w-full pl-4 pr-10 text-xl rounded-lg shadow-md h-9 bg-slate-200 brightness-85"
        />
        <button
          type="button"
          className="absolute inset-y-0 flex items-center right-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default SearchBar;
