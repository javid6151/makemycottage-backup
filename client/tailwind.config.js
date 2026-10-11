/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#141517',
        offwhite: '#f5f2f2',
        sand: '#E8E0D4',
        primary: {
          50: '#FAF7F2',
          100: '#F5F2ED',
          200: '#E8E0D4',
          300: '#D4C4A8',
          400: '#C17F59',
          500: '#8B6914',
          600: '#6B4226',
          700: '#5A3520',
          800: '#3D2416',
          900: '#1a1a1a',
          950: '#0c0c0c'
        },
        accent: {
          terracotta: '#C17F59',
          walnut: '#8B6914',
          forest: '#4A6741',
          sand: '#E8E0D4',
          ivory: '#FAF7F2',
          charcoal: '#141517'
        }
      },
      fontFamily: {
        heading: ['"Gilda Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['"Gilda Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section': 'clamp(5rem, 10vw, 10rem)',
        'section-sm': 'clamp(3rem, 6vw, 6rem)',
      },
      transitionDuration: {
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        }
      }
    },
  },
  plugins: [],
};
