/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'spain-red': {
          DEFAULT: '#C60B1E',
          50: '#FEF2F2',
          100: '#FEE2E3',
          200: '#FECACC',
          300: '#FCA5A9',
          400: '#F87177',
          500: '#C60B1E',
          600: '#A80919',
          700: '#8A0715',
          800: '#6C0610',
          900: '#4E040C',
        },
        'spain-gold': {
          DEFAULT: '#FFC400',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#FFC400',
          600: '#D9A600',
          700: '#B38800',
          800: '#8C6B00',
          900: '#664E00',
        },
        surface: {
          cream: '#FFF8F0',
          dark: '#1A1A2E',
        },
        // Keep brand colors for compatibility with shared components
        brand: {
          primary: {
            DEFAULT: '#C60B1E',
            50: '#FEF2F2',
            100: '#FEE2E3',
            200: '#FECACC',
            300: '#FCA5A9',
            400: '#F87177',
            500: '#C60B1E',
            600: '#A80919',
            700: '#8A0715',
            800: '#6C0610',
            900: '#4E040C',
          },
          secondary: {
            DEFAULT: '#1A1A2E',
            50: '#F8F8FA',
            100: '#F0F0F4',
            200: '#E0E0E8',
            300: '#CCCCDA',
            400: '#9999B0',
            500: '#1A1A2E',
            600: '#151526',
            700: '#10101E',
            800: '#0B0B17',
            900: '#070710',
          },
          accent: {
            DEFAULT: '#FFC400',
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#FFC400',
            600: '#D9A600',
            700: '#B38800',
            800: '#8C6B00',
            900: '#664E00',
          },
        },
      },
      fontFamily: {
        heading: ['DM Sans', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        script: ['Kalam', 'cursive'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'toast-exit': 'toastExit 0.2s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSoft: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        toastExit: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
