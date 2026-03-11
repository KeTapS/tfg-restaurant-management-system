import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Cliente() {
  const [productos, setProductos] = useState([])
  const [vistaActual, setVistaActual] = useState('carta')
  const [categoriaActiva, setCategoriaActiva] = useState('todos')

  useEffect(() => {
    async function fetchProductos() {
      const { data, error } = await supabase.from('productos').select('*')
      if (!error) setProductos(data)
    }
    fetchProductos()
  }, [])

  // Extraemos las categorías únicas
  const categorias = ['todos', ...new Set(productos.map(p => p.categoria).filter(Boolean))];

  // Lógica inteligente: Si es "todos", mostramos todas (menos la palabra "todos"). Si no, solo la seleccionada.
  const categoriasAMostrar = categoriaActiva === 'todos'
    ? categorias.filter(c => c !== 'todos')
    : [categoriaActiva];

  return (
    <div
      className="min-h-screen font-sans pb-10"
      style={{
        backgroundImage: "url('/fondo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: "#111"
      }}
    >

      <div className="navbar bg-neutral/80 backdrop-blur-lg sticky top-0 z-50 shadow-md px-4 border-b border-gray-800">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="La Riviera" className="w-10 h-10 rounded-full object-cover border border-[#ff9ea2]" />
            <span className="text-xl font-bold text-[#ff9ea2] tracking-widest uppercase">La Riviera</span>
          </div>
        </div>

        <div className="flex flex-none items-center pr-2">
          <div className="flex bg-base-100/90 rounded-full p-1 border border-gray-800 shadow-inner">
            <button
              className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all duration-300 ${vistaActual === 'carta' ? 'bg-[#ff9ea2] text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              onClick={() => setVistaActual('carta')}
            >
              Carta
            </button>
            <button
              className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all duration-300 ${vistaActual === 'noticias' ? 'bg-[#ff9ea2] text-black shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              onClick={() => setVistaActual('noticias')}
            >
              Eventos
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto">
        {vistaActual === 'carta' && (
          <>
            <div className="sticky top-[64px] z-40 bg-base-100/70 backdrop-blur-md py-4 px-4 overflow-x-auto flex gap-3 no-scrollbar border-b border-gray-800">
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoriaActiva(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${categoriaActiva === cat
                      ? 'bg-[#ff9ea2] text-black shadow-lg scale-105'
                      : 'bg-neutral text-gray-400 border border-gray-700 hover:border-[#ff9ea2]/50 hover:text-white'
                    }`}
                >
                  {cat === 'todos' ? 'Carta Completa' : cat}
                </button>
              ))}
            </div>

            {/* LISTADO DE PRODUCTOS AGRUPADO */}
            <div className="p-6 space-y-12">
              {categoriasAMostrar.map(categoria => {
                // Filtramos los productos que pertenecen a esta categoría
                const productosDeCategoria = productos.filter(p => p.categoria === categoria);

                // Si por lo que sea una categoría está vacía, no la mostramos
                if (productosDeCategoria.length === 0) return null;

                return (
                  <div key={categoria} className="animate-fade-in">
                    {/* TÍTULO DE LA CATEGORÍA DECORADO */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#ff9ea2]/40"></div>
                      <h3 className="text-2xl font-black text-[#ff9ea2] uppercase tracking-widest text-center">
                        {categoria}
                      </h3>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#ff9ea2]/40"></div>
                    </div>

                    {/* CUADRÍCULA DE PRODUCTOS DE ESTA CATEGORÍA */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {productosDeCategoria.map((producto) => (
                        <div key={producto.id} className="card bg-[#121212] shadow-2xl border border-gray-700 hover:border-[#ff9ea2] hover:shadow-[0_0_20px_rgba(255,158,162,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group">

                          {/* ZONA DE LA IMAGEN */}
                          {producto.imagen_url && (
                            <figure className="relative h-56 w-full border-b border-gray-800 overflow-hidden">
                              <img
                                src={producto.imagen_url}
                                alt={producto.nombre}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80"></div>
                            </figure>
                          )}

                          {/* ZONA DEL TEXTO */}
                          <div className="card-body p-6 relative z-10">
                            <div className="flex justify-between items-start mb-2">
                              <h2 className="card-title text-[#ff9ea2] uppercase text-lg font-black leading-tight">
                                {producto.nombre}
                              </h2>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed italic line-clamp-2">
                              {producto.descripcion}
                            </p>
                            <div className="flex justify-end mt-4">
                              <span className="text-2xl font-black text-white bg-black px-4 py-1 rounded-xl border border-gray-700 shadow-inner">
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
          </>
        )}

        {vistaActual === 'noticias' && (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-[#121212] m-6 rounded-3xl border border-gray-800">
            <span className="text-7xl mb-6">🍹</span>
            <h2 className="text-3xl font-black text-[#ff9ea2] mb-4 uppercase tracking-tighter">Próximos Eventos</h2>
            <p className="text-gray-300 max-w-sm mb-8">
              Estamos preparando los mejores tardeos y eventos para este verano en La Riviera. ¡Sigue atento!
            </p>
          </div>
        )}
      </main>
    </div>
  )
}