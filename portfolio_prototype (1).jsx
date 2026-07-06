import React, { useEffect, useRef, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// ---- design tokens ----
const C = {
  bg: "#0a0e14",
  surface: "#10151c",
  border: "#1f2730",
  text: "#e6e8eb",
  muted: "#7d8590",
  green: "#3fb950", // diff add / positive
  red: "#f85149", // diff remove
  amber: "#d29922", // cursor / highlight
  blue: "#58a6ff",
};

const sparkData = [
  { v: 2 }, { v: 3 }, { v: 3 }, { v: 5 }, { v: 4 }, { v: 6 }, { v: 8 },
];

const stats = [
  { label: "systems in production", value: "1", note: "rpl.pocari.id", color: C.green },
  { label: "stacks shipped in", value: "6", note: "Laravel · Vue · ASP.NET · React", color: C.blue },
  { label: "internships", value: "2", note: "Pertamina · Assist.id", color: C.amber },
  { label: "roles served (RPL)", value: "5", note: "single dev, solo build", color: C.green },
];

const experiences = [
  { role: "Backend Engineer", org: "Assist.id", period: "2024", desc: "Node.js/TypeScript service work, deployment troubleshooting." },
  { role: "Software Engineer", org: "Pertamina", period: "2024", desc: "Internal system development track." },
  { role: "Solo Developer", org: "PCR — Sistem RPL", period: "2025–2026", desc: "Laravel/Livewire production system, 5 user roles, live at rpl.pocari.id." },
];

const socials = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "#" },
];

const bootLines = [
  "$ whoami",
  "fadhil_parmata — full-stack developer, IS student @ PCR",
  "$ status --check",
  "5 systems tracked, 1 live in production, 0 blockers",
];

function useTypewriter(lines, speed = 22, pause = 500) {
  const [out, setOut] = useState([]);
  useEffect(() => {
    let li = 0, ci = 0, cancelled = false;
    let current = "";
    function tick() {
      if (cancelled) return;
      if (li >= lines.length) return;
      current = lines[li].slice(0, ci + 1);
      setOut((prev) => {
        const next = [...prev];
        next[li] = current;
        return next;
      });
      ci++;
      if (ci >= lines[li].length) {
        li++; ci = 0;
        setTimeout(tick, pause);
      } else {
        setTimeout(tick, speed);
      }
    }
    tick();
    return () => { cancelled = true; };
  }, []);
  return out;
}

function ParticleField() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    const colors = [C.green, C.amber, C.blue, C.muted];

    function resize() {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    function init() {
      particles = Array.from({ length: 70 }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        len: 4 + Math.random() * 8,
        angle: Math.random() * Math.PI * 2,
        speed: 0.1 + Math.random() * 0.25,
        drift: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.25 + Math.random() * 0.45,
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particles) {
        p.drift += 0.004;
        p.x += Math.cos(p.drift) * p.speed;
        p.y += Math.sin(p.drift) * p.speed;

        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 90) {
          const f = (90 - dist) / 90;
          p.x += (dx / dist) * f * 1.6;
          p.y += (dy / dist) * f * 1.6;
        }

        if (p.x < -10) p.x = canvas.offsetWidth + 10;
        if (p.x > canvas.offsetWidth + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.offsetHeight + 10;
        if (p.y > canvas.offsetHeight + 10) p.y = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle + p.drift);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-p.len / 2, 0);
        ctx.lineTo(p.len / 2, 0);
        ctx.stroke();
        ctx.restore();
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    init();
    frame();

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    const onResize = () => { resize(); init(); };

    canvas.parentElement.addEventListener("mousemove", onMove);
    canvas.parentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      canvas.parentElement.removeEventListener("mousemove", onMove);
      canvas.parentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

export default function Portfolio() {
  const typed = useTypewriter(bootLines);

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      {/* nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 32px", borderBottom: `1px solid ${C.border}` }}>
        <span className="font-mono" style={{ fontSize: 13, color: C.muted, letterSpacing: 1 }}>
          FADHIL_PARMATA<span style={{ color: C.green }}>.dev</span>
        </span>
        <div className="font-mono" style={{ display: "flex", gap: 20, fontSize: 13, color: C.muted }}>
          <span>work</span><span>timeline</span><span>contact</span>
        </div>
      </div>

      {/* hero */}
      <div style={{ position: "relative", padding: "80px 32px 64px", overflow: "hidden", borderBottom: `1px solid ${C.border}` }}>
        <ParticleField />
        <div style={{ position: "relative", maxWidth: 720 }}>
          <div className="font-mono" style={{ fontSize: 13, color: C.green, minHeight: 20, marginBottom: 8 }}>
            {typed[0] || ""}
          </div>
          <div className="font-mono" style={{ fontSize: 13, color: C.muted, minHeight: 20, marginBottom: 28 }}>
            {typed[1] || ""}
          </div>

          <h1 style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 }}>
            Full-stack developer,<br />
            <span style={{ color: C.muted }}>menulis sistem yang beneran dipakai orang.</span>
          </h1>

          <div className="font-mono" style={{ fontSize: 13, color: C.amber, minHeight: 20, marginTop: 24 }}>
            {typed[2] || ""}
          </div>
          <div className="font-mono" style={{ fontSize: 13, color: C.muted, minHeight: 20 }}>
            {typed[3] || ""}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 32 }}>
            <a href="#contact" className="font-mono" style={{
              background: C.green, color: C.bg, padding: "10px 20px", borderRadius: 6,
              fontSize: 13, fontWeight: 700, textDecoration: "none",
            }}>
              contact --me
            </a>
            <div className="font-mono" style={{ display: "flex", gap: 16, fontSize: 12, color: C.muted }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} style={{ color: C.muted, textDecoration: "none", borderBottom: `1px solid ${C.border}` }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* stats dashboard */}
      <div style={{ padding: "40px 32px", borderBottom: `1px solid ${C.border}` }}>
        <div className="font-mono" style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
          $ status --overview
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 18 }}>
              <div className="font-mono" style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {s.label}
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: s.color }}>{s.value}</span>
                <div style={{ width: 60, height: 28 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparkData}>
                      <Line type="monotone" dataKey="v" stroke={s.color} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="font-mono" style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* experience cards */}
      <div style={{ padding: "40px 32px", borderBottom: `1px solid ${C.border}` }}>
        <div className="font-mono" style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
          $ ls ./experience
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {experiences.map((e, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{e.role}</div>
              <div className="font-mono" style={{ fontSize: 12, color: C.green, marginTop: 4 }}>{e.org}</div>
              <div className="font-mono" style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{e.period}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 10, lineHeight: 1.5 }}>{e.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* testimonial placeholder — isi dengan quote asli dari dosen/klien */}
      <div style={{ padding: "40px 32px", borderTop: `1px solid ${C.border}` }}>
        <div className="font-mono" style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
          $ cat ./testimonials.md
        </div>
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 8, padding: 24, color: C.muted, fontSize: 13, fontStyle: "italic" }}>
          "Ganti bagian ini dengan quote asli dari dosen pembimbing, klien, atau rekan kerja — jangan pakai kutipan buatan."
        </div>
      </div>

      {/* footer */}
      <div id="contact" className="font-mono" style={{ padding: "24px 32px", borderTop: `1px solid ${C.border}`, color: C.muted, fontSize: 12, display: "flex", justifyContent: "space-between" }}>
        <span>$ echo "let's build something" _</span>
        <span>Pekanbaru, ID</span>
      </div>
    </div>
  );
}
