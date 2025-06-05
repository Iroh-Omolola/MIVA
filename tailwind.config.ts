/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      extend: {
          width: {
              "fill-available": "-webkit-fill-available",
          },
          colors: {
              "miva-blue": "#0a3150",
              "hover-miva-blue":"#2f638d"
          },
          screens: {
              "2xs": "365px",
              400: "400px",
              420: "420px",
              xs: "425px",
              520: "520px",
              "3md": "520px",
              800: "800px",
              900: "900px",
              1100: "1100px",
              "3lg": "1100px",
              1400: "1400px",
              1500: "1500px",
              1750: "1750px",
          },
        
      },
  },
  plugins: [],
};
