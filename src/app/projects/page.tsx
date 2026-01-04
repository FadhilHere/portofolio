"use client";

import Navbar from "@/components/layout/Navbar";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  image: string; // In a real app, this would be a static import or url
  links: {
    github?: string;
    demo?: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Expo Technopreneurship",
    category: "Web Development",
    description:
      "A web-based platform designed to showcase tenants, products, and event information for a technopreneurship expo.",
    techStack: ["Laravel", "Vue JS", "Shadcn", "Tailwind CSS", "MySQL"],
    image: "/porto_1_fix.png", // Placeholder
    links: {
      github: "https://github.com/FadhilHere/expo_techno",
      demo: "https://techno.si.pcr.ac.id/",
    },
  },
  {
    id: 2,
    title: "Logbook JTI",
    category: "Web Development",
    description:
      "A web-based logbook system developed as a semester project and implemented by the campus for JTI students.",
    techStack: ["Laravel", "MySQL"],
    image: "/porto_2_fix.png", // Placeholder
    links: {
      github: "https://github.com/FadhilHere/LogbookJTI",
      demo: "https://logbookjti.policaltex.id/",
    },
  },
  {
    id: 3,
    title: "Kazantaru Company Profile",
    category: "Web Development",
    description:
      "A company profile website designed to present Kazantaru’s identity, services, and portfolio.",
    techStack: ["Next Js", "Tailwind CSS", "TypeScript"],
    image: "/porto_3_fix.png", // Placeholder
    links: {
      github: "https://github.com/FadhilHere/kazantaru-company-profile",
    },
  },
  {
    id: 4,
    title: "Sentimen Analisis Danantara on X platform",
    category: "Data Science",
    description:
      "A data science project analyzing public sentiment toward Danantara on X, deployed as an interactive Streamlit app.",
    techStack: [
      "Streamlit",
      "Python",
      "SVM",
      "Naive Bayes",
      "Crawling",
      "Scraping",
    ],
    image: "/porto_4_fix.png", // Placeholder
    links: {
      github: "https://github.com/FadhilHere/sentimen-analisis-danantara-X",
      demo: "https://sentimen-danantara-kel2.streamlit.app/",
    },
  },
  {
    id: 5,
    title: "Website CRM Solaria",
    category: "Web Development",
    description:
      "A CRM website developed as a semester project case study for managing customer data at Solaria.",
    techStack: ["CRM", "Laravel", "MySQL", "Bootstrap"],
    image: "/porto_5_fix.png", // Placeholder
    links: {
      github: "https://github.com/FadhilHere/CRM-Solaria",
    },
  },
  {
    id: 6,
    title: "Fast Food Classification",
    category: "Data Mining",
    description:
      "A data mining project for fast food classification using Kaggle datasets, implemented as a web application.",
    techStack: [
      "Data Mining",
      "Kaggle",
      "Python",
      "React JS",
      "Tailwind CSS",
      "ngrok",
    ],
    image: "/porto_6_fix.png", // Placeholder
    links: { github: "https://github.com/FadhilHere/food-classification" },
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-accent selection:text-black">
      <Navbar />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif">
              Selected <span className="text-accent italic">Works</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              A collection of projects showcasing my journey in code, design,
              and problem-solving.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="group bg-[#111] rounded-2xl border border-white/10 overflow-hidden hover:border-accent/50 transition-all duration-300 flex flex-col"
              >
                {/* Image (Upper Half) */}
                <div className="aspect-video bg-gray-800/50 relative overflow-hidden">
                  {/* Use Next.js Image if image path is valid/exists. 
                                 For now we render it for all, assuming dummy paths or valid ones. 
                                 If the path starts with '/', it is treated as a public asset.
                             */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10" />
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Header: Title & Icons */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs text-gray-500 uppercase tracking-wider mt-1 block">
                        {project.category}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      {project.links.github && (
                        <Link
                          href={project.links.github}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Github size={20} />
                        </Link>
                      )}
                      {project.links.demo && (
                        <Link
                          href={project.links.demo}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <ExternalLink size={20} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 rounded-md text-xs text-gray-300 border border-white/5 group-hover:border-white/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
