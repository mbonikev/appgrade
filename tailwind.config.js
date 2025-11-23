/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "var(--main_color)",
        mainWeak: "var(--main_color_weak)",
        cardBg: "var(--card_bg)",
        bodyBg: "var(--body_bg)",
        textColor: "var(--text_color)",
        textColorWeak: "var(--text_color_weak)",
        linesColor: "var(--lines_color)",
      },
    },
  },
  plugins: [],
};
