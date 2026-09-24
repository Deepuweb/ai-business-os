/** @type {import('tailwindcss').Config} */
export default {
  // "content" batata hai Tailwind ko ki kaunsi files scan karke
  // classNames dhoondhni hain (taaki final CSS chota rahe)
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
