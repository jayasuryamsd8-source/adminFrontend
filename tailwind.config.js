/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      /* ===============================
         COLOR SYSTEM (Enterprise SaaS)
         =============================== */
      colors: {
        /* App surfaces */
        background: "#f8fafc",     // slate-50
        surface: "#ffffff",
        border: "#e4e4e7",         // zinc-200

        /* Text */
        textPrimary: "#09090b",    // zinc-950
        textSecondary: "#52525b",  // zinc-600
        textMuted: "#71717a",      // zinc-500

        /* Brand (matches your company header style) */
        brand: {
          DEFAULT: "#06b6d4",      // cyan-500 (COLOR DREAMS style)
          hover: "#0891b2",        // cyan-600
          subtle: "#cffafe",      // cyan-100
        },

        /* Status colors (calm & professional) */
        status: {
          new: "#6366f1",          // indigo-500
          reviewing: "#0ea5e9",    // sky-500
          shortlisted: "#22c55e",  // green-500
          rejected: "#ef4444",     // red-500
          hired: "#16a34a",        // green-600
        },
      },

      /* ===============================
         SHADOWS (Soft SaaS Style)
         =============================== */
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05)",
        cardHover: "0 8px 24px rgba(0,0,0,0.08)",
        focus: "0 0 0 3px rgba(6,182,212,0.4)", // brand focus
      },

      /* ===============================
         RADIUS (Modern UI)
         =============================== */
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },

      /* ===============================
         TYPOGRAPHY SCALE
         =============================== */
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      },

      /* ===============================
         ANIMATION (SUBTLE ONLY)
         =============================== */
      transitionTimingFunction: {
        soft: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
