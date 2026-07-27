import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import products, { formatPrice, type Product } from '@/data/products'

export interface CartItem {
  productId: number
  quantity: number
  selections: Record<string, string>
  comment?: string
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  count: number
  total: number
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, selections?: Record<string, string>, quantity?: number, comment?: string) => void
  removeItem: (index: number) => void
  updateQuantity: (index: number, quantity: number) => void
  checkout: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'servicell-cart'
const WHATSAPP_PHONE = '5493496503349'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved) as CartItem[])
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo<CartContextValue>(() => {
    const detailedItems = items.map((item) => ({ item, product: products.find((product) => product.id === item.productId) }))
    const total = detailedItems.reduce((sum, entry) => sum + (entry.product?.price ?? 0) * entry.item.quantity, 0)

    return {
      items,
      isOpen,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (product, selections = {}, quantity = 1, comment = '') => {
        setItems((current) => [...current, { productId: product.id, selections, quantity, comment: comment.trim() }])
        setIsOpen(true)
      },
      removeItem: (index) => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index)),
      updateQuantity: (index, quantity) => setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, quantity: Math.max(1, quantity) } : item)),
      checkout: () => {
        if (!items.length) return
        const lines = detailedItems.map(({ item, product }) => {
          const variants = Object.values(item.selections).filter(Boolean).join(' · ')
          const details = [variants, item.comment ? `Comentario: ${item.comment}` : ''].filter(Boolean).join(' · ')
          return `• ${item.quantity}x ${product?.name ?? 'Producto'}${details ? ` (${details})` : ''} — ${formatPrice((product?.price ?? 0) * item.quantity)}`
        })
        const message = [
          '¡Hola Servicell Paraná! 👋',
          'Quiero consultar por este pedido:',
          '',
          ...lines,
          '',
          `Total estimado: ${formatPrice(total)}`,
          '',
          '¿Me confirman disponibilidad y formas de entrega?'
        ].join('\n')
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
      },
    }
  }, [isOpen, items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
