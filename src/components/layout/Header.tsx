import { Search, Heart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { HeaderProps } from "@shared/schema";

export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">Buscalisto</h1>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
              </div>
              <Input
                type="text"
                className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg bg-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar productos... ej: Calcibon, ropa, zapatos"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
              onClick={() => window.open("/register-store", "_blank")}
            >
              Registrar Tienda
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
