import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";

export const metadata = {
  manifest: "/manifest.json"
};

export const viewport = {
  themeColor: "#0f172a"
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
