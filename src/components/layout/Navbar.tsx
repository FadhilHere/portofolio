"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 px-6 md:px-12 backdrop-blur-md bg-black/50 border-b border-white/10 transition-colors">
      {/* Avatar / Logo Area */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden border border-gray-700 block relative hover:border-accent transition-colors"
        >
          {/* Placeholder for Avatar Image */}
          <div className="w-full h-full bg-gray-900 flex items-center justify-center text-xs text-gray-400">
            IMG
          </div>
        </Link>
      </div>

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

      {/* Right Side: Empty for now or Call to Action */}
      <div className="flex items-center gap-4"></div>
    </nav>
  );
}
