import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import {Metadata} from "next";
import Head from "next/head";



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
    <html lang="en">
    <Head>
      <script defer src="https://us.umami.is/script.js" data-website-id="d049a9db-d66c-4e55-86ea-2971d1173830"></script>
    </Head>
    <body className={inter.className}>{children}</body>
    </html>
  );
}
