import { Button } from "@/components/common/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Input } from "@/components/common/ui/input";
import { Badge } from "@/components/common/ui/badge";
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  BookOpen, 
  Users, 
  Store,
  ShoppingCart,
  CreditCard,
  Shield,
  Zap
} from "lucide-react";

export default function Help() {
  const faqCategories = [
    {
      title: "Cuenta y Perfil",
      icon: Users,
      color: "blue",
      faqs: [
        {
          question: "¿Cómo creo una cuenta en Busca Listo?",
          answer: "Para crear una cuenta, haz clic en 'Registrarse' en la parte superior derecha de la página. Puedes registrarte con tu email o usando tu cuenta de Google o Facebook."
        },
        {
          question: "¿Cómo cambio mi contraseña?",
          answer: "Ve a tu perfil > Configuración > Seguridad. Allí podrás cambiar tu contraseña actual por una nueva."
        },
        {
          question: "¿Puedo tener múltiples cuentas?",
          answer: "No recomendamos tener múltiples cuentas personales. Sin embargo, si eres propietario de varias tiendas, cada tienda debe tener su propia cuenta empresarial."
        }
      ]
    },
    {
      title: "Búsqueda y Productos",
      icon: Search,
      color: "green",
      faqs: [
        {
          question: "¿Cómo encuentro productos específicos?",
          answer: "Usa la barra de búsqueda principal. Puedes buscar por nombre del producto, marca, categoría o incluso descripción. También puedes usar filtros para refinar tus resultados."
        },
        {
          question: "¿Cómo comparo precios entre tiendas?",
          answer: "Cuando busques un producto, verás una lista de tiendas que lo venden con sus respectivos precios. Haz clic en 'Comparar' para ver una comparación detallada."
        },
        {
          question: "¿Los precios están actualizados?",
          answer: "Sí, trabajamos constantemente para mantener los precios actualizados. Sin embargo, recomendamos verificar directamente con la tienda antes de realizar una compra."
        }
      ]
    },
    {
      title: "Tiendas y Vendedores",
      icon: Store,
      color: "purple",
      faqs: [
        {
          question: "¿Cómo registro mi tienda en Busca Listo?",
          answer: "Haz clic en 'Registrar Tienda' en el header o footer. Completa el formulario con la información de tu negocio y selecciona un plan de suscripción."
        },
        {
          question: "¿Cuáles son los planes disponibles?",
          answer: "Ofrecemos 3 planes: Básico (FREE), Medio ($10/mes) y Premium ($30/mes). Cada plan incluye diferentes cantidades de productos, anuncios y características."
        },
        {
          question: "¿Cómo subo productos a mi tienda?",
          answer: "Una vez aprobada tu tienda, recibirás acceso al panel de administración donde podrás agregar, editar y gestionar todos tus productos."
        }
      ]
    },
    {
      title: "Compras y Pagos",
      icon: ShoppingCart,
      color: "orange",
      faqs: [
        {
          question: "¿Puedo comprar directamente en Busca Listo?",
          answer: "No, Busca Listo es un comparador de precios. Te redirigimos a la tienda original para que completes tu compra allí."
        },
        {
          question: "¿Qué métodos de pago aceptan las tiendas?",
          answer: "Cada tienda tiene sus propios métodos de pago. Puedes ver esta información en la página del producto o contactando directamente con la tienda."
        },
        {
          question: "¿Hay costos adicionales por usar Busca Listo?",
          answer: "No, Busca Listo es completamente gratuito para los compradores. Solo las tiendas pagan por suscripciones para listar productos."
        }
      ]
    },
    {
      title: "Seguridad y Privacidad",
      icon: Shield,
      color: "red",
      faqs: [
        {
          question: "¿Es seguro usar Busca Listo?",
          answer: "Sí, tu seguridad es nuestra prioridad. No almacenamos información de tarjetas de crédito y todas las transacciones se realizan directamente con las tiendas."
        },
        {
          question: "¿Comparten mi información personal?",
          answer: "No, tu información personal nunca se comparte con terceros sin tu consentimiento. Solo la usamos para mejorar tu experiencia en la plataforma."
        },
        {
          question: "¿Cómo protegen mis datos?",
          answer: "Utilizamos encriptación SSL y seguimos las mejores prácticas de seguridad para proteger toda tu información personal y de navegación."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      title: "Email de Soporte",
      description: "Responde en 24 horas",
      icon: Mail,
      href: "mailto:soporte@buscalisto.com",
      color: "blue"
    },
    {
      title: "Teléfono",
      description: "Lun-Vie 9AM-6PM",
      icon: Phone,
      href: "tel:+15551234567",
      color: "green"
    },
    {
      title: "Chat en Vivo",
      description: "Disponible 24/7",
      icon: MessageCircle,
      href: "#",
      color: "purple"
    }
  ];

  const helpResources = [
    {
      title: "Guía de Usuario",
      description: "Aprende a usar todas las funciones",
      icon: BookOpen,
      href: "/help/guide",
      color: "indigo"
    },
    {
      title: "Video Tutoriales",
      description: "Videos paso a paso",
      icon: Zap,
      href: "/help/videos",
      color: "yellow"
    },
    {
      title: "Comunidad",
      description: "Conecta con otros usuarios",
      icon: Users,
      href: "/help/community",
      color: "pink"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200",
      red: "bg-red-100 text-red-600 border-red-200",
      indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
      yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
      pink: "bg-pink-100 text-pink-600 border-pink-200"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Centro de Ayuda
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas rápidas a tus preguntas y recursos útiles para aprovechar al máximo Busca Listo
          </p>
        </div>

        {/* Barra de Búsqueda */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Buscar en el centro de ayuda..."
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Métodos de Contacto */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ¿Necesitas Ayuda Personalizada?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getColorClasses(method.color)}`}>
                    <method.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {method.description}
                  </p>
                  <Button asChild className="w-full">
                    <a href={method.href}>
                      Contactar
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recursos de Ayuda */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Recursos Útiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {helpResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getColorClasses(resource.color)}`}>
                    <resource.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {resource.description}
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <a href={resource.href}>
                      Ver Más
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Preguntas Frecuentes por Categoría */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Preguntas Frecuentes
          </h2>
          
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${getColorClasses(category.color)}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>
                      Preguntas comunes sobre {category.title.toLowerCase()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border-l-4 border-blue-200 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Final */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                ¿No Encontraste lo que Buscabas?
              </h3>
              <p className="text-blue-100 mb-6">
                Nuestro equipo de soporte está aquí para ayudarte con cualquier pregunta o problema que tengas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <a href="mailto:soporte@buscalisto.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Email
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
                  <a href="/contact">
                    Contactar Soporte
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
