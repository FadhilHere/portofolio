"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 px-6 md:px-12 backdrop-blur-md bg-black/50 border-b border-white/10 transition-colors">
      {/* Avatar / Logo Area */}
      <div className="flex items-center gap-3"></div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
        {[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
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

      {/* Right Side: Call to Action (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <a
          href="mailto:fadhilmain29@gmail.com"
          className="px-6 py-2 rounded-full bg-white text-black font-medium text-sm hover:bg-accent hover:text-black transition-colors"
        >
          Hire Me!
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white p-2"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-2 duration-200">
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Projects", href: "/projects" },
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={toggleMenu} // Close menu on click
                className={`py-3 text-lg font-medium border-b border-white/5 ${
                  isActive ? "text-accent" : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <a
            href="mailto:fadhilmain29@gmail.com"
            className="mt-4 w-full py-3 rounded-xl bg-white text-black font-bold text-center hover:bg-accent transition-colors"
          >
            Hire Me!
          </a>
        </div>
      )}
    </nav>
  );
}
