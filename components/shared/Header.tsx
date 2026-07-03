export default function Hero() {
  return (
    <section className="text-center py-16 px-4">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">
        Welcome to Warda Shamya
      </h1>

      {/* Subtitle */}
      <p className="text-white/60 mt-4 text-lg">
        Experience the best Syrian cuisine in a modern digital menu
      </p>

      {/* Button */}
      <button className="mt-8 px-6 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition">
        Explore Menu
      </button>

    </section>
  );
}
