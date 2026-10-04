import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Relaxa | Heated Back & Neck Massager", description: "Soothing heat and deep kneading massage, delivered with cash on delivery in Nepal." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
