import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { CartProvider } from "@/hooks/use-cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nebula Pets | Exotic Fish & Amphibians",
  description: "Your premier online destination for exotic fish, amphibians, and aquatic supplies. Ethically sourced, expertly delivered.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen nebula-gradient`}>
        <CartProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
