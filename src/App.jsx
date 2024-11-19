import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Books from "./components/Books";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import FilterButton from "./components/FilterButton";
import OrderButton from "./components/OrderButton";
import Register from "./components/Register";
import Login from "./components/Login";
import { AuthProvider } from "./api/auth/AuthProvider";

function App() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [booksOrder, setBooksOrder] = useState("");

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="flex justify-end m-3">
                <div className="p-1">
                  <Register />
                </div>
                <div className="p-1">
                  <Login />
                </div>
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
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
