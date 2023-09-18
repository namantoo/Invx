module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  content: [
        "./node_modules/flowbite/**/*.js"
    ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'sm': '700px',
      // => @media (min-width: 992px) { ... }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),
            require('flowbite/plugin')],
}

