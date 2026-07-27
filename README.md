# Servicell Paraná

Tienda online mobile-first para explorar accesorios de celulares, elegir variantes y preparar un pedido que se finaliza con atención personalizada por WhatsApp.

## Funcionalidades

- Catálogo responsive con búsqueda, filtros por categoría y orden por precio.
- Fichas de producto con galería, variantes, especificaciones y cantidad.
- Carrito lateral persistente en el navegador.
- Pedido prearmado con productos, variantes, cantidades y total para enviar por WhatsApp.
- Identidad visual personalizada a partir del logo de Servicell Paraná.

## Tecnologías

- TanStack Start y TanStack Router
- React 19 y TypeScript
- Tailwind CSS 4
- Lucide React
- Netlify

## Uso local

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible en `http://localhost:3000`.

## Publicación en Netlify

Subir la carpeta fuente del proyecto a un repositorio y conectarlo desde Netlify. No subir `node_modules`, `dist` ni `.netlify`; Netlify los genera automáticamente.

Configuración esperada:

- Build command: `pnpm build`
- Publish directory: `dist/client`
- Node version: `22`
- Package manager: `pnpm@11.9.0`

El archivo `netlify.toml` ya contiene estos valores y también agrega headers de caché y seguridad.

## Personalización

Los productos, precios, fotos y variantes se editan en `src/data/products.ts`. El carrito genera un enlace genérico de WhatsApp; cuando esté disponible el número comercial, se puede incorporarlo en la URL dentro de `src/components/CartProvider.tsx`.
