import { Card, CardContent } from "@/components/common/ui/card";
import { Badge } from "@/components/common/ui/badge";
import { Tag, Package } from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  popular: boolean;
  subcategories: string[];
}

interface PopularCategoryPresenterProps {
  categories: CategoryData[];
  onCategoryClick?: (category: CategoryData) => void;
  onSubcategoryClick?: (subcategory: string) => void;
}

export function PopularCategoryPresenter({
  categories,
  onCategoryClick,
  onSubcategoryClick,
}: PopularCategoryPresenterProps) {
  const handleCategoryClick = (category: CategoryData) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  const handleSubcategoryClick = (subcategory: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onSubcategoryClick) {
      onSubcategoryClick(subcategory);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Categorías Populares
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explora nuestras categorías más populares y encuentra los productos que necesitas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => handleCategoryClick(category)}
          >
            <CardContent className="p-0">
              {/* Imagen de la categoría */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay con información */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badge de popular */}
                {category.popular && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs font-medium">
                      <Tag className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                
                {/* Contador de productos */}
                <div className="absolute bottom-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-slate-700">
                    <Package className="h-3 w-3 mr-1" />
                    {category.productCount}
                  </Badge>
                </div>
              </div>

              {/* Contenido de la categoría */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                  {category.description}
                </p>

                {/* Subcategorías */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {category.subcategories.slice(0, 3).map((subcategory, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      onClick={(e) => handleSubcategoryClick(subcategory, e)}
                    >
                      {subcategory}
                    </Badge>
                  ))}
                  {category.subcategories.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.subcategories.length - 3} más
                    </Badge>
                  )}
                </div>

                {/* Botón de explorar */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Explorar categoría →
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center pt-6">
        <p className="text-slate-600 mb-4">
          ¿No encuentras lo que buscas?
        </p>
        <button className="text-blue-600 hover:text-blue-700 font-medium underline">
          Ver todas las categorías
        </button>
      </div>
    </div>
  );
}
