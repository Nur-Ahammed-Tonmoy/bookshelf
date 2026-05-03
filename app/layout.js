import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Bookshelf — Online Book Borrowing Platform",
  description:
    "Explore, discover, and borrow books digitally from our vast collection. A modern library experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#f8f5f0]">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#1a2744",
              color: "#f8f5f0",
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
            },
            success: { iconTheme: { primary: "#c9a84c", secondary: "#1a2744" } },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
