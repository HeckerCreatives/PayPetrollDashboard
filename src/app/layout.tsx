import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Xtra Pay Dashboard",
  description: "Welcome to Xtra Pay Dashboard",
};

const slab = Inter({ subsets: ["latin"], weight: [   "300" , "400" , "500" , "700"  ] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <title>Xtra Pay Dashboard</title>
        <meta name="description" content="Welcome to Xtra Pay Dashboard" />
        <meta property="og:title" content="Xtra Pay Dashboard" />
        <meta property="og:description" content="Welcome to Xtra Pay Dashboard" />
        <meta property="og:type" content="website" />
      </head>
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
