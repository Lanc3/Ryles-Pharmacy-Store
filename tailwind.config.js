module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}','./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            hr: {
              borderColor: theme('colors.gray.200'),
              borderTopWidth: '1px',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'ol > li::before': {
              color: theme('colors.gray.900'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.900'),
            },
          },
        },
      }),
      backgroundImage: {
        'shop': "url('/src/assets/shopfront.jpg')",
        'blue-wave': "url('/src/assets/bg-wave.jpg')",
        'inside-store': "url('/src/assets/inside-store.jpg')",
      },
      spacing: {
        '128': '32rem',
      },
      colors:{
        'ryles-gold': '#84754E',
        'ryles-blue': '#30437B',
      }
    },
  },
  plugins: [require('@tailwindcss/typography'),require('tw-elements/dist/plugin')],
  
};
