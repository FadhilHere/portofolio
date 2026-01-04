"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 px-6 md:px-12 backdrop-blur-md bg-black/50 border-b border-white/10 transition-colors">
      {/* Avatar / Logo Area */}
      <div className="flex items-center gap-3"></div>

      {/* Navigation Links - Centered */}
      <div className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
        {[
          { name: "Home", href: "/" },
          { name: "About", href: "/#" },
          { name: "Projects", href: "/projects" },
        ].map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-white text-black hover:bg-white/90"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Right Side: Call to Action */}
      <div className="flex items-center gap-4">
        <a
          href="mailto:fadhilmain29@gmail.com"
          className="hidden md:inline-block px-6 py-2 rounded-full bg-white text-black font-medium text-sm hover:bg-accent hover:text-black transition-colors"
        >
          Hire Me!
        </a>
      </div>
    </nav>
  );
}
