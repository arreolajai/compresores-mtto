import type { Config } from 'tailwindcss';
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12262A', steel: '#4D6468', mist: '#DCE3E0', paper: '#F2F4F1',
        brand: { DEFAULT: '#0E4F52', dark: '#093537', light: '#CFE4E2' },
        ok: '#2E7D4F', warn: '#C98A00', danger: '#B3372B'
      },
      fontFamily: { sans: ['"Segoe UI"', 'system-ui', '-apple-system', 'Roboto', 'sans-serif'] },
      borderRadius: { panel: '6px' }
    }
  },
  plugins: []
} satisfies Config;
