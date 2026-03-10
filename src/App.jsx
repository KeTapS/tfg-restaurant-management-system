import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importamos las tres pantallas que acabamos de crear
import Cliente from './pages/Cliente'
import Camarero from './pages/Camarero'
import Cocina from './pages/Cocina'

function App() {
  return (
    <BrowserRouter>
      {/* El componente Routes define el mapeo de URLs (Endpoints) */}
      <Routes>
        
        {/* Si entran a la raíz (/) ven la carta pública */}
        <Route path="/" element={<Cliente />} />
        
        {/* Si entran a /camarero ven el TPV */}
        <Route path="/camarero" element={<Camarero />} />
        
        {/* Si entran a /cocina ven los pedidos */}
        <Route path="/cocina" element={<Cocina />} />
        
        {/* Ruta para capturar errores (Error 404) */}
        <Route path="*" element={<h1 className="text-center mt-20 text-3xl font-bold">Error 404: Página no encontrada</h1>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App