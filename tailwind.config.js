/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        '5.5/10': '55.00%',
        '13/14': '198.00%',
        // ... more default values ...
      },
      backgroundColor:{
        darkshade:'#292929'
      },
      spacing: {
        '21': '3.8rem',
      },
      colors:{
        grayshade0:'#6D6D6D',
        grayshade1:'#EDEDED',
        grayshade:'#BDBDC6',
        grayshade2:'#656565',
        grayshade3:'#949494',
        grayshade4:'#D9D9D9',
        grayshade5:'#FAFAFA',
        grayshade6:'#373737',
        grayshade7:'#828282',
        grayshade8:'#E8E8E8',
        grayshade9:'#F2F2F2',
        greenshade:'#00C637',
        greenshade2:'#04FD3A',
        blueshade:'#2F17E8',
        blueshade2:'#179DE8',
        redshade:'#C63000',
            },
    translate: {
      '100': '34.5rem',
      '-100': '-34.5rem',
    },
    },
  },
  plugins: [],
}
