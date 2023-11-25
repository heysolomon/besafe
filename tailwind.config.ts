/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        brand: {
          pink: "#EB568E",
          blue: "#144EE3"
        },
        black: "#0B101B",
        grey: "#181E29",
        lite: "#C9CED6"
      },
      boxShadow: {
        blue: "10px 9px 22px 0px rgba(20, 78, 227, 0.38)",
        input: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)",
      },
      backgroundImage: {
        bg: "url(/images/background-image.svg)",
        "text-gradient": "linear-gradient(90deg, #144EE3 -0.02%, #EB568E 18.86%, #A353AA 64.49%, #144EE3 100.67%)"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
