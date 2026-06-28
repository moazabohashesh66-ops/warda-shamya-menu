import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "وردة شامية",
  description: "Syrian Restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">

      <body>

        <Header />

        {children}

      </body>

    </html>
  );
}