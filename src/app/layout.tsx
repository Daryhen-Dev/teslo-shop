import { geistMono, geistSans } from "@/confg/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teslo | Shop",
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans} ${geistMono} antialiased`}>
        {children}
      </body>
    </html>
  );
}
