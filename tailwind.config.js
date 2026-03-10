/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        riviera: {
          "primary": "#FF7B89",     // El rosa salmón del flamenco y títulos
          "secondary": "#38BDF8",   // Un azul agua de piscina para contrastar
          "accent": "#FBBF24",      // Amarillo sol
          "neutral": "#1F2937",     // Gris oscuro para el fondo de las tarjetas
          "base-100": "#111827",    // El fondo negro/pizarra de la carta
          "base-content": "#F3F4F6",// Texto en gris muy clarito (casi blanco)
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
      "light", // Dejamos el tema claro de reserva
    ],
  },
}