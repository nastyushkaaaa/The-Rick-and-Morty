"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "react-query";
import queryClient from "@/app/lib/utils/QueryClient";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient()}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
