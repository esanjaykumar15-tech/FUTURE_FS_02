export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      keyframes: {
        fade: { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'none' } },
        pop: { from: { opacity: 0, transform: 'scale(.96) translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
        toast: { from: { opacity: 0, transform: 'translateX(24px)' }, to: { opacity: 1, transform: 'none' } },
        drop: { from: { opacity: 0, transform: 'translateY(-4px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: { fade: 'fade .25s ease-out', pop: 'pop .18s ease-out', toast: 'toast .25s ease-out', drop: 'drop .12s ease-out' },
    },
  },
  plugins: [],
};
