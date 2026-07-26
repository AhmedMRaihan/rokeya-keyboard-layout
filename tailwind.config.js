module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'hind-siliguri': ['var(--font-hind-siliguri)', 'sans-serif'],
        'purno': ['var(--font-purno)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};