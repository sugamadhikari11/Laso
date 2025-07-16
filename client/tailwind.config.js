/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // only look inside your source files
    "./public/**/*.html",         // optional: only if you use static HTML
  ],
  theme: {
    extend: {
      screens: {
        xlplus: '1260px',
      },
    },
  },
  plugins: [],
};
