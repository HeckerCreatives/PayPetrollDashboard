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
  title: "XtraPay Dashboard",
  description: "PayPetroll Dashboard",
};

const slab = Inter({ subsets: ["latin"], weight: [   "300" , "400" , "500" , "700"  ] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
