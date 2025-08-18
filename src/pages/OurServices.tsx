import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QRCode } from '@/components/qr-code';
import { PDFDownload } from '@/components/pdf-download';
import { 
  PillBottle, 
  Download, 
  ExternalLink, 
  UserPlus, 
  Package, 
  MapPin, 
  Eye, 
  TrendingUp, 
  Clock, 
  Shield, 
  Star, 
  Megaphone, 
  PieChart, 
  CheckCircle, 
  Rocket, 
  Play,
  ArrowRight,
  Mail,
  Phone,
  MapPinIcon
} from 'lucide-react';

export default function OurServices() {
  const registrationUrl = "https://busca-listo.vercel.app/";

  const handleRegistration = () => {
    window.open(registrationUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header with Logo and Download Button */}
      <header className="bg-white shadow-sm print:shadow-none no-print">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <PillBottle className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-600">Busca-Listo</h1>
              <p className="text-sm text-slate-600">Comparador de medicamentos</p>
            </div>
          </div>
          <div className="flex gap-3">
            <PDFDownload targetId="flyer-content">
              Descargar PDF
            </PDFDownload>
            <Button 
              onClick={() => window.open(registrationUrl, '_blank')}
              data-testid="button-view-demo"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="flyer-content" className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl text-white p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  Más clientes, más ventas, 
                  <span className="text-yellow-300"> sin costo inicial</span>
                </h1>
                <h2 className="text-xl md:text-2xl font-medium mb-6 text-blue-100">
                  Tu farmacia online en minutos, gratis.
                </h2>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  Llega a cientos de personas que buscan medicamentos cerca de ti. 
                  Crea tu perfil gratis y aumenta tu visibilidad sin anuncios.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleRegistration}
                    data-testid="button-register-pharmacy"
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 h-auto"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Registrar Farmacia Gratis
                  </Button>
                  <Button 
                    variant="outline"
                    data-testid="button-how-it-works"
                    className="border-2 border-white text-white px-6 py-4 rounded-xl font-medium hover:bg-white hover:text-blue-600 h-auto bg-transparent"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Ver Cómo Funciona
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=400&fit=crop&crop=center" 
                  alt="Farmacia moderna con tecnología digital" 
                  className="rounded-xl shadow-2xl mx-auto max-w-full h-auto"
                />
              </div>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-32 -translate-x-32"></div>
        </section>

        {/* Registration Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Proceso de Registro</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Solo 3 pasos simples para tener tu farmacia visible online
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="p-8 text-center relative">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UserPlus className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Regístrate Gratis</h3>
              <p className="text-slate-600 leading-relaxed">
                Regístrate tu farmacia gratis en nuestra web. Solo necesitas información básica.
              </p>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="text-blue-600 text-2xl" />
              </div>
            </Card>
            
            {/* Step 2 */}
            <Card className="p-8 text-center relative">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sube tu Inventario</h3>
              <p className="text-slate-600 leading-relaxed">
                Sube tu inventario fácilmente, o nosotros lo hacemos por ti sin costo adicional.
              </p>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="text-green-600 text-2xl" />
              </div>
            </Card>
            
            {/* Step 3 */}
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-cyan-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Aparece en Búsquedas</h3>
              <p className="text-slate-600 leading-relaxed">
                Aparece automáticamente en las búsquedas de clientes cerca de tu zona.
              </p>
            </Card>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Beneficios Principales</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Todo lo que necesitas para hacer crecer tu farmacia online
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <Card className="p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Visibilidad Gratuita</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tu farmacia en internet sin costo inicial. Máxima exposición para tu negocio.
              </p>
            </Card>
            
            {/* Benefit 2 */}
            <Card className="p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Más Ventas</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Conecta con clientes que ya buscan tus productos. Aumenta tus ingresos.
              </p>
            </Card>
            
            {/* Benefit 3 */}
            <Card className="p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Ahorro de Tiempo</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sistema fácil de usar para mostrar tu stock. Gestión automática.
              </p>
            </Card>
            
            {/* Benefit 4 */}
            <Card className="p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Cero Riesgo</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gratis en esta etapa inicial. Sin compromisos ni costos ocultos.
              </p>
            </Card>
          </div>
        </section>

        {/* Future Features Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Próximamente</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Funcionalidades adicionales que llegarán para potenciar aún más tu farmacia
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Future Feature 1 */}
              <Card className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="text-yellow-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Posicionamiento Preferente</h3>
                <p className="text-slate-600 text-sm">
                  Tu farmacia aparecerá destacada en las búsquedas más relevantes.
                </p>
              </Card>
              
              {/* Future Feature 2 */}
              <Card className="p-6">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Megaphone className="text-pink-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Marketing Digital</h3>
                <p className="text-slate-600 text-sm">
                  Herramientas avanzadas para promocionar tus productos y ofertas.
                </p>
              </Card>
              
              {/* Future Feature 3 */}
              <Card className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="text-indigo-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Informes Avanzados</h3>
                <p className="text-slate-600 text-sm">
                  Análisis detallado de ventas y comportamiento de tus clientes.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Listo para hacer crecer tu farmacia?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Registra tu farmacia hoy, sin costo. ¡Empieza a vender más ya!
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
                <div className="space-y-6">
                  <Button 
                    onClick={handleRegistration}
                    data-testid="button-register-now"
                    className="w-full bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 h-auto"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Registrar Mi Farmacia Ahora
                  </Button>
                  <div className="flex items-center justify-center gap-4 text-blue-100 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>100% Gratis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Sin Compromiso</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Configuración Rápida</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-medium mb-4">Escanea para registrarte</p>
                  <QRCode 
                    value={registrationUrl}
                    size={128}
                    className="mx-auto"
                  />
                  <p className="text-sm text-blue-200 mt-3">
                    O visita: busca-listo.vercel.app
                  </p>
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full -translate-y-40 translate-x-40"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white opacity-10 rounded-full translate-y-30 -translate-x-30"></div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 no-print">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <PillBottle className="text-white" />
                </div>
                <span className="text-xl font-bold">Busca-Listo</span>
              </div>
              <p className="text-gray-300">
                La plataforma que conecta farmacias con clientes de manera gratuita y eficiente.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <div className="space-y-2 text-gray-300">
                <p><Mail className="w-4 h-4 inline mr-2" />info@busca-listo.com</p>
                <p><Phone className="w-4 h-4 inline mr-2" />+1 (555) 123-4567</p>
                <p><MapPinIcon className="w-4 h-4 inline mr-2" />Ciudad, País</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Enlaces</h3>
              <div className="space-y-2">
                <a href="#" className="text-gray-300 hover:text-white block">Términos y Condiciones</a>
                <a href="#" className="text-gray-300 hover:text-white block">Política de Privacidad</a>
                <a href="#" className="text-gray-300 hover:text-white block">Soporte</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2024 Busca-Listo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
