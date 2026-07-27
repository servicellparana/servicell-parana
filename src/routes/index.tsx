import { createFileRoute } from '@tanstack/react-router'
import { Headphones, Search, ShieldCheck, Smartphone, Watch, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import products, { type ProductCategory } from '@/data/products'

export const Route = createFileRoute('/')({ component: Storefront })

const categories: Array<'Todos' | ProductCategory> = ['Todos', 'Celulares', 'Smartwatch', 'Fundas', 'Audio', 'Cargadores', 'Protección']

function Storefront() {
  const baseUrl = import.meta.env.BASE_URL
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('Todos')
  const [sort, setSort] = useState('destacados')

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase()
    const filtered = products.filter((product) =>
      (category === 'Todos' || product.category === category) &&
      (!normalized || `${product.name} ${product.category} ${product.shortDescription}`.toLowerCase().includes(normalized))
    )
    return [...filtered].sort((a, b) => {
      if (sort === 'menor') return a.price - b.price
      if (sort === 'mayor') return b.price - a.price
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    })
  }, [category, search, sort])

  return (
    <main>
      <section className="catalog storefront-catalog" id="productos">
        <div className="shop-title">
          <img src={`${baseUrl}assets/servicell-logo.png`} alt="Servicell Paraná" />
          <h1>Productos</h1>
        </div>
        <div className="catalog-toolbar">
          <label className="search-box"><Search size={19} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar celulares, smartwatch, auriculares..." /></label>
          <div className="category-pills">
            {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? 'active' : ''}>{item}</button>)}
          </div>
          <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ordenar productos">
            <option value="destacados">Destacados</option><option value="menor">Menor precio</option><option value="mayor">Mayor precio</option>
          </select>
        </div>
        {filteredProducts.length ? (
          <div className="product-grid">{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
        ) : (
          <div className="empty-results"><Search size={34} /><h3>No encontramos esa combinación</h3><p>Probá otra búsqueda o volvé a ver todos los productos.</p><button onClick={() => { setSearch(''); setCategory('Todos') }}>Limpiar filtros</button></div>
        )}
      </section>

      <section className="category-strip" id="categorias" aria-label="Categorías destacadas">
        <div><Smartphone /><span><b>Celulares</b>iPhone y equipos</span></div>
        <div><Watch /><span><b>Smartwatch</b>Relojes y wearables</span></div>
        <div><Headphones /><span><b>Audio</b>Auriculares y sonido</span></div>
        <div><Zap /><span><b>Cargadores</b>Cables y carga</span></div>
        <div><ShieldCheck /><span><b>Protección</b>Vidrios y pantallas</span></div>
      </section>

      <footer><img src={`${baseUrl}assets/servicell-logo.png`} alt="Servicell Paraná" /><p>Accesorios para celulares.</p><div><a href="#productos">Productos</a><a href="https://wa.me/5493496503349?text=Hola%20Servicell%20Paran%C3%A1" target="_blank" rel="noreferrer">WhatsApp ↗</a></div><small>© 2026 Servicell Paraná</small></footer>
    </main>
  )
}
