import { Layout } from "@/components/Layout";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black-indigo text-font min-h-screen flex flex-col">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
