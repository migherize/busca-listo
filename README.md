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
│   └── qr-code/           # Componentes muy específicos: QRCode (index.tsx)
├── hooks/
├── lib/
├── pages/
│   ├── Home/
│   │   └── index.tsx
│   ├── OurServices/
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