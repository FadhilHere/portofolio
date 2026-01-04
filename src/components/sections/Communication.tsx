import { Wifi, Radio, MessageCircle } from "lucide-react";

export default function Communication() {
  return (
    <section className="min-h-screen py-20 px-6 bg-[#0a0a0a] flex items-center relative overflow-hidden">
      {/* Decor Background */}
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-accent text-sm uppercase tracking-widest font-sans">
            <Wifi size={18} className="animate-pulse" />
            <span>Connection Protocol</span>
          </div>
          <h2 className="text-5xl font-serif text-white leading-tight">
            Debugging <br />{" "}
            <span className="text-accent italic">Communication</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Komunikasi itu <span className="text-white">dua arah</span>. Bukan
            cuma soal ngomong, tapi juga mau dengerin, biar pesan yang disampein
            nggak salah tangkap.
          </p>

          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-serif text-white flex items-center gap-2">
              <Radio size={24} className="text-accent" />
              Signal Strength
            </h3>
            <div className="space-y-4">
              <div className="p-5 border-l-2 border-red-500 bg-red-900/5 hover:bg-red-900/10 transition-colors rounded-r-xl">
                <h4 className="text-red-400 font-bold text-sm uppercase mb-2 flex justify-between">
                  Issue: Packet Loss
                  <span className="text-xs opacity-70">High Latency</span>
                </h4>
                <p className="text-gray-400 text-sm">
                  "Dulu sering mikir kaya orang lain paham apa yang ada di
                  kepala aku tanpa konteks yang jelas. Result-nya? Miskom."
                </p>
              </div>
              <div className="p-5 border-l-2 border-green-500 bg-green-900/5 hover:bg-green-900/10 transition-colors rounded-r-xl">
                <h4 className="text-green-400 font-bold text-sm uppercase mb-2 flex justify-between">
                  Fix: Clear Communication
                  <span className="text-xs opacity-70">Connected</span>
                </h4>
                <p className="text-gray-400 text-sm">
                  "Sekarang aku biasain buat dengerin dulu, pahami konteksnya,
                  baru respon. Kalau perlu, aku ulangin lagi buat make sure kita
                  satu pemahaman sebelum lanjut ke eksekusi."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Bubble / Conversation Visual - Modern Messenger Style */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl -z-10" />

          <div className="flex flex-col gap-4 font-sans text-sm md:text-base">
            {/* Incoming Msg */}
            <div className="self-start max-w-[85%]">
              <div className="bg-[#222] p-4 rounded-2xl rounded-tl-sm border border-white/5 shadow-lg">
                <p className="text-gray-300">
                  "Kalau ngobrol sama orang baru, biasanya kamu ngapain? Ngerasa
                  canggung nggak?"
                </p>
              </div>
              <span className="text-xs text-gray-600 ml-2 mt-1 display-block">
                Incoming • 10:00 AM
              </span>
            </div>

            {/* Outgoing Msg */}
            <div className="self-end max-w-[85%]">
              <div className="bg-accent text-black p-4 rounded-2xl rounded-tr-sm shadow-lg shadow-accent/10">
                <p className="font-medium">
                  "Awalnya pasti agak canggung sih. Tapi aku coba santai aja."
                </p>
              </div>
              <span className="text-xs text-gray-600 mr-2 mt-1 display-block text-right">
                Read • 10:02 AM
              </span>
            </div>

            {/* Incoming Msg */}
            <div className="self-start max-w-[85%]">
              <div className="bg-[#222] p-4 rounded-2xl rounded-tl-sm border border-white/5 shadow-lg">
                <p className="text-gray-300">
                  "Terus biar obrolannya jalan gimana?"
                </p>
              </div>
              <span className="text-xs text-gray-600 ml-2 mt-1 display-block">
                Incoming • 10:03 AM
              </span>
            </div>

            {/* Outgoing Msg */}
            <div className="self-end max-w-[85%]">
              <div className="bg-accent text-black p-4 rounded-2xl rounded-tr-sm shadow-lg shadow-accent/10">
                <p className="font-medium">
                  "Aku fokus dengerin dan pahamin apa yang dia ceritain. Dari
                  situ biasanya obrolannya nyambung sendiri. "Listening is a
                  superpower bro."
                </p>
              </div>
              <div className="flex justify-end items-center gap-1 mr-2 mt-1">
                <MessageCircle size={12} className="text-accent" />
                <span className="text-xs text-gray-600">Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
