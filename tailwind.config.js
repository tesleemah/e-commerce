import { beginAsyncEvent } from 'react-native/Libraries/Performance/Systrace';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./App.tsx" 
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: 
    {
     colors:{
      dark:{
      bg: "#0a0f1e",
      surface : "#0d1526",
      input:  "#0f1629",
      border: "#1e2d4a",
      hover: "#162040"
      },
      brand:{
        DEFAULT: "#2563EB",
        bright:  "#3B82F6",
        light: "#60a5fa",
        muted: "#1d3a6e",
        tint: "#172554"

      }
     }
    },
  },
  plugins: ["nativewind/babel"],
  darkMode: "class"
}

