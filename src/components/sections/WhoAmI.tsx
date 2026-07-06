import { Globe, Users, Briefcase, GitCommit } from "lucide-react";

async function getGithubCommitCount() {
  try {
    const res = await fetch("https://api.github.com/search/commits?q=author:FadhilHere", {
      headers: {
        "User-Agent": "FadhilHere-Portfolio",
        "Accept": "application/vnd.github+json"
      },
      next: { revalidate: 3600 } // cache for 1 hour
    });
    if (!res.ok) throw new Error("Github fetch failed");
    const data = await res.json();
    return data.total_count || 449;
  } catch (error) {
    return 449; // fallback count
  }
}

export default async function WhoAmI() {
  const commitCount = await getGithubCommitCount();

  return (
    <section className="py-12 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Dashboard Grid (4 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: Projects Deployed */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/40 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[130px]">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-medium">
                Projects Deployed
              </span>
              <Globe className="text-emerald-500 w-5 h-5 shrink-0" />
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white group-hover:text-emerald-400 transition-colors mt-4">
              3 Live
            </h3>
          </div>

          {/* Card 2: Active Users */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-400/40 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[130px]">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-medium">
                Users
              </span>
              <Users className="text-blue-400 w-5 h-5 shrink-0" />
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white group-hover:text-blue-400 transition-colors mt-4">
              300++
            </h3>
          </div>

          {/* Card 3: Internships Taken */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/40 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[130px]">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-medium">
                Internships Taken
              </span>
              <Briefcase className="text-amber-400 w-5 h-5 shrink-0" />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors mt-4">
              2 Places
            </h3>
          </div>

          {/* Card 4: GitHub Commits */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-400/40 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[130px]">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-medium">
                GitHub Commits
              </span>
              <GitCommit className="text-violet-400 w-5 h-5 shrink-0" />
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white group-hover:text-violet-400 transition-colors mt-4">
              {commitCount}
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
}
