import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Plus } from 'lucide-react'
import { formatPrice, type Product } from '@/data/products'
import { useCart } from './CartProvider'

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart()
  const defaultSelections = Object.fromEntries(product.variants.map((variant) => [variant.name, variant.options[0]]))

  return (
    <article className="product-card reveal" style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}>
      <Link to="/products/$productId" params={{ productId: product.id.toString() }} className="product-image-wrap">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <span className="view-product">Ver detalle <ArrowUpRight size={16} /></span>
      </Link>
      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <Link to="/products/$productId" params={{ productId: product.id.toString() }}><h3>{product.name}</h3></Link>
        <p>{product.shortDescription}</p>
        <div className="product-card-footer">
          <div><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div>
          {product.commentPrompt ? (
            <Link to="/products/$productId" params={{ productId: product.id.toString() }} className="add-icon" aria-label={`Elegir ${product.name}`}><ArrowUpRight size={18} /></Link>
          ) : (
            <button className="add-icon" onClick={() => addItem(product, defaultSelections)} aria-label={`Agregar ${product.name}`}><Plus size={20} /></button>
          )}
        </div>
      </div>
    </article>
  )
}
