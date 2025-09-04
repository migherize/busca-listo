import { SearchBar } from "@/components/common/SearchBar";
import { Link } from "wouter";
import { Store } from "lucide-react";

export function Header() {
  const handleRegisterStore = () => {
    window.location.href = "/register-store";
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:h-16 space-y-4 sm:space-y-0">
          <div className="flex-shrink-0 order-1 sm:order-1">
            <a href="/" className="flex items-center space-x-3">
              <h1 className="text-xl sm:text-2xl font-bold text-blue-600">Buscalisto</h1>
            </a>
          </div>
          
          <div className="w-full sm:flex-1 sm:max-w-2xl sm:mx-8 order-2 sm:order-2">
            <SearchBar 
              placeholder="Buscar productos... ej: Calcibon, ropa, zapatos"
              className="w-full"
            />
          </div>

          <div className="w-full sm:w-auto flex justify-center sm:justify-end order-3 sm:order-3 gap-3">
            <Link href="/stores">
              <button className="w-full sm:w-auto bg-slate-100 text-slate-700 px-6 py-3 sm:px-4 sm:py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
                <Store className="h-4 w-4" />
                Ver Tiendas
              </button>
            </Link>
            <button
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 sm:px-4 sm:py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              onClick={handleRegisterStore}
            >
              Registrar Tienda
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
