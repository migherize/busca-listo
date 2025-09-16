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
          {/* SearchBar - Primero en mobile, centro en desktop */}
          <div className="w-full sm:flex-1 sm:max-w-2xl sm:mx-8 order-1 sm:order-2">
            <SearchBar 
              placeholder="Buscar productos... ej: Calcibon, ropa, zapatos"
              className="w-full"
            />
          </div>

          {/* Logo y Botones - Segunda fila en mobile, separados en desktop */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start order-2 sm:order-1">
            <a href="/" className="flex items-center space-x-3">
              <h1 className="text-xl sm:text-2xl font-bold text-blue-600">Buscalisto</h1>
            </a>
            
            {/* Botones - Solo en mobile, ocultos en desktop */}
            <div className="flex items-center gap-2 sm:hidden">
              <span className="text-xs font-medium text-slate-600">Tienda:</span>
              <Link href="/stores">
                <button className="w-auto bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded-full text-xs font-medium hover:bg-blue-100 hover:border-blue-300 transition-colors flex items-center gap-1">
                  <Store className="h-3 w-3" />
                  <span>Ver</span>
                </button>
              </Link>
              <button
                className="w-auto bg-blue-600 text-white px-3 py-2 rounded-full text-xs font-medium hover:bg-blue-700 transition-colors"
                onClick={handleRegisterStore}
              >
                <span>Registrarse</span>
              </button>
            </div>
          </div>

          {/* Botones - Solo en desktop */}
          <div className="hidden sm:flex sm:w-auto justify-end gap-3 order-3">
            <Link href="/stores">
              <button className="w-auto bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
                <Store className="h-4 w-4" />
                Ver Tiendas
              </button>
            </Link>
            <button
              className="w-auto bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
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
