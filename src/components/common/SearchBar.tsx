import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/contexts/SearchContext";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
  autoFocus?: boolean;
  onSearch?: (term: string) => void;
}

export function SearchBar({
  placeholder = "Buscar productos...",
  className = "",
  showClearButton = true,
  autoFocus = false,
  onSearch,
}: SearchBarProps) {
  const { searchTerm, setSearchTerm, clearSearch } = useSearch();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  // Sincronizar el término local con el contexto
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        setSearchTerm(localSearchTerm);
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm, searchTerm, setSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    setIsSearching(true);
  };

  const handleClear = () => {
    setLocalSearchTerm("");
    clearSearch();
    setIsSearching(false);
    if (onSearch) {
      onSearch("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
    setIsSearching(false);
    if (onSearch) {
      onSearch(localSearchTerm);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          value={localSearchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-12 h-11 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          autoFocus={autoFocus}
        />
        {showClearButton && localSearchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Indicador de búsqueda activa */}
      {isSearching && (
        <div className="absolute -bottom-8 left-0 text-xs text-slate-500">
          Escribiendo...
        </div>
      )}
    </form>
  );
}
