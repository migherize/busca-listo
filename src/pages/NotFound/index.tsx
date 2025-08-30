import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Button } from "@/components/common/ui/button";
import { Search, Home, ArrowLeft, ShoppingCart, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-4">
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mb-6">
              {/* Número 404 grande y llamativo */}
              <div className="relative inline-block">
                <h1 className="text-9xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  404
                </h1>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-bounce flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
              
              {/* Título principal */}
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                ¡Ups! Página no encontrada
              </h2>
              
              {/* Descripción */}
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Parece que te has perdido en el camino. No te preocupes, te ayudamos a encontrar lo que buscas.
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* Opciones de navegación */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Link href="/" className="block">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-blue-200">
                  <CardContent className="p-6 text-center">
                    <Home className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ir al Inicio</h3>
                    <p className="text-sm text-gray-600">Vuelve a la página principal</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/search" className="block">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-green-200">
                  <CardContent className="p-6 text-center">
                    <Search className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Buscar Productos</h3>
                    <p className="text-sm text-gray-600">Encuentra lo que necesitas</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/categories" className="block">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-purple-200">
                  <CardContent className="p-6 text-center">
                    <ShoppingCart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ver Categorías</h3>
                    <p className="text-sm text-gray-600">Explora por categorías</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Botones de acción principales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => window.history.back()} 
                variant="outline" 
                size="lg"
                className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver Atrás
              </Button>
              
              <Link href="/">
                <Button size="lg" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Home className="h-5 w-5" />
                  Ir al Inicio
                </Button>
              </Link>
            </div>

            {/* Información de contacto */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  ¿Necesitas ayuda? Contáctanos
                </h3>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>+58 271-2219280</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>Valera, Trujillo, Venezuela</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estilos CSS para las animaciones */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
