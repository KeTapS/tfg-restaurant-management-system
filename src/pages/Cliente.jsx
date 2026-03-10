import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Cliente() {
  const [productos, setProductos] = useState([])
  
  // Novedad: Nuestro "interruptor" para saber qué pestaña está activa
  const [vistaActual, setVistaActual] = useState('carta')

  useEffect(() => {
    async function fetchProductos() {
      const { data, error } = await supabase.from('productos').select('*')
      if (!error) setProductos(data)
    }
    fetchProductos()
  }, [])

  return (
    <div className="min-h-screen bg-base-100 font-sans pb-10">
      
      {/* --- HEADER / NAVBAR ESTILO APP MÓVIL --- */}
      <div className="navbar bg-base-100 sticky top-0 z-50 border-b border-neutral shadow-sm px-4">
        
        {/* Parte izquierda: Logo y Nombre */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="La Riviera" className="w-10 h-10 rounded-full object-cover border border-primary" />
            <span className="text-xl font-bold text-primary tracking-widest uppercase">La Riviera</span>
          </div>
        </div>
        
        {/* Parte derecha: Menú de navegación */}
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 font-semibold">
            {/* Botón Carta */}
            <li>
              <a 
                // Operador ternario: Si la vista es 'carta', pintamos el texto de rosa (primary). Si no, gris.
                className={vistaActual === 'carta' ? 'text-primary' : 'text-base-content opacity-70'}
                onClick={() => setVistaActual('carta')}
              >
                Carta
              </a>
            </li>
            
            {/* Botón Noticias */}
            <li>
              <a 
                className={vistaActual === 'noticias' ? 'text-primary' : 'text-base-content opacity-70'}
                onClick={() => setVistaActual('noticias')}
              >
                Noticias
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* --- FIN DEL HEADER --- */}


      {/* --- CONTENIDO DINÁMICO (El Switch) --- */}
      <div className="p-4 mt-4">
        
        {/* SI VISTA ACTUAL ES 'CARTA', RENDERIZAMOS ESTO: */}
        {vistaActual === 'carta' && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-base-content mb-2 uppercase">Nuestra Carta</h1>
              <p className="text-sm text-base-content opacity-60">Escanea, pide y disfruta en la piscina.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {productos.map((producto) => (
                <div key={producto.id} className="card bg-neutral shadow-xl border border-gray-800">
                  <div className="card-body">
                    <h2 className="card-title text-primary uppercase text-xl">{producto.nombre}</h2>
                    <p className="text-sm opacity-80">{producto.descripcion}</p>
                    <div className="card-actions justify-between items-center mt-4">
                      <span className="text-2xl font-bold">{producto.precio} €</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SI VISTA ACTUAL ES 'NOTICIAS', RENDERIZAMOS ESTE PLACEHOLDER: */}
        {vistaActual === 'noticias' && (
          <div className="flex flex-col items-center justify-center mt-10 text-center animate-fade-in">
            <span className="text-6xl mb-4">🦩</span>
            <h2 className="text-2xl font-bold text-primary mb-2">Próximos Eventos</h2>
            <p className="text-base-content opacity-70 max-w-md">
              Estamos preparando la programación de este verano: clases de aquagym, tardeos con DJ, fiestas temáticas y mucho más.
            </p>
            <button 
              className="btn btn-outline btn-primary mt-6"
              onClick={() => setVistaActual('carta')}
            >
              Volver a la carta
            </button>
          </div>
        )}

      </div>

    </div>
  )
}