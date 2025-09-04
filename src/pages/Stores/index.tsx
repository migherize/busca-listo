import { useState } from "react";
import { Link } from "wouter";
import { useAllStores } from "@/hooks/useAllStores";
import { LoadingState } from "@/components/common/LoadingState";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Button } from "@/components/common/ui/button";
import { 
  Store, 
  MapPin, 
  Phone, 
  Package, 
  Building2, 
  Search,
  ArrowLeft,
  Star,
  Users
} from "lucide-react";

interface StoreData {
  id: number;
  name: string;
  phone?: string;
  logo?: string;
  location_name?: string;
  branches_count: number;
  products_count: number;
  created_at?: string;
  active: boolean;
}

export default function StoresPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "products" | "branches">("name");

  // Obtener todas las tiendas
  const { data: stores = [], isLoading, error, refetch } = useAllStores();

  // Filtrar y ordenar tiendas
  const filteredAndSortedStores = stores
    .filter((store: StoreData) => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.location_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: StoreData, b: StoreData) => {
      switch (sortBy) {
        case "products":
          return b.products_count - a.products_count;
        case "branches":
          return b.branches_count - a.branches_count;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error.message || "Error al cargar las tiendas"} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="w-full py-6 lg:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Nuestras Tiendas
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Descubre todas las tiendas disponibles en BuscaListo. 
                Encuentra productos de calidad en las mejores empresas de tu ciudad.
              </p>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Búsqueda */}
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar tiendas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Ordenamiento */}
              <div className="flex gap-2">
                <span className="text-sm font-medium text-slate-700 self-center">Ordenar por:</span>
                <div className="flex gap-2">
                  {[
                    { key: "name", label: "Nombre" },
                    { key: "products", label: "Productos" },
                    { key: "branches", label: "Sucursales" }
                  ].map((option) => (
                    <Button
                      key={option.key}
                      variant={sortBy === option.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy(option.key as any)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Store className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Total Tiendas</p>
                    <p className="text-2xl font-bold text-slate-900">{stores.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Total Productos</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stores.reduce((sum: number, store: StoreData) => sum + store.products_count, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Building2 className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600">Total Sucursales</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stores.reduce((sum: number, store: StoreData) => sum + store.branches_count, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de tiendas */}
          {filteredAndSortedStores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedStores.map((store: StoreData) => (
                <Card key={store.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {store.logo ? (
                          <img 
                            src={store.logo} 
                            alt={`Logo de ${store.name}`}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Store className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg font-semibold text-slate-900">
                            {store.name}
                          </CardTitle>
                          {store.location_name && (
                            <div className="flex items-center text-sm text-slate-600 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {store.location_name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-slate-500">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        4.8
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Estadísticas de la tienda */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <Package className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <p className="text-sm font-medium text-slate-600">Productos</p>
                        <p className="text-lg font-bold text-slate-900">{store.products_count}</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <Building2 className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <p className="text-sm font-medium text-slate-600">Sucursales</p>
                        <p className="text-lg font-bold text-slate-900">{store.branches_count}</p>
                      </div>
                    </div>

                    {/* Información de contacto */}
                    {store.phone && (
                      <div className="flex items-center text-sm text-slate-600 mb-4">
                        <Phone className="h-4 w-4 mr-2" />
                        {store.phone}
                      </div>
                    )}

                    {/* Botón de acción */}
                    <Link href={`/store/${encodeURIComponent(store.name)}`}>
                      <Button className="w-full" size="sm">
                        Ver Productos
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No se encontraron tiendas"
              description="Intenta con otros términos de búsqueda o contacta con nosotros"
              searchTerm={searchTerm}
              selectedCategory="all"
              onClearFilters={() => setSearchTerm("")}
            />
          )}
        </div>
      </main>
    </div>
  );
}
