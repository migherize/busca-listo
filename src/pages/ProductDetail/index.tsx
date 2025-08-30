import { 
  ArrowLeft, 
  ExternalLink, 
  Package, 
  Building2, 
  Code,
  Share2,
  Heart,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Star,
  MessageSquare,
  ThumbsUp,
  CheckCircle
} from "lucide-react";
import { useParams, Link } from "wouter";
import { useProductById } from "@/hooks";
import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import { Separator } from "@/components/common/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { ProductPricing } from "@/components/common/pricing/ProductPricing";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import { ProductFeatures } from "@/components/products/ProductFeatures";
import { ProductComments } from "@/components/products/ProductComments";
import { ProductImageCarousel } from "@/components/products/ProductImageCarousel";

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
  const images = product.imagenes && product.imagenes.length > 0 
    ? product.imagenes 
    : [];

  // Función para renderizar estrellas
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            <ProductImageCarousel images={images} productName={product.name || "Producto"} />
            
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
                      {product.subcategory_name || "General"}
                    </Badge>
                  </div>
                  
                  {/* Nombre del producto */}
                  <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                    {product.name || "Nombre del Producto"}
                  </h1>
                  
                  {/* Marca */}
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">Marca: {product.brand_name || "Sin marca"}</span>
                  </div>
                  
                  {/* Código del producto */}
                  {product.id && (
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-600">Código: {product.id}</span>
                    </div>
                  )}
                   
                   {/* Requiere receta */}
                   {product.active && (
                     <Badge variant="destructive" className="text-xs">
                       Producto activo
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
              price={product.price_bs}
              offerPrice={product.price_offer_bs}
              historicalPrice={null}
              priceUSD={product.price_usd}
              offerDescription={product.offer_description}
              stock={product.in_stock || 0}
              views={product.views || 0}
            />
            
            {/* Botones de acción */}
            {/* <Card>
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
            </Card> */}
            
            {/* Información adicional */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información Adicional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Proveedor:</span>
                  <Link 
                    to={`/store/${product.supplier_name || product.supplier_id}`}
                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {product.supplier_name || product.supplier_id}
                  </Link>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Disponible Online:</span>
                  <Badge variant={product.active ? "default" : "secondary"}>
                    {product.active ? "Sí" : "No"}
                  </Badge>
                </div>
                
                {product.created_at && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Fecha de Creación:</span>
                    <span className="font-medium">{new Date(product.created_at).toLocaleDateString()}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Stock:</span>
                  <span className="font-medium">{product.in_stock || 0} unidades</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Información del Proveedor/Tienda */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-blue-900">
                <Building2 className="h-6 w-6 text-blue-600" />
                Información de la Tienda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Información de contacto */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <Link 
                        to={`/store/${product.supplier_name || product.supplier_id}`}
                        className="group hover:underline"
                      >
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {product.supplier_name || product.supplier_id}
                        </h3>
                        <p className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">
                          Tienda oficial - Ver todos los productos
                        </p>
                      </Link>
                    </div>
                  </div>

                  {product.supplier_address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-700">{product.supplier_address}</p>
                      </div>
                    </div>
                  )}

                  {product.supplier_phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-slate-700">{product.supplier_phone}</p>
                        <p className="text-xs text-slate-500">Teléfono de contacto</p>
                      </div>
                    </div>
                  )}

                  {product.supplier_email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm text-slate-700">{product.supplier_email}</p>
                        <p className="text-xs text-slate-500">Email de contacto</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Información adicional */}
                <div className="space-y-4">
                  {product.supplier_website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-purple-600" />
                      <div>
                        <a 
                          href={product.supplier_website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          {product.supplier_website}
                        </a>
                        <p className="text-xs text-slate-500">Sitio web oficial</p>
                      </div>
                    </div>
                  )}

                  {product.supplier_hours && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm text-slate-700">{product.supplier_hours}</p>
                        <p className="text-xs text-slate-500">Horarios de atención</p>
                      </div>
                    </div>
                  )}

                  {product.supplier_rating && (
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold text-slate-900">{product.supplier_rating}</span>
                          <span className="text-xs text-slate-500">/ 5.0</span>
                        </div>
                        <p className="text-xs text-slate-500">Calificación de la tienda</p>
                      </div>
                    </div>
                  )}

                  {product.supplier_reviews && (
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-slate-700">{product.supplier_reviews} reseñas</p>
                        <p className="text-xs text-slate-500">Opiniones de clientes</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botones de acción para la tienda */}
              <div className="mt-6 flex flex-wrap gap-3">
                {/* Botón principal para ver todos los productos de la tienda */}
                <Link to={`/store/${product.supplier_name || product.supplier}`}>
                  <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                    <Building2 className="h-4 w-4" />
                    Ver Todos los Productos
                  </Button>
                </Link>
                
                {product.supplier_phone && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Llamar
                  </Button>
                )}
                
                {product.supplier_email && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Enviar Email
                  </Button>
                )}
                
                {product.supplier_website && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Visitar Sitio Web
                  </Button>
                )}
                
                {product.supplier_address && (
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Ver en Mapa
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Descripción del producto */}
        {product.offer_description && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Descripción de la Oferta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {product.offer_description}
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
          <ProductComments 
            productId={product.id.toString()} 
            productName={product.name || "Producto"}
            mockComments={product.mockComments}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
