import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], theme: { extend: { colors: { ink: "#1d2926", moss: "#405548", cream: "#fbf7f0", clay: "#c66b34", gold: "#e39b43" }, boxShadow: { glow: "0 20px 60px rgba(78, 57, 36, .16)" } } }, plugins: [] };
export default config;
