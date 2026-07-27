import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import products, { formatPrice } from '@/data/products'
import { useCart } from './CartProvider'

export function CartDrawer() {
  const { items, isOpen, total, closeCart, removeItem, updateQuantity, checkout } = useCart()

  return (
    <>
      <button className={isOpen ? 'drawer-backdrop is-open' : 'drawer-backdrop'} onClick={closeCart} aria-label="Cerrar carrito" />
      <aside className={isOpen ? 'cart-drawer is-open' : 'cart-drawer'} aria-label="Carrito de compras" aria-hidden={!isOpen}>
        <div className="drawer-header">
          <div><span className="eyebrow">Tu selección</span><h2>Carrito</h2></div>
          <button className="icon-button" onClick={closeCart} aria-label="Cerrar"><X size={21} /></button>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <span><ShoppingBag size={34} /></span>
            <h3>Todavía está vacío</h3>
            <p>Explorá el catálogo y guardá tus favoritos para consultarnos por WhatsApp.</p>
            <button className="primary-button" onClick={closeCart}>Ver productos</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item, index) => {
                const product = products.find((entry) => entry.id === item.productId)
                if (!product) return null
                return (
                  <article className="cart-item" key={`${product.id}-${index}`}>
                    <img src={product.images[0]} alt="" />
                    <div className="cart-item-info">
                      <div className="cart-item-top">
                        <div>
                          <h3>{product.name}</h3>
                          <p>{Object.values(item.selections).join(' · ')}</p>
                          {item.comment && <p className="cart-comment">Comentario: {item.comment}</p>}
                        </div>
                        <button onClick={() => removeItem(index)} aria-label={`Eliminar ${product.name}`}><Trash2 size={16} /></button>
                      </div>
                      <div className="cart-item-bottom">
                        <div className="quantity-control compact">
                          <button onClick={() => updateQuantity(index, item.quantity - 1)} aria-label="Restar"><Minus size={14} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(index, item.quantity + 1)} aria-label="Sumar"><Plus size={14} /></button>
                        </div>
                        <strong>{formatPrice(product.price * item.quantity)}</strong>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
            <div className="cart-footer">
              <div className="cart-total"><span>Total estimado</span><strong>{formatPrice(total)}</strong></div>
              <button className="whatsapp-button" onClick={checkout}>Finalizar por WhatsApp <span>↗</span></button>
              <p>Te redirigimos con el detalle listo. La compra se confirma personalmente.</p>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
