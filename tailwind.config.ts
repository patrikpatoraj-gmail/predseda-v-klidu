import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcdaff",
          300: "#8ec2ff",
          400: "#599fff",
          500: "#327bff",
          600: "#1a5cf5",
          700: "#1448dd",
          800: "#173db1",
          900: "#19388b",
          950: "#13245a",
        },
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5dae2",
          300: "#b0b9c8",
          400: "#8693a8",
          500: "#67748c",
          600: "#525c73",
          700: "#434b5d",
          800: "#3a414f",
          900: "#343944",
          950: "#22252d",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)",
        hover: "0 8px 24px rgba(16,24,40,0.08)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        ink: {
          css: {
            "--tw-prose-body": theme("colors.ink.800"),
            "--tw-prose-headings": theme("colors.ink.950"),
            "--tw-prose-lead": theme("colors.ink.700"),
            "--tw-prose-links": theme("colors.brand.600"),
            "--tw-prose-bold": theme("colors.ink.900"),
            "--tw-prose-counters": theme("colors.ink.500"),
            "--tw-prose-bullets": theme("colors.ink.300"),
            "--tw-prose-hr": theme("colors.ink.200"),
            "--tw-prose-quotes": theme("colors.ink.900"),
            "--tw-prose-quote-borders": theme("colors.ink.200"),
            "--tw-prose-captions": theme("colors.ink.500"),
            "--tw-prose-code": theme("colors.ink.900"),
            "--tw-prose-pre-code": theme("colors.ink.100"),
            "--tw-prose-pre-bg": theme("colors.ink.900"),
            "--tw-prose-th-borders": theme("colors.ink.300"),
            "--tw-prose-td-borders": theme("colors.ink.200"),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
