import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Book from "./components/Book";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/:id" element={<Book />} />
    </Routes>
  );
}

export default App;
