import Navbar from "@/components/layout/Navbar";
import { FileText, Calendar, MapPin, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-accent selection:text-black">
      <Navbar />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Section: Biography / About Intro */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif">
              About <span className="text-accent italic">Me</span>
            </h1>
            <div className="text-gray-300 font-sans text-lg leading-relaxed space-y-4 max-w-3xl">
              <p>
                Hi! I am <b>Fadhil</b>, a Fresh Graduate in Information Systems from Politeknik Caltex Riau.
                I have a strong passion for Software Engineering, Artificial Intelligence, emerging technologies, and Data Intelligence.
                My focus centers on constructing clean, production-grade applications and designing intelligent database architectures.
              </p>
              <p>
                Throughout my academic journey, I have had the privilege to work with various enterprise frameworks such as ASP.NET Core and also another framework like MERN stack, Laravel, etc.
                Allowing me to deeply explore software design patterns, Clean Architecture, and efficient data processing workflows.
              </p>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Section: Internship Experience (LinkedIn Style Layout) */}
          <div className="space-y-10 text-left">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-white flex items-center gap-2">
                <Briefcase className="text-accent w-6 h-6 shrink-0" />
                Internship Experience
              </h2>
              <p className="text-gray-500 text-sm font-sans">
                Professional experience acquired during corporate internship initiatives.
              </p>
            </div>

            {/* Experience Item 1: Pertamina */}
            <div className="space-y-4 pt-4 border-l-2 border-white/10 pl-6 relative ml-1">
              {/* Timeline dot */}
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent" />

              <div className="space-y-2">
                {/* Job Title / Role */}
                <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                  Programmer
                </h3>

                {/* Company Name & Employment Type */}
                <p className="text-base text-gray-300 font-sans font-semibold">
                  PT Kilang Pertamina Internasional · Internship
                </p>

                {/* Date range & Duration / Location info */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    Oct 2024 - Jan 2025 · 4 mos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    Kota Dumai, Riau, Indonesia · On-site
                  </span>
                </div>
              </div>

              {/* Description Paragraph */}
              <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-3xl">
                During my internship, I worked with ASP.NET Core 8 and utilized the company's proprietary Pertamina Solution Template.
                Through this experience, I gained valuable insights into clean code architecture and its application in real-world projects.
                I contributed to the development of a project named Sistem Informasi Mahasiswa Magang IT (IT Internship Student Information System),
                a platform designed to record and manage data related to IT internship students. Additionally, I explored and learned about
                various technologies implemented at PT Kilang Pertamina Internasional.
              </p>


              {/* Skills Tags */}
              <div className="pt-3">
                <p className="text-xs text-gray-500 font-semibold mb-2">Skills acquired:</p>
                <div className="flex flex-wrap gap-2">
                  {["ASP.NET Core 8", "Clean Architecture", "Web Engineering", "Software Infrastructure", "Database Management"].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-xs text-gray-300 hover:border-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Item 2: Assist.id */}
            <div className="space-y-4 pt-8 border-l-2 border-white/10 pl-6 relative ml-1">
              {/* Timeline dot */}
              <div className="absolute -left-[7px] top-[22px] w-3 h-3 rounded-full bg-accent" />

              <div className="space-y-2">
                {/* Job Title / Role */}
                <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                  Back End Developer
                </h3>

                {/* Company Name & Employment Type */}
                <p className="text-base text-gray-300 font-sans font-semibold">
                  Assist.id · Internship
                </p>

                {/* Date range & Duration / Location info */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    Jul 2021 - Nov 2021 · 5 mos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    Pekanbaru, Riau, Indonesia · On-site
                  </span>
                </div>
              </div>

              {/* Description Paragraph */}
              <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-3xl">
                In this internship program, I contributed to maintaining the official website of Assist.id
                and was given the task of creating an API to be used in the mobile application in the future.
              </p>

              {/* Skills Tags */}
              <div className="pt-3">
                <p className="text-xs text-gray-500 font-semibold mb-2">Skills acquired:</p>
                <div className="flex flex-wrap gap-2">
                  {["API Development", "Backend Engineering", "Database Design", "Node.js", "Web Maintenance"].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-xs text-gray-300 hover:border-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
