import { GitCommit, UploadCloud, Terminal } from "lucide-react";

export default function Reflection() {
  return (
    <section className="min-h-screen py-20 px-6 bg-black flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-4xl space-y-16 z-10">
        <div className="space-y-4">
          <span className="text-gray-500 font-sans tracking-[0.3em] uppercase flex items-center justify-center gap-2">
            <Terminal size={14} />
            System Log: End
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white">
            Final <span className="text-accent italic">Commit</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-white/5 p-8 rounded-2xl border border-white/10">
          <div className="space-y-4">
            <h4 className="text-gray-500 uppercase text-xs tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              v1.0 (Legacy Code)
            </h4>
            <p className="text-lg text-gray-400 font-serif italic leading-relaxed">
              "Dulu anggep kepribadian itu <b>hard-coded</b>. Introvert ya
              introvert, takut panggung ya nasib. <b>Fixed Mindset</b> bikin{" "}
              <b>stuck</b> di zona nyaman."
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-accent uppercase text-xs tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              v2.0 (Refactored)
            </h4>
            <p className="text-lg text-white font-serif leading-relaxed">
              "Ternyata, <b>soft-skill</b> itu kaya <b>framework</b> baru.
              Awalnya susah, tapi kalau dipelajari pola-nya (etiket, komunikasi,
              empati), kita bisa <b>evolve</b>. Sekarang siap buat <b>deploy</b>{" "}
              versi terbaik diriku ke masyarakat."
            </p>
          </div>
        </div>

        <div className="pt-8">
          <div className="inline-flex flex-col items-center p-8 border border-accent/30 bg-accent/5 rounded-2xl hover:bg-accent/10 transition-colors cursor-default">
            <GitCommit className="text-accent mb-4" size={32} />
            <h3 className="text-2xl font-serif text-white mb-4">
              Git Push --force "Success"
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              "Komitmen aku nggak berhenti di sini. Aku bakal terus{" "}
              <b>refactor </b>
              diri sendiri, <b>fix </b> bad habit, dan jadi <b>developer </b>
              yang berdampak nyata."
            </p>
          </div>
        </div>

        <div className="pt-20 text-gray-600 text-sm font-sans flex flex-col items-center gap-2">
          <UploadCloud size={16} />
          <p>
            © 2026 Fadhil. All Rights Reserved. <br />
            Personality Development Portfolio.
          </p>
        </div>
      </div>
    </section>
  );
}
