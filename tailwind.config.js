/** @type {import('tailwindcss').Config} */
export const mode = 'jit';
export const purge = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      'press-start': ['"Press Start 2P"', 'cursive'],
    },
    gridTemplateColumns: {
      '70/30': '70% 30%', // Corrected to ensure a proper 70%/30% split
    },
  },
};
export const plugins = [];