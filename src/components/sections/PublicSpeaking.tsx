import { Mic, Zap, TrendingUp, AlertTriangle } from "lucide-react";

export default function PublicSpeaking() {
  return (
    <section className="min-h-screen py-20 px-6 bg-black text-white relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-serif">
            Public Speaking <span className="text-accent italic">Journey</span>
          </h2>
          <p className="text-gray-500 text-lg">
            From{" "}
            <span className="line-through decoration-red-500/50">
              Runtime Errors
            </span>{" "}
            to Smooth Deployment
          </p>
        </div>

        {/* Comparison: Then vs Now */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Then Card */}
          <div className="bg-[#111] p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-red-500/20 group-hover:text-red-500/40 transition-colors">
              <AlertTriangle size={48} />
            </div>
            <div className="space-y-4 relative z-10">
              <h3 className="text-4xl font-serif text-gray-600">
                Beta Version
              </h3>
              <div className="h-0.5 w-12 bg-red-900/50" />
              <p className="text-gray-400 text-lg leading-relaxed">
                "Dulu aku gugup banget kalau harus ngobrol di depan orang,
                suaraku suka bergetar. Rasanya kayak{" "}
                <span className="text-red-400">High Latency</span>, otak sama
                mulut nggak sinkron."
              </p>
            </div>
          </div>

          {/* Now Card */}
          <div className="bg-[#111] p-8 rounded-2xl border border-accent/20 relative overflow-hidden group hover:bg-accent/5 transition-all duration-500">
            <div className="absolute top-4 right-4 text-accent/20 group-hover:text-accent/40 transition-colors">
              <Zap size={48} />
            </div>
            <div className="space-y-4 relative z-10">
              <h3 className="text-4xl font-serif text-accent">
                Stable Release
              </h3>
              <div className="h-0.5 w-12 bg-accent" />
              <p className="text-white text-lg leading-relaxed font-medium">
                "Sekarang setelah latihan, aku mulai pede. Udah bisa sambil
                lempar candaan ketika lagi ngobrol di depan publik.{" "}
                <span className="text-accent">Zero Jitter</span>, makin luwes."
              </p>
            </div>
          </div>
        </div>

        {/* Reflection Timeline-ish */}
        <div className="space-y-8">
          <h3 className="text-2xl font-serif mb-6 flex items-center gap-3">
            <TrendingUp className="text-accent" />
            Dev Logs (Refleksi)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-800 bg-[#0f0f0f] rounded-xl hover:border-accent/30 transition-colors">
              <h4 className="text-lg font-bold mb-3 text-white flex items-center gap-2">
                <span className="text-red-400">Bug Report:</span> Filler Words
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dulu sering banget keluar "umm", "ee" pas lagi *loading* mikir
                kata. Sekarang di-patch pake teknik <strong>Pausing</strong>.
                Diem bentar lebih berwibawa daripada gumam nggak jelas.
              </p>
            </div>

            <div className="p-6 border border-gray-800 bg-[#0f0f0f] rounded-xl hover:border-accent/30 transition-colors">
              <h4 className="text-lg font-bold mb-3 text-white flex items-center gap-2">
                <span className="text-green-400">New Feature:</span> Crowd
                Control
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sekarang lebih santai baca audiens. Kalau mulai bosen, aku
                lempar jokes atau tanya balik biar interaksi jalan terus dan
                nggak kaku.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
