import Navbar from "@/components/layout/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 px-6 bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif mb-6">About Me</h1>
        <p className="text-gray-400 text-lg">
          [Dummy Content] Halaman About - Cerita lebih dalam tentang perjalanan,
          values, dan latar belakang.
        </p>
      </div>
    </main>
  );
}
