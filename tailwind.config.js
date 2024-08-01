const withMT = require("@material-tailwind/react/utils/withMT");
import keepPreset from "keep-react/preset";

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#121212', // Color de fondo oscuro
        'card-foreground': '#ffffff', // Color de texto en el modo oscuro
        'muted-foreground': '#888888' // Color de texto atenuado
      },
      screens:{
        'xxsm': {'min': '320px', 'max': '488px'},
        'xsm':{'min': '489px', 'max': '768px'},
        'md': {'min': '769px', 'max': '4000px'}
      },
    },
  },
  plugins: [],
  presets: [keepPreset],
});
