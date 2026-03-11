/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  
  daisyui: {
    themes: [
      {
        light: { 
          "primary": "#f471b5",
          "secondary": "#38bdf8",
          "accent": "#fbbf24",
          "neutral": "#1f2937",
          "base-100": "#111827",
          "base-content": "#f3f4f6",
        },
      },
    ],
  },
}