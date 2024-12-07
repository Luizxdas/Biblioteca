import { useEffect } from "react";

export function useClickOutsideToClose(ref, setIsOpen) {
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

export const isValidURL = (string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?([a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?)$",
    "i"
  );
  return pattern.test(string);
};

export const creditsStyle = {
  linkStyle:
    "text-lg text-center text-blue-600 underline hover:text-blue-800 bg-gray-300",
  creditsDiv: "flex flex-col bg-gray-400",
  creditsTitle: "mb-2 text-xl text-center",
  creditsSpan: "block text-lg text-center bg-gray-300",
};
