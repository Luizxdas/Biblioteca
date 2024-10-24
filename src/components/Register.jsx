import { useRef, useEffect, useState } from "react";

{
  /* Detecta clique fora da div e fecha ela. */
}
function useClickOutsideToClose(ref, setIsOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsOpen]);
}

function Register() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useClickOutsideToClose(wrapperRef, setIsOpen);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropMenu">
      <button
        onClick={toggleDropdown}
        className="bg-stone-300 text-gray-700 px-4 py-2 rounded-md focus:outline-none"
      >
        Criar Conta
      </button>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 dropMenu"></div>
      )}

      {/* Menu */}
      {isOpen && (
        <div
          ref={wrapperRef}
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-80"
        >
          <form
            action=""
            className="bg-stone-300 shadow-md rounded px-8 pt-6 pb-6"
          >
            <div className="flex items-center m-2 mb-6 justify-center font-bold text-2xl text-gray-700">
              Criar Conta
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nome de usuário
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Nome de usuário"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Senha
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Senha"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <button
                className="shadow bg-stone-500 hover:bg-stone-400 focus:shadow-outline focus:outline-none text-white font-bold w-1/3 py-2 px-4 rounded"
                type="button"
              >
                Criar
              </button>
              <button className="mt-3">Já possui uma conta? Faça login!</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;
