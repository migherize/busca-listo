import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Link } from "wouter";
import { 
  Pill, 
  Wrench, 
  Smartphone, 
  Tv, 
  Utensils, 
  FootprintsIcon, 
  Heart, 
  Sparkles, 
  Shirt 
} from "lucide-react";
import type { Category } from "@shared/SchemaCategory";

export default function CategoriesPage() {
  // Definir las categorías con sus iconos y descripciones
  const categories = [
    {
      key: "medicamentos" as Category,
      name: "Medicamentos",
      description: "Productos farmacéuticos y medicamentos",
      icon: Pill,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: "/assets/medicamentos.jpeg"
    },
    {
      key: "repuestos" as Category,
      name: "Repuestos",
      description: "Repuestos para vehículos y maquinaria",
      icon: Wrench,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      image: "/assets/repuestos.jpeg"
    },
    {
      key: "telefonos" as Category,
      name: "Teléfonos",
      description: "Smartphones y accesorios móviles",
      icon: Smartphone,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      image: "/assets/telefonos.jpeg"
    },
    {
      key: "tv" as Category,
      name: "TV",
      description: "Televisores y equipos de entretenimiento",
      icon: Tv,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      image: "/assets/TV.jpeg"
    },
    {
      key: "comidarapida" as Category,
      name: "Comida Rápida",
      description: "Restaurantes y comida para llevar",
      icon: Utensils,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      image: "/assets/comidarapida.png"
    },
    {
      key: "zapatos" as Category,
      name: "Zapatos",
      description: "Calzado para todas las edades",
      icon: FootprintsIcon,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      image: "/assets/zapatos.jpeg"
    },
    {
      key: "suplementos" as Category,
      name: "Suplementos",
      description: "Vitaminas y suplementos nutricionales",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      image: "/assets/defaultcategory.jpeg"
    },
    {
      key: "belleza" as Category,
      name: "Belleza",
      description: "Productos de belleza y cuidado personal",
      icon: Sparkles,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      image: "/assets/defaultcategory.jpeg"
    },
    {
      key: "ropa" as Category,
      name: "Ropa",
      description: "Vestimenta y accesorios de moda",
      icon: Shirt,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      image: "/assets/defaultcategory.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="w-full py-8 lg:py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Explora Nuestras Categorías
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Descubre productos organizados por categorías para encontrar exactamente lo que necesitas
            </p>
          </div>

          {/* Grid de categorías */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link 
                  key={category.key} 
                  href={`/category/${category.key}`}
                  className="block group"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-slate-300 overflow-hidden">
                    <div className="relative">
                      {/* Imagen de fondo */}
                      <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Overlay con gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      
                      {/* Icono flotante */}
                      <div className={`absolute top-4 right-4 p-3 rounded-full ${category.bgColor} ${category.borderColor} border-2 shadow-lg`}>
                        <IconComponent className={`h-6 w-6 ${category.color}`} />
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <CardTitle className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </CardTitle>
                      <p className="text-slate-600 leading-relaxed">
                        {category.description}
                      </p>
                      
                      {/* Indicador de hover */}
                      <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                        <span>Explorar categoría</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Información adicional */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="text-slate-600 mb-6">
                Utiliza nuestra función de búsqueda avanzada para encontrar productos específicos o navega por las categorías para descubrir nuevas opciones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/search">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Buscar Productos
                  </button>
                </Link>
                <Link href="/">
                  <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors font-medium">
                    Volver al Inicio
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
