import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // Paleta Brit Mashiach
        petroleum: {
          50:  '#edf4f7',
          100: '#d0e5ed',
          200: '#a1cad9',
          300: '#72afc5',
          400: '#4394b1',
          500: '#2a7a9d',
          600: '#1d6585',
          700: '#1b4e6b',
          800: '#1B3A4B',
          900: '#162d3a',
          950: '#0e1d25',
        },
        gold: {
          50:  '#fdf8ec',
          100: '#f8edc9',
          200: '#f0d990',
          300: '#e8c45a',
          400: '#ddb040',
          500: '#C9A84C',
          600: '#b8960b',
          700: '#957a08',
          800: '#72600a',
          900: '#4f4208',
          950: '#2c2504',
        },
        parchment: {
          50:  '#fdfaf4',
          100: '#F9F4E8',
          200: '#F5EFE0',
          300: '#ede3cc',
          400: '#ddd0b0',
          500: '#c8b98e',
          600: '#b0a070',
          700: '#8c7d54',
          800: '#6a5f3f',
          900: '#4a4229',
        },
        warmgray: {
          50:  '#f9f8f7',
          100: '#f0eeec',
          200: '#e0dcd8',
          300: '#c8c2bb',
          400: '#aca59c',
          500: '#8A8078',
          600: '#756d65',
          700: '#605850',
          800: '#4a4440',
          900: '#342f2c',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
        hebrew: ['Shlomo Stam', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'drawer-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'drawer-overlay-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'shimmer': 'shimmer 2.5s infinite linear',
        'drawer-in': 'drawer-in 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
        'drawer-overlay-in': 'drawer-overlay-in 0.2s ease-out',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C, #e8c45a, #C9A84C)',
        'petroleum-gradient': 'linear-gradient(135deg, #162d3a, #1B3A4B, #2a7a9d)',
        'parchment-gradient': 'linear-gradient(180deg, #F9F4E8, #F5EFE0)',
      },
      boxShadow: {
        'gold-sm': '0 1px 3px rgba(201, 168, 76, 0.15)',
        'gold-md': '0 4px 12px rgba(201, 168, 76, 0.2)',
        'petroleum-sm': '0 1px 3px rgba(27, 58, 75, 0.15)',
        'petroleum-md': '0 4px 24px rgba(27, 58, 75, 0.25)',
        'glass': '0 8px 32px rgba(27, 58, 75, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
