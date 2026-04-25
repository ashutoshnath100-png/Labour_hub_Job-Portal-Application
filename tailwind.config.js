/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        "bg-main": "blue",
        "card-bg": "#ffffff",
        "primary": "#2563eb",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      }
    }
  },
}
