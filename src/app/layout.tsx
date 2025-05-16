import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xtra Pay Dashboard",
  description: "Welcome to Xtra Pay Dashboard",
  openGraph: {
    title: "Xtra Pay Dashboard",
    description: "Welcome to Xtra Pay Dashboard",
    siteName: "Xtra Pay Dashboard",
    type: "website"
  }
};

const slab = Inter({ subsets: ["latin"], weight: [   "300" , "400" , "500" , "700"  ] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7019923117691538"
      crossOrigin="anonymous"></script>
      <meta name="google-adsense-account" content="ca-pub-7019923117691538"></meta>
      <body
        className={`${slab.className} antialiased bg-gray-100`}
      >
        <Suspense>
          {children}
        </Suspense>

        
        <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                className: ' toast',
                 
                 success: {
                  style: {
                    
                  },
                },
              }}
              />
      </body>
    </html>
  );
}
