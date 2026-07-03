export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#120806] py-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center text-white/60">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">
          Warda Shamya
        </h3>

        <p>جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
