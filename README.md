# Buscalisto - Product Comparison Platform

## Descripción

Buscalisto es una plataforma para buscar y comparar productos de salud. Permite filtrar por categorías, paginar resultados y ver información de precios, disponibilidad y requisitos de prescripción.

## Scripts

- `npm run dev`: inicia el servidor de desarrollo
- `npm run build`: compila para producción
- `npm run preview`: sirve la build de producción

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/                # Componentes atómicos (shadcn/ui, Radix)
│   ├── layout/            # Layout: Header, Footer
│   ├── common/            # Reutilizables no genéricos: LoadingState, ErrorState, EmptyState, PDFDownload
│   ├── products/          # Dominio productos: ProductCard, ProductGrid, CategoryNavbar
│   ├── ads/               # Anuncios: AdBannerVertical, CustomAdsLeft
│   ├── store/             # Registro de tiendas: SubscriptionSelection
│   └── qr-code/           # Componentes muy específicos: QRCode (index.tsx)
├── hooks/
├── lib/
├── services/              # Servicios: API, Email
├── types/                 # Tipos TypeScript
├── data/                  # Datos estáticos: suscripciones
├── pages/
│   ├── Home/
│   │   └── index.tsx
│   ├── OurServices/
│   │   └── index.tsx
│   ├── RegisterStore/     # Registro de tiendas
│   │   └── index.tsx
│   └── NotFound/
│       └── index.tsx
└── main.tsx, App.tsx, index.css
```

Alias de paths (Vite/TS):
- `@/*` → `src/*`
- `@shared/*` → `shared/*`

## Guía de componentes

- `components/ui/`: No tocar la API; son atómicos y reutilizables.
- `components/layout/`: Solo layout y composición visual del esqueleto de página.
- `components/common/`: Estados y utilidades UI compartidas (no de dominio). Ej.: `LoadingState`, `ErrorState`, `EmptyState`, `PDFDownload`.
- `components/products/`: UI del dominio de productos. Ej.: `ProductCard`, `ProductGrid`, `CategoryNavbar`.
- `components/ads/`: Integraciones y contenedores de anuncios.
- `components/qr-code/`: Componentes muy específicos/aislados.

## Páginas y enrutamiento

- El enrutamiento usa Wouter en `src/App.tsx`.
- Cada página vive en su carpeta con `index.tsx` y se importa como `@/pages/Nombre`.
- **Nuevas rutas agregadas:**
  - `/register-store` - Sistema de registro de tiendas
  - `/help` - Centro de ayuda y soporte
  - `/terms` - Términos y condiciones
  - `/privacy` - Política de privacidad

## Estándares de código

- TypeScript estricto, componentes funcionales, hooks para lógica.
- Importar usando alias `@` siempre que aplique.
- Mantener componentes puros y sin efectos colaterales salvo hooks necesarios.

## Desarrollo

Requisitos: Node 18+.

1. Instalar dependencias: `npm ci`
2. Desarrollo: `npm run dev`
3. Build: `npm run build`
4. Preview: `npm run preview`

## Notas

- UI basada en Tailwind y shadcn/ui.
- Estado de servidor con TanStack Query, cliente en `src/lib/queryClient.ts`.

## Sistema de Registro de Tiendas

### Características
- ✅ Formulario de datos de tienda (2 pasos)
- ✅ Selección de planes de suscripción (Básico, Medio, Premium)
- ✅ Sistema de emails de confirmación
- ✅ Validación de formularios
- ✅ UI responsiva y moderna

### Planes Disponibles
- **Básico**: FREE - 30 productos, sin anuncios
- **Medio**: $10/mes - 100 productos, con anuncios
- **Premium**: $30/mes - 500 productos, estadísticas completas

### Configuración de Emails
Ver `EMAIL_IMPLEMENTATION.md` para implementar envío real de emails con SendGrid, Mailgun o AWS SES.

### Variables de Entorno
Copiar `env.example` a `.env` y configurar credenciales del servicio de email elegido.

## Páginas del Footer

### Características
- ✅ **Centro de Ayuda**: FAQ organizadas, métodos de contacto, recursos útiles
- ✅ **Términos y Condiciones**: 10 secciones legales, resumen ejecutivo, contacto legal
- ✅ **Política de Privacidad**: Manejo transparente de datos, derechos del usuario, seguridad

### Diseño
- UI moderna con gradientes y iconos temáticos
- Responsive design para todos los dispositivos
- Navegación interna entre páginas relacionadas
- CTAs prominentes para contacto y soporte

Ver `FOOTER_PAGES_GUIDE.md` para documentación completa de estas páginas. 