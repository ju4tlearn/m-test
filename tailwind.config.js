/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/**/*.vue'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#0035e3'
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#0035e3'
        }
      }
    ]
  }
}
