/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
  './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
  extend: {
    
    screens:{
      'xxsm': {'min': '320px', 'max': '427px'},
      'xsm':{'min': '427px', 'max': '1002px'},
      'md': {'min': '1002px', 'max': '4000px'}
      
    },

      colors:{
      primary: "#222",
      secundary: "#fff",
      acento: "#222",
    },
  
      fontFamily: {
        'montserrat': ['Montserrat'],
    }
  }
  },
  variants: {},
  plugins: []
}
