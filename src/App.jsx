import Books from "./components/Books";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import FilterAndSortButtons from "./components/FilterAndSortButtons";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="flex flex-col items-center mt-8">
        <Title />
        <SearchBar search={search} setSearch={setSearch} />
        <div className="mt-2 mb-14">
          <FilterAndSortButtons />
        </div>
        <Books search={search} />
      </div>
    </div>
  );
}

export default App;
