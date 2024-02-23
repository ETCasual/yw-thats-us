import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        eng: ["eng", "sans-serif"],
        chi: ["chi", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
