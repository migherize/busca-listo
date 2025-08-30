import { Button } from "@/components/common/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Badge } from "@/components/common/ui/badge";
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  Database, 
  Globe,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  Search,
  Cookie,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText
} from "lucide-react";

export default function Privacy() {
  const lastUpdated = "15 de Diciembre, 2024";
  const effectiveDate = "1 de Enero, 2025";

  const sections = [
    {
      title: "1. Información que Recopilamos",
      icon: Database,
      color: "blue",
      content: [
        "Recopilamos información que nos proporcionas directamente cuando:",
        "• Creas una cuenta o perfil",
        "• Registras tu tienda",
        "• Realizas búsquedas",
        "• Contactas nuestro soporte",
        "• Te suscribes a nuestro boletín",
        "",
        "También recopilamos información automáticamente:",
        "• Datos de uso y navegación",
        "• Información del dispositivo",
        "• Cookies y tecnologías similares",
        "• Dirección IP y ubicación aproximada"
      ]
    },
    {
      title: "2. Cómo Usamos tu Información",
      icon: Eye,
      color: "green",
      content: [
        "Utilizamos tu información para:",
        "• Proporcionar y mejorar nuestros servicios",
        "• Personalizar tu experiencia",
        "• Procesar transacciones y pagos",
        "• Comunicarnos contigo",
        "• Analizar el uso de la plataforma",
        "• Prevenir fraudes y abusos",
        "• Cumplir con obligaciones legales",
        "",
        "Nunca vendemos tu información personal a terceros."
      ]
    },
    {
      title: "3. Compartir Información",
      icon: Users,
      color: "purple",
      content: [
        "Podemos compartir tu información en las siguientes situaciones:",
        "• Con tu consentimiento explícito",
        "• Con proveedores de servicios que nos ayudan a operar",
        "• Para cumplir con obligaciones legales",
        "• Para proteger nuestros derechos y seguridad",
        "• En caso de fusión o adquisición empresarial",
        "",
        "Nunca compartimos información personal con anunciantes sin tu permiso."
      ]
    },
    {
      title: "4. Seguridad de Datos",
      icon: Lock,
      color: "red",
      content: [
        "Implementamos medidas de seguridad robustas:",
        "• Encriptación SSL/TLS para datos en tránsito",
        "• Encriptación AES-256 para datos almacenados",
        "• Acceso restringido a datos personales",
        "• Monitoreo continuo de seguridad",
        "• Auditorías regulares de seguridad",
        "• Cumplimiento con estándares internacionales",
        "",
        "Sin embargo, ningún sistema es 100% seguro. Te recomendamos usar contraseñas fuertes."
      ]
    },
    {
      title: "5. Cookies y Tecnologías Similares",
      icon: Cookie,
      color: "yellow",
      content: [
        "Utilizamos cookies para:",
        "• Recordar tus preferencias",
        "• Analizar el tráfico del sitio",
        "• Personalizar contenido",
        "• Mejorar la funcionalidad",
        "• Proporcionar publicidad relevante",
        "",
        "Puedes controlar las cookies en la configuración de tu navegador.",
        "Algunas funciones pueden no funcionar correctamente si desactivas las cookies."
      ]
    },
    {
      title: "6. Tus Derechos de Privacidad",
      icon: Shield,
      color: "indigo",
      content: [
        "Tienes derecho a:",
        "• Acceder a tu información personal",
        "• Corregir datos inexactos",
        "• Solicitar la eliminación de datos",
        "• Restringir el procesamiento",
        "• Portabilidad de datos",
        "• Oponerte al procesamiento",
        "• Retirar consentimiento",
        "",
        "Para ejercer estos derechos, contáctanos en privacy@buscalisto.com"
      ]
    },
    {
      title: "7. Retención de Datos",
      icon: Clock,
      color: "orange",
      content: [
        "Retenemos tu información por:",
        "• Duración de tu cuenta activa",
        "• Tiempo necesario para cumplir obligaciones legales",
        "• Período requerido para resolver disputas",
        "• Tiempo necesario para mejorar nuestros servicios",
        "",
        "Los datos se eliminan de forma segura cuando ya no son necesarios.",
        "Puedes solicitar la eliminación de tu cuenta en cualquier momento."
      ]
    },
    {
      title: "8. Transferencias Internacionales",
      icon: Globe,
      color: "emerald",
      content: [
        "Tu información puede ser transferida a:",
        "• Servidores en diferentes países",
        "• Proveedores de servicios globales",
        "• Filiales internacionales",
        "",
        "Solo transferimos datos a países con protección adecuada.",
        "Utilizamos acuerdos de transferencia de datos estándar cuando sea necesario.",
        "Todas las transferencias cumplen con regulaciones de privacidad aplicables."
      ]
    },
    {
      title: "9. Menores de Edad",
      icon: Users,
      color: "pink",
      content: [
        "Nuestros servicios no están dirigidos a menores de 13 años.",
        "No recopilamos intencionalmente información de menores de 13 años.",
        "Si eres padre o tutor y crees que tu hijo nos ha proporcionado información:",
        "• Contáctanos inmediatamente",
        "• Eliminaremos la información del menor",
        "• Tomaremos medidas para prevenir futuras recopilaciones",
        "",
        "Para usuarios entre 13-18 años, se requiere consentimiento parental."
      ]
    },
    {
      title: "10. Cambios en esta Política",
      icon: FileText,
      color: "slate",
      content: [
        "Podemos actualizar esta política periódicamente.",
        "Te notificaremos sobre cambios significativos:",
        "• Por email a tu dirección registrada",
        "• A través de notificaciones en la plataforma",
        "• Publicando la nueva política en nuestro sitio",
        "",
        "El uso continuado después de los cambios constituye aceptación.",
        "Revisa esta política regularmente para estar informado."
      ]
    }
  ];

  const dataTypes = [
    {
      title: "Información Personal",
      icon: Users,
      color: "blue",
      examples: ["Nombre", "Email", "Teléfono", "Dirección"]
    },
    {
      title: "Información de Cuenta",
      icon: Lock,
      color: "green",
      examples: ["Nombre de usuario", "Contraseña", "Preferencias", "Historial"]
    },
    {
      title: "Datos de Uso",
      icon: Search,
      color: "purple",
      examples: ["Búsquedas", "Productos vistos", "Tiempo en sitio", "Páginas visitadas"]
    },
    {
      title: "Información Técnica",
      icon: Database,
      color: "orange",
      examples: ["IP", "Navegador", "Dispositivo", "Sistema operativo"]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      red: "bg-red-100 text-red-600 border-red-200",
      yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
      indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200",
      emerald: "bg-emerald-100 text-emerald-600 border-emerald-200",
      pink: "bg-pink-100 text-pink-600 border-pink-200",
      slate: "bg-slate-100 text-slate-600 border-slate-200"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tu privacidad es fundamental para nosotros. Esta política explica cómo recopilamos, 
            usamos y protegemos tu información personal en Busca Listo.
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
                <strong>Compromiso con la Privacidad:</strong> En Busca Listo, tu privacidad es nuestra prioridad. 
                Esta política detalla cómo manejamos tu información personal de manera transparente y segura.
              </p>
              <p>
                <strong>Puntos Clave:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>No vendemos ni alquilamos tu información personal</li>
                <li>Utilizamos encriptación de nivel bancario</li>
                <li>Tienes control total sobre tus datos</li>
                <li>Cumplimos con regulaciones internacionales</li>
                <li>Transparencia total en el manejo de datos</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Datos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Tipos de Información que Recopilamos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-full ${getColorClasses(type.color)}`}>
                      <type.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{type.title}</h3>
                  </div>
                  <div className="space-y-1">
                    {type.examples.map((example, exampleIndex) => (
                      <p key={exampleIndex} className="text-sm text-gray-600">
                        • {example}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Secciones de la Política */}
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

        {/* Contacto de Privacidad */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ¿Tienes Preguntas sobre Privacidad?
            </h3>
            <p className="text-blue-100 mb-6">
              Nuestro equipo de privacidad está aquí para responder todas tus preguntas 
              sobre el manejo de tus datos personales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <a href="mailto:privacy@buscalisto.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Oficial de Privacidad
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
                <a href="/help">
                  Centro de Ayuda
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nota Final */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <p className="text-blue-800 text-sm">
              <strong>Importante:</strong> Esta política de privacidad es parte de nuestros términos de servicio. 
              Al usar Busca Listo, aceptas el manejo de tu información según esta política.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
