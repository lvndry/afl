import typography from "@tailwindcss/typography";
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  prefix: "",
  safelist: [
    "lg:col-span-4",
    "lg:col-span-6",
    "lg:col-span-8",
    "lg:col-span-12",
    "border-border",
    "bg-card",
    "border-error",
    "bg-error/30",
    "border-success",
    "bg-success/30",
    "border-warning",
    "bg-warning/30",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        "2xl": "2rem",
        DEFAULT: "1rem",
        lg: "2rem",
        md: "2rem",
        sm: "1rem",
        xl: "2rem",
      },
      screens: {
        "2xl": "86rem",
        lg: "64rem",
        md: "48rem",
        sm: "40rem",
        xl: "80rem",
      },
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        "page-background": "hsl(var(--page-background))",
        border: "hsla(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        input: "hsl(var(--input))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        ring: "hsl(var(--ring))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: "hsl(var(--success))",
        error: "hsl(var(--error))",
        warning: "hsl(var(--warning))",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
        sans: ["var(--font-geist-sans)"],
      },
      fontSize: {
        display: ["4rem", { lineHeight: "1.1", fontWeight: "700" }], // 64px - Hero titles
        hero: ["3rem", { lineHeight: "1.2", fontWeight: "600" }], // 48px - Section titles
        title: ["2rem", { lineHeight: "1.3", fontWeight: "600" }], // 32px - Article titles
        subtitle: ["1.5rem", { lineHeight: "1.4", fontWeight: "500" }], // 24px - Subtitles
        body: ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }], // 18px - Body text
        caption: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }], // 14px - Captions
        small: ["0.75rem", { lineHeight: "1.4", fontWeight: "400" }], // 12px - Small text
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-lead": "hsl(var(--muted-foreground))",
            "--tw-prose-links": "hsl(var(--accent))",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-counters": "hsl(var(--muted-foreground))",
            "--tw-prose-bullets": "hsl(var(--muted-foreground))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-quotes": "hsl(var(--foreground))",
            "--tw-prose-quote-borders": "hsl(var(--border))",
            "--tw-prose-captions": "hsl(var(--muted-foreground))",
            "--tw-prose-code": "hsl(var(--foreground))",
            "--tw-prose-pre-code": "hsl(var(--muted-foreground))",
            "--tw-prose-pre-bg": "hsl(var(--muted))",
            "--tw-prose-th-borders": "hsl(var(--border))",
            "--tw-prose-td-borders": "hsl(var(--border))",
            maxWidth: "none",
            h1: {
              fontSize: "2.5rem",
              fontWeight: "700",
              lineHeight: "1.1",
              marginBottom: "1rem",
            },
            h2: {
              fontSize: "1.875rem",
              fontWeight: "600",
              lineHeight: "1.2",
              marginBottom: "0.75rem",
            },
            h3: {
              fontSize: "1.5rem",
              fontWeight: "600",
              lineHeight: "1.3",
              marginBottom: "0.5rem",
            },
            p: {
              fontSize: "1.125rem",
              lineHeight: "1.7",
              marginBottom: "1rem",
            },
            a: {
              color: "hsl(var(--accent))",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            strong: {
              fontWeight: "600",
            },
            blockquote: {
              borderLeftColor: "hsl(var(--accent))",
              borderLeftWidth: "4px",
              paddingLeft: "1rem",
              fontStyle: "italic",
              color: "hsl(var(--muted-foreground))",
            },
          },
        },
        lg: {
          css: {
            h1: {
              fontSize: "3rem",
            },
            h2: {
              fontSize: "2.25rem",
            },
            h3: {
              fontSize: "1.875rem",
            },
            p: {
              fontSize: "1.125rem",
            },
          },
        },
      }),
    },
  },
};

export default config;
