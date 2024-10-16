import Books from "./components/Books";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import FilterButton from "./components/FilterButton";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div>
      <div className="flex flex-col items-center mt-8">
        <Title />
        <SearchBar search={search} setSearch={setSearch} />
        <FilterButton
          genres={genres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
        <Books
          search={search}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
        />
      </div>
    </div>
  );
}

export default App;
