"use client";

import { useState } from "react";
import QRCode from "qrcode.react";

export default function QRPage() {
  const [url, setUrl] = useState("https://warda-shamya-menu.vercel.app");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold text-[#2E1A12] mb-6">
          🌹 QR Code للمنيو
        </h1>

        <div className="mb-6">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center"
            placeholder="رابط المنيو"
          />
        </div>

        <div className="bg-white p-4 rounded-lg inline-block">
          <QRCode value={url} size={200} level="H" />
        </div>

        <p className="text-sm text-gray-500 mt-4">
          امسح الكود لفتح المنيو
        </p>

        <button
          onClick={() => {
            const canvas = document.querySelector("canvas");
            if (canvas) {
              const link = document.createElement("a");
              link.download = "qr-menu.png";
              link.href = canvas.toDataURL();
              link.click();
            }
          }}
          className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition"
        >
          ⬇️ تحميل QR Code
        </button>
      </div>
    </div>
  );
}