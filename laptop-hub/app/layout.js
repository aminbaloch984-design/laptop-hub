import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://laptophub.pk"),
  title: {
    default: "LaptopHub — Premium Laptop Store in Pakistan",
    template: "%s | LaptopHub",
  },
  description:
    "Shop genuine gaming, business, student and creator laptops in Pakistan. Official warranty, nationwide delivery and expert advice at LaptopHub.",
  keywords: [
    "laptops in Pakistan",
    "gaming laptop Pakistan",
    "MacBook Pakistan",
    "buy laptop Karachi",
    "LaptopHub",
  ],
  openGraph: {
    title: "LaptopHub — Premium Laptop Store in Pakistan",
    description:
      "Genuine laptops with official warranty, nationwide delivery and expert advice.",
    type: "website",
    locale: "en_PK",
  },
};

export const viewport = {
  themeColor: "#111827",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col bg-surface text-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <CartProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
