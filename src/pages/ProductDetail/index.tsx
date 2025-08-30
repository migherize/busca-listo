import { useParams } from "wouter";
import { useProductById } from "@/hooks";
import { ProductImageCarousel } from "@/components/products/ProductImageCarousel";
import { ProductFeatures } from "@/components/products/ProductFeatures";
import { ProductPricing } from "@/components/products/ProductPricing";
import { ProductComments } from "@/components/products/ProductComments";
import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Separator } from "@/components/common/ui/separator";
import { 
  ArrowLeft, 
  ExternalLink, 
  Package, 
  Building2, 
  Calendar,
  Eye,
  Code,
  Star,
  Share2,
  Heart
} from "lucide-react";
import { Link } from "wouter";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";

export function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, error, refetch } = useProductById(id || "");

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !product) {
    return <ErrorState error={error?.message || "Producto no encontrado"} onRetry={refetch} />;
  }

  // Preparar imágenes para el carrusel
  const images = product.image_urls && product.image_urls.length > 0 
    ? product.image_urls 
    : [product.image_url];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header con navegación */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
              <ArrowLeft className="h-5 w-5" />
              Volver
            </Link>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Favorito
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna Izquierda - Imágenes */}
          <div className="space-y-6">
            <ProductImageCarousel images={images} productName={product.name} />
            
            {/* Información básica del producto */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Categorías */}
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.subcategory}
                    </Badge>
                  </div>
                  
                  {/* Nombre del producto */}
                  <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                    {product.name}
                  </h1>
                  
                  {/* Marca */}
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">Marca: {product.brand_name}</span>
                  </div>
                  
                  {/* Código del producto */}
                  {product.code && (
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-600">Código: {product.code}</span>
                    </div>
                  )}
                  
                  {/* Requiere receta */}
                  {product.requirePrescription && (
                    <Badge variant="destructive" className="text-xs">
                      Requiere Receta Médica
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha - Información del producto */}
          <div className="space-y-6">
            {/* Precios y compra */}
            <ProductPricing
              price={product. price_usd}
              offerPrice={product.offerPrice}
              historicalPrice={product.historicalPrice}
              priceUSD={product. price_usdUSD}
              offerDescription={product.offerDescription}
              stock={product.stock}
              views={product.views}
            />
            
            {/* Botones de acción */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button className="w-full" size="lg">
                    <Package className="h-5 w-5 mr-2" />
                    Comprar Ahora
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="lg">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Ver en Tienda
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Información adicional */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información Adicional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Proveedor:</span>
                  <span className="font-medium">{product.supplier}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Disponible Online:</span>
                  <Badge variant={product.availableOnline ? "default" : "secondary"}>
                    {product.availableOnline ? "Sí" : "No"}
                  </Badge>
                </div>
                
                {product.createdAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Fecha de Creación:</span>
                    <span className="font-medium">{new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
                
                {product.createdBy && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Creado por:</span>
                    <span className="font-medium">{product.createdBy}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Descripción del producto */}
        {product.description && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Características del producto */}
        <div className="mb-8">
          <ProductFeatures
            characteristics={product.characteristics}
            advancedCharacteristics={product.advancedCharacteristics}
            highlightedFeatures={product.highlightedFeatures}
            pros={product.pros}
            cons={product.cons}
            accessories={product.accessories}
          />
        </div>

        {/* Comentarios */}
        <div className="mb-8">
          <ProductComments productId={product.id} productName={product.name} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
