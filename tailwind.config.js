const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens:{
        'xxsm': {'min': '320px', 'max': '427px'},
        'xsm':{'min': '427px', 'max': '1002px'},
        'md': {'min': '1002px', 'max': '4000px'}

      },
    },
  },
  plugins: [],
});