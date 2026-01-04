import {
  Target,
  Flag,
  Calendar,
  CheckCircle,
  TrendingUp,
  BookOpen,
  Dumbbell,
  Wallet,
  Share2,
} from "lucide-react";

export default function GoalSetting() {
  return (
    <section className="min-h-screen py-20 px-6 bg-[#0a0a0a] relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-6xl font-serif text-white uppercase leading-none">
              Master <br /> <span className="text-accent">Plan</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Bukan sekadar <b>wishlist</b>, tapi <b>roadmap</b> yang terukur.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-12">
            {/* Short Term */}
            <div>
              <h3 className="text-2xl font-sans font-bold text-accent mb-6 uppercase tracking-wider flex items-center gap-2">
                <Flag className="text-accent" />
                Sprint Goals (Short Term)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Lulus dengan IPK Cumlaude",
                  "Start Career di Data/Programming",
                  "Publish Jurnal Terindeks Scopus",
                ].map((goal, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-accent/50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                      <Target size={16} />
                    </div>
                    <span className="text-gray-300 font-medium">{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Long Term */}
            <div>
              <h3 className="text-2xl font-sans font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="text-white" />
                The Roadmap (Long Term)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Sertifikasi Skill Profesional",
                  "S2 Finance / Oil & Gas",
                  "Career Level Up (Naik Pangkat)",
                  "Financial Safety Net (Tabungan Aman)",
                ].map((goal, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                    <span className="text-gray-300">{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Habits - Daily Quests */}
            <div className="bg-gradient-to-r from-accent/10 to-transparent p-8 rounded-2xl border border-accent/20">
              <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
                <TrendingUp className="text-accent" />
                Daily Quests (Kebiasaan)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Read Books", icon: BookOpen },
                  { name: "Workout", icon: Dumbbell },
                  { name: "Investing", icon: Wallet },
                  { name: "Branding (X/LinkedIn)", icon: Share2 },
                ].map((habit, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-xl border border-white/5 hover:border-accent/50 transition-all gap-2 text-center"
                  >
                    <habit.icon size={20} className="text-accent" />
                    <span className="text-sm text-gray-300 font-medium">
                      {habit.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
