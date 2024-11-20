import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useClickOutsideToClose } from "./utils/utils";
import { useAuth } from "../api/auth/useAuth";

function Login() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const dropdownRef = useRef(null);

  {
    /* Fecha o menu ao clicar fora. */
  }
  useClickOutsideToClose(dropdownRef, () => {
    setDropdownOpen(false);
    setSearchParams({});
  });

  {
    /* Alterna o estado do dropdown e os parâmetros de URL. */
  }
  const toggleDropdown = () => {
    const newIsOpen = !isDropdownOpen;
    setDropdownOpen(newIsOpen);
    setSearchParams(newIsOpen ? { login: "true" } : {});
  };

  {
    /* Sincroniza estado inicial do dropdown com o parâmetro de URL. */
  }
  useEffect(() => {
    const loginParam = searchParams.get("login");
    setDropdownOpen(loginParam === "true");
  }, [searchParams]);

  {
    /* Envia os dados do formulário para a API. */
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await login(username, password);

    if (result.success) {
      alert("Conta criada com sucesso!");
    } else {
      switch (result.statusCode) {
        case 409:
          alert("Erro: Conta já existe.");
          break;
        case 400:
          alert("Erro: Dados inválidos.");
          break;
        default:
          alert(`Erro desconhecido: ${result.error}`);
      }
    }
  };

  return (
    <div className="dropMenu">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 text-gray-700 rounded-md bg-stone-300 focus:outline-none"
      >
        Login
      </button>

      {/* Overlay */}
      {isDropdownOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-50 dropMenu"></div>
      )}

      {/* Menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/3 left-1/2 w-80"
        >
          <form
            onSubmit={handleSubmit}
            className="px-8 pt-6 pb-6 rounded shadow-md bg-stone-300"
          >
            <div className="flex items-center justify-center m-2 mb-6 text-2xl font-bold text-gray-700">
              Fazer Login
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Nome de usuário
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Senha
              </label>
              <input
                className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="w-1/3 px-4 py-2 font-bold text-white rounded shadow bg-stone-500 hover:bg-stone-400 focus:shadow-outline focus:outline-none"
                type="submit"
              >
                Login
              </button>
              <button onClick={() => alert("A IMPLEMENTAR!")} className="mt-3">
                Esqueci minha senha!
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
