import Books from "./components/Books";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import OrderButton from "./components/OrderButton";
import Register from "./components/Register";

function App() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [booksOrder, setBooksOrder] = useState("");

  return (
    <div>
      <div>
        <Register />
      </div>
      <div className="flex flex-col items-center mt-8">
        <Title />
        <SearchBar search={search} setSearch={setSearch} />
        <div className="mt-1 mb-5">
          <FilterButton
            genres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />
          <OrderButton setBooksOrder={setBooksOrder} />
        </div>
        <Books
          search={search}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          booksOrder={booksOrder}
        />
      </div>
    </div>
  );
}

export default App;
