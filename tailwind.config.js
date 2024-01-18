const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens:{
        'xxsm': {'min': '320px', 'max': '488px'},
        'xsm':{'min': '489px', 'max': '768px'},
        'md': {'min': '769px', 'max': '4000px'}
        
      },
    },
  },
  plugins: [],
});