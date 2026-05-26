/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#003768',
          dark: '#002850',
          light: '#1e5a8f',
          50: '#eef4fa',
          100: '#d4e3f1',
          900: '#001a30'
        },
        accent: {
          DEFAULT: '#009E3D',
          dark: '#007a2f',
          light: '#1eb455',
          50: '#e8f7ee'
        },
        neutral: {
          bg: '#EFEFEF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif']
      },
      boxShadow: {
        soft: '0 2px 20px rgba(0, 56, 105, 0.08)',
        card: '0 4px 24px rgba(0, 56, 105, 0.10)'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } }
      }
    }
  },
  plugins: []
}
