import Books from "./components/Books";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Title />
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex flex-col items-center justify-center mt-14">
        <Books search={search} />
      </div>
    </div>
  );
}

export default App;
