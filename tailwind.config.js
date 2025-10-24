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
        'primary': '#8B5CF6',
        'secondary': '#EC4899',
        'accent': '#F472B6',
        'background': '#FAF5FF',
        'surface': '#FFFFFF',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'border': '#E5E7EB',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '20px',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-pink': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-bg': 'linear-gradient(180deg, #faf5ff 0%, #ffe4f1 100%)',
      },
    },
  },
  plugins: [],
}