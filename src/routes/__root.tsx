import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { CartDrawer } from '@/components/CartDrawer'
import { CartProvider } from '@/components/CartProvider'
import { SiteHeader } from '@/components/SiteHeader'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Accesorios para tu celular en Paraná. Fundas, auriculares, cargadores y más con atención personalizada por WhatsApp.' },
      { title: 'Servicell Paraná | Accesorios que conectan con vos' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap' },
    ],
  }),
  component: AppLayout,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function AppLayout() {
  return (
    <CartProvider>
      <SiteHeader />
      <Outlet />
      <CartDrawer />
    </CartProvider>
  )
}
