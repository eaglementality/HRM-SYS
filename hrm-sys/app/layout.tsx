import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import schoolLogo from "../app/img/AbS-removebg-preview.png";
import { Dash_Navigation } from "./components/Dash_navigation";
import { Header } from "./components/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HRMs",
  description: "Human Resource Management System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex gap-[50%] w-full h-screen">
        <div className="px-2 py-2 fixed top-0 left-0 bottom-0 h-full w-[13%] rounded-lg shadow-lg">
          <div className="flex flex-col w-full items-center">
            <Image className="w-full" src={schoolLogo} alt="Accra Business" />
          </div>
          <Dash_Navigation />
        </div>

        <section className="shadow-lg fixed top-0 right-0 left-[13.5%] bottom-0">
          <Header />
          <div className="h-full w-full">{children}</div>
        </section>
      </body>
    </html>
  );
}