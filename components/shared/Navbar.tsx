"use client";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-yellow-400 font-bold text-xl">
          وردة شامية
        </h1>

        <div className="text-white/70 text-sm">
          QR Menu System
        </div>
      </div>
    </header>
  );
}