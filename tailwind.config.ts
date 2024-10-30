import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: 'var(--dark-blue)',  
        greenGradient: {
          100: 'var(--green-gradient-start)',
          200: 'var(--green-gradient-end)',
        },
        red: 'var(--red)',
        green: 'var(--green)',
        lightGreen: 'var(--light-green)',
        gray: 'var(--gray)',
        lightGray: 'var(--light-gray)',
        cardGray: 'var(--card-gray)',
        cardDateGray: 'var(--card-date-gray)',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(to bottom, var(--green-gradient-start), var(--green-gradient-end))',
      },
      fontFamily: {
        inter: 'var(--font-family-inter)',
      },
      fontSize: {
        xl: ['var(--font-size-xl)', 'var(--line-height-xl)'],
        lg: ['var(--font-size-lg)', 'var(--line-height-lg)'],
        md: ['var(--font-size-md)', 'var(--line-height-md)'],
        md2: ['var(--font-size-md-2)', 'var(--line-height-md-2)'],
        sm: ['var(--font-size-sm)', 'var(--line-height-sm)'],
        xs: ['var(--font-size-xs)', 'var(--line-height-xs)'],
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
      },
    },
  },
  plugins: [],
};

export default config;