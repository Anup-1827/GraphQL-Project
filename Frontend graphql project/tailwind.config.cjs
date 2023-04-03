/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-color":  "var(--main-color)",
        "main-heading": "var(--main-heading)"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}
