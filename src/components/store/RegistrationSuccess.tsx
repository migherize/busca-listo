import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Home, Store } from "lucide-react";

interface RegistrationSuccessProps {
  storeName: string;
  ownerName: string;
  selectedPlan: string;
}

export function RegistrationSuccess({ storeName, ownerName, selectedPlan }: RegistrationSuccessProps) {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header de Éxito */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            ¡Registro Exitoso!
          </h1>
          <p className="text-xl text-green-700">
            Tu tienda ha sido registrada correctamente
          </p>
        </div>

        {/* Tarjeta Principal */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <Store className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-900">
              ¡Bienvenido a Busca Listo, {ownerName}!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Tu tienda "{storeName}" ya está en nuestro sistema
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Plan Seleccionado */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Plan Seleccionado
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  {selectedPlan === 'basic' ? 'Básico' : 
                   selectedPlan === 'medium' ? 'Medio' : 
                   selectedPlan === 'premium' ? 'Premium' : selectedPlan}
                </span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Activo
                </Badge>
              </div>
            </div>

            {/* Email de Confirmación */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-900">
                  Email de Confirmación Enviado
                </h3>
              </div>
              <p className="text-green-700">
                Hemos enviado un email de confirmación a tu correo con todos los detalles 
                de tu registro y los próximos pasos para configurar tu tienda.
              </p>
            </div>

            {/* Próximos Pasos */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">
                Próximos Pasos
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-700">1</span>
                  </div>
                  <span className="text-amber-800">Revisa tu email de confirmación</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-700">2</span>
                  </div>
                  <span className="text-amber-800">Nuestro equipo revisará tu solicitud (1-2 días)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-700">3</span>
                  </div>
                  <span className="text-amber-800">Recibirás acceso a tu panel de administración</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-700">4</span>
                  </div>
                  <span className="text-amber-800">¡Comienza a subir productos y configurar tu tienda!</span>
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                ¿Tienes Preguntas?
              </h3>
              <p className="text-slate-700 mb-3">
                Nuestro equipo está aquí para ayudarte en todo el proceso.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1" asChild>
                  <a href="mailto:soporte@buscalisto.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Contactar Soporte
                  </a>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <a href="/help">
                    Centro de Ayuda
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botón de Volver al Home */}
        <div className="text-center mt-8">
          <Button 
            onClick={handleGoHome}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Volver al Inicio
          </Button>
        </div>

        {/* Mensaje Adicional */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Gracias por elegir Busca Listo para hacer crecer tu negocio
          </p>
        </div>
      </div>
    </div>
  );
}

// Componente Badge simple para evitar importar el de shadcn/ui
function Badge({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}
