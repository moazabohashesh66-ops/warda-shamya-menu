import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وردة شامية",
  description: "مطعم وردة شامية - المنيو الإلكتروني",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#1a0e0a] text-white overflow-x-hidden">
        {children}

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/201013839628"
          target="_blank"
          rel="noopener noreferrer"
          className="
            fixed
            bottom-6
            right-6
            z-50
            w-16
            h-16
            rounded-full
            bg-green-500
            flex
            items-center
            justify-center
            text-3xl
            shadow-2xl
            hover:scale-110
            hover:bg-green-600
            transition-all
            duration-300
          "
        >
          💬
        </a>
      </body>
    </html>
  );
}