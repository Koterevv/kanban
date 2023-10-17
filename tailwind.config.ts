import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pink': '#D83F87',
        'deep-indigo': '#1E1826',
        'black-indigo': '#16111C',
        'indigo': '#44318D',
        'light-purple': '#805DA8',
        'font': '#D6D6D6',
      },
    },
  },
  plugins: [],
}
export default config
