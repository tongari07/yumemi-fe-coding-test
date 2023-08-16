/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit, minmax(100px, 1fr))',
      },
    },
  },
  plugins: [],
}
