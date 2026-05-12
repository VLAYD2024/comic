import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: '#e6f0fa',
        mist: '#dbe7f3',
        paper: '#ffffff',
        ink: '#1f3a5f',
        accent: '#5b9bd5'
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 6px 20px -8px rgba(31, 58, 95, 0.18)',
        hover: '0 14px 28px -12px rgba(31, 58, 95, 0.28)'
      }
    }
  },
  plugins: []
};

export default config;
