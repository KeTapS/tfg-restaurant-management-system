import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Cliente() {
  const [productos, setProductos] = useState([])
  const [vistaActual, setVistaActual] = useState('carta')
  const [categoriaActiva, setCategoriaActiva] = useState('todos')
  const [drawerAbierto, setDrawerAbierto] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Barlow+Condensed:wght@400;600;800&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    async function fetchProductos() {
      const { data, error } = await supabase.from('productos').select('*')
      if (!error) setProductos(data)
    }
    fetchProductos()
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerAbierto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerAbierto])

  const categorias = ['todos', ...new Set(productos.map(p => p.categoria).filter(Boolean))]

  const categoriasAMostrar = categoriaActiva === 'todos'
    ? categorias.filter(c => c !== 'todos')
    : [categoriaActiva]

  const handleCategoria = (cat) => {
    setCategoriaActiva(cat)
    setDrawerAbierto(false)
  }

  return (
    <div
      className="min-h-screen pb-16"
      style={{
        backgroundImage: "url('/fondo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: "#0a0a0a",
        fontFamily: "'Barlow Condensed', sans-serif"
      }}
    >

      {/* ══════════════════════════════════
          HEADER (igual que antes, sin tocar)
      ══════════════════════════════════ */}
      <header
        className="sticky top-0 z-50"
        style={{ background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(16px)' }}
      >
        <div
          className="flex items-center justify-between px-5 h-14"
          style={{ borderBottom: '1px solid rgba(255,158,162,0.1)' }}
        >
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.jpg"
              alt="La Riviera"
              className="w-9 h-9 rounded-full object-cover"
              style={{ border: '1.5px solid rgba(255,158,162,0.5)' }}
            />
            <span className="text-base font-bold text-[#ff9ea2] tracking-widest uppercase">La Riviera</span>
          </div>

          <div className="flex items-center gap-3">

            {/* REDES SOCIALES — solo desktop */}
            <div className="hidden md:flex items-center gap-3 mr-1">
              <a href="https://www.instagram.com/lariviera2025/" aria-label="Instagram" className="transition-all duration-200 hover:scale-110" style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ff9ea2'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="transition-all duration-200 hover:scale-110" style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ff9ea2'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="transition-all duration-200 hover:scale-110" style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ff9ea2'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            {/* SEPARADOR — solo desktop */}
            <div className="hidden md:block w-px h-4" style={{ background: 'rgba(255,158,162,0.2)' }} />
            <div
              className="flex"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '10px', letterSpacing: '0.2em' }}
            >
              <button
                onClick={() => setVistaActual('carta')}
                className="px-4 py-1.5 rounded-sm uppercase transition-all duration-300"
                style={{
                  color: vistaActual === 'carta' ? '#0a0a0a' : 'rgba(255,255,255,0.45)',
                  background: vistaActual === 'carta' ? '#ff9ea2' : 'transparent',
                }}
              >
                Carta
              </button>
              <button
                onClick={() => setVistaActual('noticias')}
                className="px-4 py-1.5 rounded-sm uppercase transition-all duration-300"
                style={{
                  color: vistaActual === 'noticias' ? '#0a0a0a' : 'rgba(255,255,255,0.45)',
                  background: vistaActual === 'noticias' ? '#ff9ea2' : 'transparent',
                }}
              >
                Eventos
              </button>
            </div>

            {vistaActual === 'carta' && (
              <button
                onClick={() => setDrawerAbierto(true)}
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] ml-1 rounded-sm transition-all"
                style={{ background: 'rgba(255,158,162,0.08)', border: '1px solid rgba(255,158,162,0.2)' }}
                aria-label="Abrir categorías"
              >
                <span className="block w-4 h-[1.5px] bg-[#ff9ea2]" />
                <span className="block w-4 h-[1.5px] bg-[#ff9ea2]" />
                <span className="block w-4 h-[1.5px] bg-[#ff9ea2]" />
              </button>
            )}
          </div>
        </div>

        {vistaActual === 'carta' && (
          <div
            className="hidden md:flex justify-center overflow-x-auto no-scrollbar"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="flex min-w-max mx-auto">
              {categorias.map((cat, i) => {
                const isActive = categoriaActiva === cat
                const label = cat === 'todos' ? 'Carta Completa' : cat
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoriaActiva(cat)}
                    className="relative flex items-center justify-center px-6 transition-all duration-200"
                    style={{
                      height: '38px',
                      color: isActive ? '#ff9ea2' : 'rgba(255,255,255,0.3)',
                      background: isActive ? 'rgba(255,158,162,0.06)' : 'transparent',
                      borderLeft: i !== 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0"
                        style={{ height: '2px', background: 'linear-gradient(to right, transparent, #ff9ea2, transparent)' }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════
          DRAWER MÓVIL (igual que antes)
      ══════════════════════════════════ */}
      <div
        onClick={() => setDrawerAbierto(false)}
        className="fixed inset-0 z-[60] transition-all duration-300 md:hidden"
        style={{
          background: 'rgba(0,0,0,0.65)',
          opacity: drawerAbierto ? 1 : 0,
          pointerEvents: drawerAbierto ? 'auto' : 'none',
        }}
      />
      <div
        className="fixed top-0 left-0 h-full z-[70] flex flex-col md:hidden"
        style={{
          width: '72vw',
          maxWidth: '280px',
          background: 'rgba(10,10,10,0.98)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,158,162,0.15)',
          transform: drawerAbierto ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div
          className="flex items-center justify-between px-5 h-14 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,158,162,0.1)' }}
        >
          <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: 'rgba(255,158,162,0.6)' }}>
            Categorías
          </span>
          <button
            onClick={() => setDrawerAbierto(false)}
            className="w-8 h-8 flex items-center justify-center rounded-sm"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-3 px-3">
          {categorias.map((cat) => {
            const isActive = categoriaActiva === cat
            const label = cat === 'todos' ? 'Carta Completa' : cat
            return (
              <button
                key={cat}
                onClick={() => handleCategoria(cat)}
                className="w-full flex items-center px-4 py-3 mb-1 rounded-sm text-left transition-all duration-150"
                style={{
                  background: isActive ? 'rgba(255,158,162,0.1)' : 'transparent',
                  borderLeft: isActive ? '2px solid #ff9ea2' : '2px solid transparent',
                }}
              >
                <span
                  className="text-[11px] font-black uppercase tracking-[0.18em]"
                  style={{ color: isActive ? '#ff9ea2' : 'rgba(255,255,255,0.45)' }}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="" className="w-6 h-6 rounded-full object-cover opacity-40" />
            <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
              La Riviera
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/lariviera2025/" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          CONTENIDO — diseño premium
      ══════════════════════════════════ */}
      <main className="max-w-6xl mx-auto">
        {vistaActual === 'carta' && (
          <div className="p-6 space-y-14">
            {categoriasAMostrar.map(categoria => {
              const productosDeCategoria = productos.filter(p => p.categoria === categoria)
              if (productosDeCategoria.length === 0) return null

              return (
                <div key={categoria} className="animate-fade-in">

                  {/* TÍTULO DE SECCIÓN — estilo editorial */}
                  <div className="flex items-center gap-5 mb-8">
                    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, rgba(255,158,162,0.25))' }} />
                    <div className="text-center">
                      <p className="text-[9px] tracking-[0.4em] uppercase mb-1" style={{ color: 'rgba(255,158,162,0.4)', fontFamily: "'Barlow Condensed', sans-serif" }}>
                        — Sección —
                      </p>
                      <h3
                        className="uppercase"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: '#ff9ea2',
                          letterSpacing: '0.18em'
                        }}
                      >
                        {categoria}
                      </h3>
                    </div>
                    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, rgba(255,158,162,0.25))' }} />
                  </div>

                  {/* GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {productosDeCategoria.map((producto) => (
                      <div
                        key={producto.id}
                        className="group overflow-hidden transition-all duration-300 hover:-translate-y-1"
                        style={{
                          background: 'rgba(14,14,14,0.88)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          borderRadius: '3px',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,158,162,0.3)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                      >
                        {/* IMAGEN */}
                        {producto.imagen_url && (
                          <div className="relative overflow-hidden" style={{ height: '200px' }}>
                            <img
                              src={producto.imagen_url}
                              alt={producto.nombre}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div style={{
                              position: 'absolute', inset: 0,
                              background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.1) 55%, transparent 100%)'
                            }} />
                            {/* Badge categoría */}
                            <span
                              className="absolute top-3 right-3 text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-1"
                              style={{
                                background: 'rgba(10,10,10,0.7)',
                                color: 'rgba(255,158,162,0.75)',
                                border: '1px solid rgba(255,158,162,0.18)',
                                borderRadius: '2px',
                                backdropFilter: 'blur(6px)',
                                fontFamily: "'Barlow Condensed', sans-serif"
                              }}
                            >
                              {categoria}
                            </span>
                          </div>
                        )}

                        {/* TEXTO */}
                        <div className="p-5">
                          <h2
                            className="mb-2 leading-tight"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: '1.05rem',
                              fontWeight: 700,
                              color: '#f0f0f0',
                            }}
                          >
                            {producto.nombre}
                          </h2>
                          <p
                            className="line-clamp-2 mb-5"
                            style={{
                              color: 'rgba(255,255,255,0.38)',
                              fontStyle: 'italic',
                              fontSize: '0.82rem',
                              lineHeight: 1.6,
                              fontFamily: "'Barlow Condensed', sans-serif"
                            }}
                          >
                            {producto.descripcion}
                          </p>

                          {/* PRECIO */}
                          <div className="flex items-center">
                            <span style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
                            <span
                              className="ml-4"
                              style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: '#ff9ea2',
                                letterSpacing: '-0.01em'
                              }}
                            >
                              {producto.precio.toFixed(2)}€
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {vistaActual === 'noticias' && (
          <div
            className="flex flex-col items-center justify-center py-24 px-6 text-center m-6"
            style={{
              background: 'rgba(12,12,12,0.8)',
              border: '1px solid rgba(255,158,162,0.1)',
              borderRadius: '3px'
            }}
          >
            <span className="text-6xl mb-6">🍹</span>
            <p className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(255,158,162,0.45)' }}>
              Próximamente
            </p>
            <h2
              className="uppercase mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: '#ff9ea2',
                letterSpacing: '0.15em'
              }}
            >
              Eventos de Verano
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.38)', maxWidth: '320px', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Estamos preparando los mejores tardeos y eventos para este verano en La Riviera. ¡Sigue atento!
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
