import { UploadCloud, Terminal } from "lucide-react";

export default function Reflection() {
  return (
    <section className="min-h-screen py-24 px-6 bg-transparent flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-20 z-10 w-full">

        {/* Top Section: Roadmap Title & Info & Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 space-y-6 text-left">
            <span className="text-gray-500 font-sans tracking-[0.3em] uppercase flex items-center gap-2 text-xs md:text-sm">
              <Terminal size={14} />
              Future Roadmap
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight">
              On next <span className="text-accent italic">5 years</span>
            </h2>
            <div className="space-y-4 text-base md:text-lg text-gray-300 font-sans leading-relaxed">
              <p>
                In the next five years, I am committed to deepening my expertise in artificial intelligence,
                emerging technologies, and data, with a strong focus on their applications in the oil and gas industry. I also aspire to pursue postgraduate studies abroad all the way to a Ph.D.,
                where I can further sharpen my specialization through advanced research and collaboration with leading experts.
              </p>
              <p className="text-accent italic font-semibold pt-2">
                I ask for your prayers for all my plans to go smoothly.
              </p>
            </div>
          </div>

          {/* SVG stack server / database visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-md group hover:border-accent/30 transition-all duration-300">
              <svg className="w-48 h-48 text-accent group-hover:scale-105 transition-transform duration-500" viewBox="0 0 100 100" fill="none">
                <ellipse cx="50" cy="25" rx="25" ry="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
                <path d="M25 25 V 40 C 25 45, 75 45, 75 40 V 25" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
                <ellipse cx="50" cy="40" rx="25" ry="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
                <path d="M25 40 V 55 C 25 60, 75 60, 75 55 V 40" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
                <ellipse cx="50" cy="55" rx="25" ry="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
                <path d="M25 55 V 70 C 25 75, 75 75, 75 70 V 55" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
                <ellipse cx="50" cy="70" rx="25" ry="8" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />

                {/* Data flow lines and dots */}
                <path d="M50 10 V 17" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx="50" cy="10" r="2" fill="currentColor" />
                <path d="M50 73 V 80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />

                {/* Side controls/signals */}
                <circle cx="85" cy="30" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="75" y1="30" x2="82" y2="30" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="85" cy="40" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" />
                <line x1="75" y1="40" x2="82" y2="40" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="85" cy="50" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="75" y1="50" x2="82" y2="50" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Section: 3-Column Quote Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              author: "Professor Michael Chui",
              institution: "McKinsey & Company",
              quote: "Technology and data are powerful tools that can be used for good or evil. It's important to use them responsibly and ethically."
            },
            {
              author: "Professor Michael Schrage",
              institution: "MIT Sloan School of Management",
              quote: "Technology and data are constantly evolving. It's important to stay ahead of the curve to avoid being left behind."
            },
            {
              author: "Professor Andrew Ng",
              institution: "Stanford University",
              quote: "Technology and data can be used to solve complex problems. It's important to think creatively and innovatively to find new ways to use technology and data."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent/40 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <p className="text-sm text-gray-300 font-sans leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 space-y-1">
                <h4 className="text-base font-serif font-bold text-white group-hover:text-accent transition-colors">
                  {item.author}
                </h4>
                <p className="text-xs text-gray-500 font-sans tracking-wide">
                  {item.institution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-12 text-center text-gray-600 text-sm font-sans flex flex-col items-center gap-2 border-t border-white/5">
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
