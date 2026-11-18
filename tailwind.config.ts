import type { Config } from 'tailwindcss';

/**
 * APEX ROSARIO — brand palette (Royal Burgundy, Champagne Beige, White), checked
 * against the brochure cover (#562d2e foil) and rose-taupe texture pages
 * (#b4988b). Token names are kept from the shared Apex template so every
 * component is unchanged: `navy` = royal burgundy, `gold` = champagne beige.
 *   navy #623736   gold #c3ad9f   gold-deep #8c6b5d   stone #c3ad9f   pearl #ffffff   green #4a2627
 * `gold-deep` is the champagne darkened for small text on white (AA contrast).
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#623736',
        gold: { DEFAULT: '#c3ad9f', deep: '#8c6b5d' },
        stone: '#c3ad9f',
        pearl: '#ffffff',
        green: '#4a2627',
        // semantic aliases
        primary: '#623736',
        secondary: '#c3ad9f',
        accent: '#c3ad9f',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bodoni Moda', 'Georgia', 'serif'],
        deco: ['var(--font-deco)', 'Marcellus', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Jost', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.6rem, 6vw, 5.25rem)', { lineHeight: '1.04', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2.15rem, 4.6vw, 3.6rem)', { lineHeight: '1.08', letterSpacing: '-0.005em' }],
        'display-md': ['clamp(1.7rem, 3vw, 2.5rem)', { lineHeight: '1.14' }],
        'body-lg': ['clamp(1.0625rem, 1.15vw, 1.2rem)', { lineHeight: '1.75' }],
        label: ['0.72rem', { lineHeight: '1.4', letterSpacing: '0.26em' }],
      },
      maxWidth: {
        content: '1560px',
        prose: '66ch',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.45s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
