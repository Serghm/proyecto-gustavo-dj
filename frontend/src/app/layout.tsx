import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gustavodelgadillo.com"),// cambiar al dominio real
  title: "Gustavo Delgadillo | DJ Versátil y Fabricación de Cabinas",
  description: "Servicios de DJ profesional para bodas, XV años y eventos corporativos. Fabricación y venta de cabinas y mobiliario premium para DJs con envíos a todo México.",
  keywords: [
    "DJ Gustavo Delgadillo", 
    "DJ para bodas", 
    "Cabinas DJ", 
    "Muebles para DJ", 
    "DJ versátil", 
    "Equipo para DJ", 
    "Eventos corporativos",
    "DJ Guadalajara",
    "Mobiliario DJ"
  ],
  authors: [{ name: "Ingeniería de Software" }],
  openGraph: {
    title: "Gustavo Delgadillo | DJ Profesional & Cabinas Premium",
    description: "Lleva tu evento al siguiente nivel con el mejor ambiente, o mejora tu setup con nuestras cabinas de diseño propio.",
    siteName: "Gustavo Delgadillo DJ",
    images: [
      {
        url: "/logo.jpg", 
        width: 800,
        height: 600,
        alt: "Logo Gustavo Delgadillo"
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}