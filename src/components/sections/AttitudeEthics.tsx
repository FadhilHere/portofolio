import { Scale, MessageSquare, Shield, Users } from "lucide-react";

export default function AttitudeEthics() {
  return (
    <section className="min-h-screen py-20 px-6 bg-[#0c0c0c] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-serif text-white">
            Attitude & <span className="text-accent italic">Ethics</span>
          </h2>
          <p className="text-gray-500 font-sans max-w-xl mx-auto text-lg">
            "Skills get you noticed. Character makes you trusted."
          </p>
        </div>

        {/* Transformation Story - Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all duration-300">
            <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Attitude Upgrade
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Dulu aku cenderung pasif, mikirnya "yang penting kerjaan kelar".
              Tapi di sini aku belajar kalau{" "}
              <span className="text-white italic">empathy</span> &{" "}
              <span className="text-white italic">proactive</span> itu game
              changer. Sekarang lebih "sat-set" tapi tetap sopan.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all duration-300">
            <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="text-accent" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              Etiquette in Action
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Simpel tapi ngena: Mengirim email atau chat pribadi ke dosen nggak
              cuma asal kirim attachment. Pake subjek yang jelas, salam pembuka,
              dan closing yang proper. Hal kecil gini yang ngebangun impresi
              kalau kita itu profesional.
            </p>
          </div>
        </div>

        {/* Dilemma Case Study - Interactive / Highlighted */}
        <div className="mt-12 bg-gradient-to-r from-accent/10 to-transparent p-1 rounded-2xl">
          <div className="bg-[#111] p-8 md:p-12 rounded-xl border border-white/10 flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 space-y-4">
              <div className="inline-flex items-center gap-2 text-accent bg-accent/10 px-3 py-1 rounded-full text-sm font-medium">
                <Shield size={16} />
                <span>Case Study</span>
              </div>
              <h3 className="text-3xl font-serif text-white">
                The Plagiarism Bug
              </h3>
              <p className="text-gray-500">
                Gimana cara handle konflik tanpa bikin "system crash" (drama)?
              </p>
            </div>

            <div className="md:w-2/3 space-y-6">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Situasi (The Bug)
                </h4>
                <p className="text-gray-400">
                  Dalam kerja kelompok, ada anggota yang ngerjain tugas
                  asal-asalan dan nggak sesuai standar yang sudah disepakati.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Tindakan (The Fix)
                </h4>
                <p className="text-gray-400">
                  Aku temui langsung atau chat secara private untuk ngobrol
                  baik-baik. Aku jelasin standar yang dipakai dan bantu ngerjain
                  bareng supaya hasilnya sesuai ekspektasi.
                  <br />
                  <span className="italic text-gray-500 text-sm mt-1 block">
                    Result: Kualitas kerja naik, standar terjaga, tim tetap
                    solid.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
