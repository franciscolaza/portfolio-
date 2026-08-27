/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F5F1E8',
          soft: '#EDE5D3',
          white: '#FFFCF6',
        },
        ink: {
          DEFAULT: '#131210',
          soft: '#514E47',
          faint: '#8B867A',
        },
        charcoal: {
          DEFAULT: '#17150F',
          800: '#1F1C15',
          700: '#2A251B',
        },
        accent: {
          red: '#D6472B',
          orange: '#EE8B3C',
          yellow: '#E7B94A',
          teal: '#2E8B82',
          turquoise: '#4FB8AC',
          blue: '#3E5C82',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Archivo Black"', 'Inter', 'sans-serif'],
        black: ['"Archivo Black"', '"Space Grotesk"', 'sans-serif'],
        brush: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'gradient-art': 'linear-gradient(135deg, #D6472B 0%, #EE8B3C 50%, #E7B94A 100%)',
        'gradient-code': 'linear-gradient(135deg, #2E8B82 0%, #4FB8AC 100%)',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      boxShadow: {
        soft: '0 20px 60px -25px rgba(19, 18, 16, 0.25)',
        'soft-sm': '0 10px 30px -15px rgba(19, 18, 16, 0.2)',
        card: '0 1px 0 rgba(19,18,16,0.06), 0 12px 30px -18px rgba(19,18,16,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        float: 'float 7s ease-in-out infinite',
        'spin-slow': 'spin 22s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        draw: 'draw 1.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1deg)' },
        },
        draw: {
          '0%': { strokeDashoffset: 800 },
          '100%': { strokeDashoffset: 0 },
        },
      },
    },
  },
  plugins: [],
}
