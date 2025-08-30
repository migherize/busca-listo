import { SearchBar, SearchResults } from "@/components/common";

export default function SearchExamplePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="w-full py-6 lg:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título de la página */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Página de Búsqueda de Ejemplo
            </h1>
            <p className="text-slate-600">
              Esta página demuestra cómo usar los componentes de búsqueda en cualquier parte de tu aplicación.
            </p>
          </div>

          {/* Barra de búsqueda personalizada */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Barra de Búsqueda Personalizada
            </h2>
            <SearchBar 
              placeholder="Buscar productos específicos..."
              className="max-w-md"
              autoFocus={true}
            />
          </div>

          {/* Resultados de búsqueda */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Resultados de Búsqueda
            </h2>
            <SearchResults 
              resultsPerPage={6}
              showCategoryNavbar={true}
              onResultsChange={(count) => {
                console.log(`Se encontraron ${count} productos`);
              }}
            />
          </div>

          {/* Información adicional */}
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              ¿Cómo funciona?
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• La búsqueda funciona en todas las páginas gracias al contexto global</li>
              <li>• Los resultados se muestran automáticamente cuando escribes</li>
              <li>• Puedes filtrar por categorías y ordenar los resultados</li>
              <li>• La búsqueda incluye debounce para mejor rendimiento</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
