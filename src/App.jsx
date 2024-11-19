import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./api/auth/AuthProvider";
import Home from "./Home";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
