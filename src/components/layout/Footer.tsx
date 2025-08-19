import { Facebook, Twitter, Instagram, Mail, Phone, MapPinIcon, PillBottle, Tag, HelpCircle, LifeBuoy } from "lucide-react";
import { Link } from "wouter";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <PillBottle className="text-white" />
              </div>
              <span className="text-xl font-bold">Busca Listo</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Una solución integral diseñada para conectar personas, negocios y oportunidades de manera simple. 
              Encuentra los mejores productos, compara precios y descubre ofertas en un solo lugar.
            </p>

            {/* Redes sociales */}
            <div className="flex space-x-4 mb-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                <PillBottle className="w-5 h-5" />
                <span>¿Tienes una tienda?</span>
              </h4>
              <p className="text-gray-300 mb-2 text-sm max-w-xs">
                Registra tu tienda en Busca Listo y alcanza más clientes rápidamente.
              </p>
              <Link
                  href="/register-store"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors inline-block text-center"
                >
                  Registrar Tienda
              </Link>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="flex items-center font-semibold text-white mb-4 space-x-2">
              <Tag className="w-5 h-5" />
              <span>Categorías</span>
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {categories.slice(0, 8).map((category) => (
                <li key={category.key}>
                  <a href="#" className="hover:text-white transition-colors">
                    {category.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="flex items-center font-semibold text-white mb-4 space-x-2">
              <HelpCircle className="w-5 h-5" />
              <span>Soporte</span>
            </h4>
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </li>
            </ul>

            {/* Contacto */}
            <h4 className="flex items-center font-semibold text-white mt-6 mb-2 space-x-2">
              <LifeBuoy className="w-5 h-5" />
              <span>Contacto</span>
            </h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <p><Mail className="w-4 h-4 inline mr-2" /> contacto@buscalisto.com</p>
              <p><Phone className="w-4 h-4 inline mr-2" /> +1 (555) 123-4567</p>
              <p><MapPinIcon className="w-4 h-4 inline mr-2" /> Ciudad, País</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Busca Listo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
