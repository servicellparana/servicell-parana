import { Link } from '@tanstack/react-router'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from './CartProvider'

export function SiteHeader() {
  const { count, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Servicell Paraná, inicio">
        <img src="/assets/servicell-logo-transparent.png" alt="Servicell Paraná" />
      </Link>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegación principal">
        <a href="/#productos" onClick={() => setMenuOpen(false)}>Productos</a>
        <a href="/#categorias" onClick={() => setMenuOpen(false)}>Categorías</a>
      </nav>
      <div className="header-actions">
        <a className="icon-button search-shortcut" href="/#productos" aria-label="Buscar productos"><Search size={19} /></a>
        <button className="cart-button" onClick={openCart} aria-label={`Abrir carrito con ${count} productos`}>
          <ShoppingBag size={19} />
          <span>Carrito</span>
          <b>{count}</b>
        </button>
        <button className="icon-button menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Abrir menú">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}
