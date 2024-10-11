import { ChevronDown } from "lucide-react";

export default function FilterAndSortButtons() {
  return (
    <div className="text-center w-full">
      <div className="flex space-x-4 mt-2">
        <button className="h-8 w-1/12 rounded-lg bg-stone-300 brightness-85 text-lg min-w-28">
          Filtrar
        </button>
        <button className="h-8 w-1/12 flex rounded-lg bg-stone-300 brightness-85 text-lg justify-center p-0.5 min-w-28">
          Ordenar
          <ChevronDown size={20} className="mt-1.5 ml-1" />
        </button>
      </div>
    </div>
  );
}
