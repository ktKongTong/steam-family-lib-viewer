import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import {Metadata} from "next";
import {Toaster} from "@/components/ui/toaster";
import QueryProvider from "@/components/providers/QueryClient";



export const metadata: Metadata = {
  title: "Steam 赛博家庭库存查看器",
  description: "一个查看Steam家庭共享库存的小玩具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
      <head>
        <script defer src="https://us.umami.is/script.js"
                data-website-id="950a9fe2-f18d-48f8-8c6c-1504c0f8aa0a"></script>
      </head>
      <body className={inter.className}>{children}</body>
      <Toaster/>
      </html>
    </QueryProvider>

)
  ;
}
