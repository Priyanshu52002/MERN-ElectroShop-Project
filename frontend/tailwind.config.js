/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#003366',
        'dark-blue': '#002244',
        'soft-gray': '#f5f5f5',
        'light-gray': '#e0e0e0',
        'warm-coral': '#FF6F61',
        'dark-coral': '#e05d53',
        'charcoal': '#333333'
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#003366", // Deep Blue
          secondary: "#f5f5f5", // Soft Gray
          accent: "#FF6F61", // Warm Coral
          neutral: "#333333", // Charcoal Gray
          "base-100": "#ffffff", // White
          "base-200": "#f5f5f5", // Soft Gray
          "base-300": "#e0e0e0", // Light Gray
          info: "#2094f3", // Blue
          success: "#00c851", // Green
          warning: "#ffbb33", // Orange
          error: "#ff4444", // Red
        }
      },
      "light",
      "dark",
      "cupcake",
      "forest"
    ]
  }
}
