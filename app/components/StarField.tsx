"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number; // position in a centered field, -1..1 scaled to viewport
  y: number;
  z: number; // depth 0.15 (far) .. 1 (near)
  r: number;
  hue: number;
  twinkle: number;
};

const STAR_COUNT = 900;

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;

    // Pointer target and eased pointer (kept outside React state on purpose).
    const target = { x: 0, y: 0, active: false };
    const pointer = { x: 0, y: 0, px: -9999, py: -9999 };

    // Galaxy: stars arranged on a few spiral arms plus a sprinkle of loose stars.
    const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, i) => {
      const onArm = i % 5 !== 0;
      let x: number;
      let y: number;
      if (onArm) {
        const arm = i % 3;
        const dist = Math.pow(Math.random(), 0.7) * 1.1;
        const angle = dist * 5 + (arm * Math.PI * 2) / 3 + (Math.random() - 0.5) * 0.6;
        x = Math.cos(angle) * dist;
        y = Math.sin(angle) * dist * 0.55;
      } else {
        x = (Math.random() - 0.5) * 3;
        y = (Math.random() - 0.5) * 2;
      }
      const z = 0.15 + Math.random() * 0.85;
      return {
        x,
        y,
        z,
        r: 0.4 + z * 1.4,
        hue: Math.random() < 0.18 ? 32 : Math.random() < 0.5 ? 200 : 220,
        twinkle: Math.random() * Math.PI * 2,
      };
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / w) * 2 - 1;
      target.y = (e.clientY / h) * 2 - 1;
      pointer.px = e.clientX;
      pointer.py = e.clientY;
      target.active = true;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      pointer.px = -9999;
      pointer.py = -9999;
      target.active = false;
    };

    let rotation = 0;

    const draw = (t: number) => {
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;
      if (!reduce) rotation += 0.00025;

      ctx.clearRect(0, 0, w, h);

      // Soft galactic core glow.
      const cx = w * 0.62 - pointer.x * 30;
      const cy = h * 0.45 - pointer.y * 20;
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.45);
      core.addColorStop(0, "rgba(120,170,255,0.16)");
      core.addColorStop(0.35, "rgba(70,90,180,0.06)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      const scale = Math.min(w, h) * 0.75;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const near: { x: number; y: number }[] = [];

      for (const s of stars) {
        const rx = s.x * cos - s.y * sin;
        const ry = s.x * sin + s.y * cos;
        // Parallax: near stars shift more with the pointer.
        let x = cx + rx * scale - pointer.x * 60 * s.z;
        let y = cy + ry * scale - pointer.y * 40 * s.z;

        // Gentle push away from the cursor.
        const dx = x - pointer.px;
        const dy = y - pointer.py;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const d = Math.sqrt(d2) || 1;
          const force = (1 - d / 140) * 22 * s.z;
          x += (dx / d) * force;
          y += (dy / d) * force;
          if (s.z > 0.55 && near.length < 14) near.push({ x, y });
        }

        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;

        const tw = reduce ? 1 : 0.65 + Math.sin(t * 0.002 + s.twinkle) * 0.35;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, ${70 + s.z * 20}%, ${tw * (0.35 + s.z * 0.65)})`;
        ctx.fill();
      }

      // Constellation lines from the cursor to nearby stars.
      if (target.active) {
        ctx.lineWidth = 0.6;
        for (const p of near) {
          const d = Math.hypot(p.x - pointer.px, p.y - pointer.py);
          ctx.strokeStyle = `rgba(150,200,255,${0.35 * (1 - d / 160)})`;
          ctx.beginPath();
          ctx.moveTo(pointer.px, pointer.py);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
