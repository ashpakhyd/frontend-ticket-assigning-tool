import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Script from "next/script";

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
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Store Admin" />
        <link rel="apple-touch-icon" href="/icons/admin.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('SW registered'))
                .catch(() => console.log('SW registration failed'));
            }
          `}
        </Script>
      </body>
    </html>
  );
}
