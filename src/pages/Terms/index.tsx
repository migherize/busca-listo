import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Shield, 
  Users, 
  Store, 
  ShoppingCart, 
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail
} from "lucide-react";

export default function Terms() {
  const lastUpdated = "15 de Diciembre, 2024";
  const effectiveDate = "1 de Enero, 2025";

  const sections = [
    {
      title: "1. Aceptación de los Términos",
      icon: CheckCircle,
      color: "green",
      content: [
        "Al acceder y usar Busca Listo, aceptas estar sujeto a estos Términos y Condiciones de Uso.",
        "Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro servicio.",
        "Nos reservamos el derecho de modificar estos términos en cualquier momento, notificándote los cambios."
      ]
    },
    {
      title: "2. Descripción del Servicio",
      icon: Store,
      color: "blue",
      content: [
        "Busca Listo es una plataforma de comparación de precios que conecta compradores con vendedores.",
        "No vendemos productos directamente, sino que facilitamos la comparación y búsqueda de productos.",
        "Los precios y disponibilidad son proporcionados por las tiendas asociadas y pueden cambiar sin previo aviso."
      ]
    },
    {
      title: "3. Cuentas de Usuario",
      icon: Users,
      color: "purple",
      content: [
        "Para usar ciertas funciones, debes crear una cuenta con información veraz y actualizada.",
        "Eres responsable de mantener la confidencialidad de tu contraseña y cuenta.",
        "No puedes transferir tu cuenta a otra persona ni permitir que otros la usen.",
        "Nos reservamos el derecho de suspender o cerrar cuentas que violen estos términos."
      ]
    },
    {
      title: "4. Uso Aceptable",
      icon: Shield,
      color: "indigo",
      content: [
        "Debes usar el servicio solo para propósitos legales y de acuerdo con estos términos.",
        "No puedes usar el servicio para:",
        "• Enviar spam o contenido malicioso",
        "• Intentar acceder no autorizado a nuestros sistemas",
        "• Interferir con el funcionamiento del servicio",
        "• Violar derechos de propiedad intelectual",
        "• Realizar actividades fraudulentas o engañosas"
      ]
    },
    {
      title: "5. Tiendas y Vendedores",
      icon: ShoppingCart,
      color: "orange",
      content: [
        "Las tiendas asociadas son entidades independientes responsables de sus productos y servicios.",
        "No garantizamos la calidad, seguridad o legalidad de los productos ofrecidos.",
        "Las transacciones se realizan directamente entre el comprador y la tienda.",
        "No somos responsables por disputas entre compradores y vendedores."
      ]
    },
    {
      title: "6. Precios y Disponibilidad",
      icon: CreditCard,
      color: "red",
      content: [
        "Los precios mostrados son proporcionados por las tiendas y pueden cambiar sin previo aviso.",
        "No garantizamos la precisión de los precios o la disponibilidad de productos.",
        "Recomendamos verificar precios y disponibilidad directamente con la tienda antes de comprar.",
        "No somos responsables por discrepancias en precios o productos agotados."
      ]
    },
    {
      title: "7. Propiedad Intelectual",
      icon: FileText,
      color: "yellow",
      content: [
        "Todo el contenido de Busca Listo está protegido por derechos de autor y propiedad intelectual.",
        "No puedes copiar, distribuir o modificar nuestro contenido sin autorización.",
        "Las marcas comerciales y logos son propiedad de sus respectivos dueños.",
        "El uso de nuestro servicio no te otorga derechos sobre nuestra propiedad intelectual."
      ]
    },
    {
      title: "8. Limitación de Responsabilidad",
      icon: AlertTriangle,
      color: "amber",
      content: [
        "En ningún caso seremos responsables por daños indirectos, incidentales o consecuentes.",
        "Nuestra responsabilidad total está limitada al monto pagado por el servicio en los últimos 12 meses.",
        "No garantizamos que el servicio esté libre de errores o interrupciones.",
        "No somos responsables por pérdidas de datos o interrupciones del servicio."
      ]
    },
    {
      title: "9. Privacidad",
      icon: Shield,
      color: "emerald",
      content: [
        "Tu privacidad es importante para nosotros. Consulta nuestra Política de Privacidad para más detalles.",
        "Recopilamos y usamos información personal de acuerdo con nuestra política de privacidad.",
        "No vendemos ni alquilamos tu información personal a terceros.",
        "Puedes ejercer tus derechos de privacidad contactándonos directamente."
      ]
    },
    {
      title: "10. Terminación",
      icon: Clock,
      color: "slate",
      content: [
        "Puedes terminar tu cuenta en cualquier momento contactándonos.",
        "Podemos suspender o terminar tu acceso al servicio por violación de estos términos.",
        "La terminación no afecta las obligaciones ya contraídas.",
        "Ciertas disposiciones de estos términos sobreviven a la terminación."
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-600 border-green-200",
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200",
      red: "bg-red-100 text-red-600 border-red-200",
      yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
      amber: "bg-amber-100 text-amber-600 border-amber-200",
      emerald: "bg-emerald-100 text-emerald-600 border-emerald-200",
      slate: "bg-slate-100 text-slate-600 border-slate-200"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estos términos establecen las reglas y regulaciones para el uso de Busca Listo. 
            Por favor, léelos cuidadosamente antes de usar nuestro servicio.
          </p>
        </div>

        {/* Información de Fechas */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Última Actualización</p>
                <p className="font-semibold text-gray-900">{lastUpdated}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Fecha de Efectividad</p>
                <p className="font-semibold text-gray-900">{effectiveDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumen Ejecutivo */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CheckCircle className="w-5 h-5 mr-2" />
              Resumen Ejecutivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-green-800">
              <p>
                <strong>Busca Listo</strong> es una plataforma de comparación de precios que conecta compradores con vendedores. 
                Al usar nuestro servicio, aceptas estos términos que establecen tus derechos y responsabilidades.
              </p>
              <p>
                <strong>Puntos Clave:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>No vendemos productos directamente</li>
                <li>Los precios son proporcionados por las tiendas asociadas</li>
                <li>Eres responsable de mantener segura tu cuenta</li>
                <li>Debes usar el servicio de manera legal y ética</li>
                <li>Podemos modificar estos términos con previo aviso</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Secciones de Términos */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${getColorClasses(section.color)}`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">
                      {section.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  {section.content.map((item, itemIndex) => (
                    <p key={itemIndex} className={item.startsWith('•') ? 'ml-4' : ''}>
                      {item}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contacto Legal */}
        <Card className="mt-12 bg-gradient-to-r from-slate-600 to-gray-700 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Tienes Preguntas sobre estos Términos?
            </h3>
            <p className="text-slate-200 mb-6">
              Si tienes alguna duda sobre estos términos y condiciones, 
              no dudes en contactar a nuestro equipo legal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <a href="mailto:legal@buscalisto.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Contacto Legal
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-slate-700">
                <a href="/help">
                  Centro de Ayuda
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nota Final */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <p className="text-amber-800 text-sm">
              <strong>Importante:</strong> Estos términos constituyen un acuerdo legal entre tú y Busca Listo. 
              Te recomendamos leerlos completamente y consultar con un abogado si tienes dudas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
