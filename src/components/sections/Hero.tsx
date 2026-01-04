"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Github, Linkedin, Instagram, Twitter, Mail } from "lucide-react";

const TYPING_SPEED = 50;
const DELETING_SPEED = 30;
const PAUSE_DURATION = 2000;

const PHRASES = [
  "Translating complexity into solutions.",
  "Part-time learner.",
  "Full-time teaching AI common sense.",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(TYPING_SPEED);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % PHRASES.length;
      const fullText = PHRASES[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? DELETING_SPEED : TYPING_SPEED);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section
      id="about"
      className="relative h-screen flex flex-col justify-center px-6 overflow-hidden bg-background"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <div className="space-y-6 order-2 lg:order-1 z-10">
          {/* Social / Contact Links (Top) */}
          <div className="flex items-center gap-6 mb-4">
            <a
              href="https://github.com/FadhilHere"
              className="text-white hover:text-accent transition-transform hover:scale-110 duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/fadhil-parmata-2599a0310/"
              className="text-white hover:text-accent transition-transform hover:scale-110 duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://www.instagram.com/fadhiilp_/"
              className="text-white hover:text-accent transition-transform hover:scale-110 duration-300"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://x.com/antartarka"
              className="text-white hover:text-accent transition-transform hover:scale-110 duration-300"
            >
              <Twitter size={24} />
            </a>
            <a
              href="mailto:fadhilmain29@gmail.com"
              className="text-white hover:text-accent transition-transform hover:scale-110 duration-300"
            >
              <Mail size={24} />
            </a>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-serif font-bold leading-none tracking-tight">
              Hi, I’m <span className="text-accent">Fadhil.</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground font-light">
              Student | Information System at Politeknik Caltex Riau
            </p>
          </div>

          {/* Typewriter Area */}
          <div className="min-h-[96px] mt-2 flex items-start">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              {text}
              <span className="animate-blink ml-1 border-r-4 border-accent h-[1em] inline-block align-middle"></span>
            </h2>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative z-10">
          <div className="group relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
            {/* Creating the 'Creative' Image Card */}
            <div className="absolute inset-0 bg-accent/20 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 blur-xl opacity-0 group-hover:opacity-100"></div>

            <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl transition-all duration-500 rotate-3 group-hover:rotate-0 group-hover:scale-105">
              <Image
                src="/DSC08744.jpg"
                alt="Fadhil"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Text on Hover (Optional creative touch) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {/* <span className="text-white font-serif italic text-xl tracking-wider">Manner Matters</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
