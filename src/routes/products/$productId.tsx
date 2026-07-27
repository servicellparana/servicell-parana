import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Check, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/CartProvider'
import { ProductCard } from '@/components/ProductCard'
import products, { formatPrice } from '@/data/products'

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetail,
  loader: ({ params }) => {
    const product = products.find((entry) => entry.id === Number(params.productId))
    if (!product) throw new Error('Producto no encontrado')
    return product
  },
})

function ProductDetail() {
  const product = Route.useLoaderData()
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [comment, setComment] = useState('')
  const [selections, setSelections] = useState<Record<string, string>>(() => Object.fromEntries(product.variants.map((variant) => [variant.name, variant.options[0]])))
  const related = products.filter((entry) => entry.id !== product.id && entry.category === product.category).slice(0, 3)

  return (
    <main className="product-page">
      <div className="product-detail-shell">
        <Link to="/" className="back-link"><ArrowLeft size={17} /> Volver al catálogo</Link>
        <div className="product-detail-grid">
          <section className="gallery">
            <div className="gallery-main"><img src={product.images[activeImage]} alt={`${product.name}, vista ${activeImage + 1}`} />{product.badge && <span className="product-badge">{product.badge}</span>}<span className="image-count">0{activeImage + 1} / 0{product.images.length}</span></div>
            <div className="gallery-thumbs">{product.images.map((image, index) => <button className={activeImage === index ? 'active' : ''} key={image} onClick={() => setActiveImage(index)}><img src={image} alt={`Vista ${index + 1}`} /></button>)}</div>
          </section>
          <section className="product-info">
            <span className="product-category">{product.category} / Colección 2026</span>
            <h1>{product.name}</h1>
            <div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}<span>3 cuotas sin interés</span></div>
            <p className="detail-description">{product.description}</p>
            {product.variants.map((variant) => (
              <fieldset className="variant-group" key={variant.name}>
                <legend>{variant.name} <b>{selections[variant.name]}</b></legend>
                <div>{variant.options.map((option) => <button type="button" key={option} className={selections[variant.name] === option ? 'active' : ''} onClick={() => setSelections((current) => ({ ...current, [variant.name]: option }))}>{option}{selections[variant.name] === option && <Check size={14} />}</button>)}</div>
              </fieldset>
            ))}
            {product.commentPrompt && (
              <label className="comment-field">
                <span>{product.commentPrompt}</span>
                <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder={product.commentPlaceholder ?? 'Escribí tu comentario'} />
              </label>
            )}
            <div className="purchase-row">
              <div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Restar"><Minus size={17} /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Sumar"><Plus size={17} /></button></div>
              <button className="primary-button add-cart-wide" onClick={() => addItem(product, selections, quantity, comment)}><ShoppingBag size={19} /> Agregar al carrito</button>
            </div>
            <div className="purchase-benefits"><span><Truck size={19} /><b>Entrega coordinada</b>En Paraná y alrededores</span><span><ShieldCheck size={19} /><b>Compra acompañada</b>Atención personalizada</span></div>
            <div className="spec-list"><h2>Detalles que importan</h2>{product.specs.map((spec) => <span key={spec}><Check size={15} />{spec}</span>)}</div>
          </section>
        </div>
      </div>
      {related.length > 0 && <section className="related-products"><div className="section-heading"><div><span className="eyebrow">También te puede gustar</span><h2>Completá tu <em>setup.</em></h2></div></div><div className="product-grid">{related.map((item, index) => <ProductCard product={item} index={index} key={item.id} />)}</div></section>}
    </main>
  )
}
