import { useState } from "react";
import Books from "./components/Books";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import FilterButton from "./components/FilterButton";
import OrderButton from "./components/OrderButton";

function Home() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [booksOrder, setBooksOrder] = useState("");

  return (
    <div className="h-screen p-8 custom-bg">
      <div className="flex flex-col items-center">
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
        <div className="p-4 rounded-lg shadow-xl bg-slate-200">
          <Books
            search={search}
            setGenres={setGenres}
            selectedGenres={selectedGenres}
            booksOrder={booksOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
