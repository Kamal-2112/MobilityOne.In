/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EF2929',
          light: '#F65050',
          dark: '#C81E1E',
          50: '#FDEBEC',
        },
        navy: {
          DEFAULT: '#163A5F',
          light: '#2A5680',
          dark: '#0E2942',
          50: '#E8EEF4',
        },
        pink: {
          DEFAULT: '#FDEBEC',
          light: '#FEF5F6',
          dark: '#F8D7D9',
          50: '#FEF5F6',
        },
        surface: {
          DEFAULT: '#F7F8FA',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px 0 rgba(22, 58, 95, 0.06)',
        card: '0 4px 24px 0 rgba(22, 58, 95, 0.08)',
        hover: '0 12px 40px 0 rgba(22, 58, 95, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'plus-rotate': 'plusRotate 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        plusRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
