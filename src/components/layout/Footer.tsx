import { Link } from "wouter";
import { footerData } from "@/data/footerData";
import { PillBottle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                {(() => {
                  const BrandingIcon = footerData.branding.icon ?? PillBottle;
                  return <BrandingIcon className="text-white" />;
                })()}
              </div>
              <span className="text-xl font-bold">{footerData.branding.name}</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {footerData.branding.description}
            </p>

            {/* Redes sociales */}
            {footerData.branding.socialLinks?.length ? (
              <div className="flex space-x-4 mb-4">
                {footerData.branding.socialLinks.map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a key={social.label} href={social.href} aria-label={social.label} className="hover:text-white transition-colors">
                      {SocialIcon ? (
                        <SocialIcon className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                      ) : null}
                    </a>
                  );
                })}
              </div>
            ) : null}

            {footerData.branding.storeCTA ? (
              <div className="mt-6">
                <h4 className="font-semibold text-white mb-2 flex items-center space-x-2">
                  {(() => {
                    const StoreIcon = footerData.branding.storeCTA?.icon ?? PillBottle;
                    return <StoreIcon className="w-5 h-5" />;
                  })()}
                  <span>¿Tienes una tienda?</span>
                </h4>
                <p className="text-gray-300 mb-2 text-sm max-w-xs">
                  {footerData.branding.storeCTA.description}
                </p>
                <Link
                  href={footerData.branding.storeCTA.href}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors inline-block text-center"
                >
                  {footerData.branding.storeCTA.text}
                </Link>
              </div>
            ) : null}
          </div>

          {/* Secciones dinámicas */}
          <div className="col-span-1">
            {/* Soporte */}
            {(() => {
              const soporteSection = footerData.sections.find(s => s.title === "Soporte");
              if (!soporteSection) return null;
              return (
                <>
                  <h4 className="flex items-center font-semibold text-white mb-4 space-x-2">
                    {soporteSection.icon && <soporteSection.icon className="w-5 h-5" />}
                    <span>{soporteSection.title}</span>
                  </h4>
                  {soporteSection.description && (
                    <p className="text-gray-300 text-sm mb-3">{soporteSection.description}</p>
                  )}
                  {soporteSection.links?.length && (
                    <ul className="space-y-2 text-sm text-gray-300 mb-6">
                      {soporteSection.links.map(link => {
                        const LinkIcon = link.icon;
                        return (
                          <li key={link.label}>
                            {link.href.startsWith("/") ? (
                              <Link href={link.href} className="hover:text-white transition-colors flex items-center space-x-2">
                                {LinkIcon && <LinkIcon className="w-4 h-4 inline" />}
                                <span>{link.label}</span>
                              </Link>
                            ) : (
                              <a href={link.href} className="hover:text-white transition-colors flex items-center space-x-2">
                                {LinkIcon && <LinkIcon className="w-4 h-4 inline" />}
                                <span>{link.label}</span>
                              </a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              );
            })()}

            {/* Contacto */}
            {(() => {
              const contactoSection = footerData.sections.find(s => s.title === "Contacto");
              if (!contactoSection) return null;
              return (
                <>
                  <h4 className="flex items-center font-semibold text-white mt-6 mb-2 space-x-2">
                    {contactoSection.icon && <contactoSection.icon className="w-5 h-5" />}
                    <span>{contactoSection.title}</span>
                  </h4>
                  <div className="space-y-2 text-gray-300 text-sm">
                    {contactoSection.links.map(link => (
                      <p key={link.label} className="flex items-center space-x-2">
                        {link.icon && <link.icon className="w-4 h-4 inline" />}
                        <span>{link.label}</span>
                      </p>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Otras secciones (Categorías u otras) */}
          {footerData.sections
            .filter(s => s.title !== "Soporte" && s.title !== "Contacto")
            .map(section => (
              <div key={section.title}>
                <h4 className="flex items-center font-semibold text-white mb-4 space-x-2">
                  {section.icon && <section.icon className="w-5 h-5" />}
                  <span>{section.title}</span>
                </h4>
                {section.description && (
                  <p className="text-gray-300 text-sm mb-3">{section.description}</p>
                )}
                {section.links?.length && (
                  <ul className="space-y-2 text-sm text-gray-300">
                    {section.links.map(link => {
                      const LinkIcon = link.icon;
                      return (
                        <li key={link.label}>
                          {link.href.startsWith("/") ? (
                            <Link href={link.href} className="hover:text-white transition-colors flex items-center space-x-2">
                              {LinkIcon && <LinkIcon className="w-4 h-4 inline" />}
                              <span>{link.label}</span>
                            </Link>
                          ) : (
                            <a href={link.href} className="hover:text-white transition-colors flex items-center space-x-2">
                              {LinkIcon && <LinkIcon className="w-4 h-4 inline" />}
                              <span>{link.label}</span>
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
