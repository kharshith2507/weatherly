import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weatherly — Live Weather",
  description: "Premium real-time weather forecasts with hourly and 7-day predictions.",
  keywords: ["weather", "forecast", "temperature", "humidity", "wind"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
