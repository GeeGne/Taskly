import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        heading: "var(--font-heading-color)",
        'heading-invert': "var(--font-heading-invert-color)",
        body: "var(--font-body-color)",
        'body-invert': "var(--font-body-invert-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",  
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    function ( api: PluginAPI ) {
      api.addUtilities({
        ".clipPath-half-top": {
          clipPath: "inset(0 0 50% 0 )",
        },
        ".WireStyle-drop-shadow": {
          filter: "drop-shadow(0px 10px 4px black)"
        }
      })
    }
  ],
};
export default config;
