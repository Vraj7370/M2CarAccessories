/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'cursive'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        gold: '#C9A84C',
        gold2: '#E8C97A',
        dark: '#0A0A0A',
        dark2: '#111111',
        dark3: '#1A1A1A',
        dark4: '#222222',
      },
    },
  },
  plugins: [],
}
