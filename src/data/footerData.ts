import { Facebook, Twitter, Instagram, Mail, Phone, MapPinIcon, PillBottle, Tag, HelpCircle, LifeBuoy } from "lucide-react";
import { categories } from "@shared/SchemaCategory";
import type { FooterData } from "@shared/Footer";

const categoryLinks = categories
  .filter((c) => c.key !== "all")
  .slice(0, 8)
  .map((c) => ({ label: c.label, href: `/?category=${c.key}` }));

export const footerData: FooterData = {
  branding: {
    name: "Busca Listo",
    icon: PillBottle,
    logo: "/assets/logo1.jpeg",
    description:
      "Una solución integral diseñada para conectar personas, negocios y oportunidades de manera simple. Encuentra los mejores productos, compara precios y descubre ofertas en un solo lugar.",
    socialLinks: [
      { label: "Facebook", href: "#", icon: Facebook },
      { label: "Twitter", href: "#", icon: Twitter },
      { label: "Instagram", href: "#", icon: Instagram },
    ],
    storeCTA: {
      text: "Registrar Tienda",
      description: "Registra tu tienda en Busca Listo y alcanza más clientes rápidamente.",
      href: "/register-store",
      icon: PillBottle,
    },
  },
  sections: [
    {
      title: "Empresa",
      icon: PillBottle,
      links: [
        { label: "Sobre Nosotros", href: "/about" },
        { label: "Nuestros Servicios", href: "/services" },
        { label: "Registrar Tienda", href: "/register-store" },
      ],
    },
    {
      title: "Contacto",
      icon: LifeBuoy,
      links: [
        { label: "contacto@buscalisto.com", href: "mailto:contacto@buscalisto.com", icon: Mail },
        { label: "+1 (555) 123-4567", href: "tel:+15551234567", icon: Phone },
        { label: "Ciudad, País", href: "#", icon: MapPinIcon },
      ],
    },
    {
      title: "Soporte",
      icon: HelpCircle,
      links: [
        { label: "Centro de ayuda", href: "/help" },
        { label: "Términos y condiciones", href: "/terms" },
        { label: "Política de privacidad", href: "/privacy" },
      ],
    },
    {
      title: "Categorías",
      icon: Tag,
      links: categoryLinks,
    },
  ],
  copyright: `© ${new Date().getFullYear()} Busca Listo. Todos los derechos reservados.`,
};
