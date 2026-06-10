"use client";

import { useEffect } from "react";

// Drives the entrance reveals and the cursor-following glow. This runs in a
// `useEffect`, i.e. after hydration, so the `is-in` classes it adds to the
// server-rendered elements never race with React's hydration. The pre-paint
// `reveal-js` flag (which hides the start state) is set separately by the inline
// script in the root layout so revealed content doesn't flash in first.
export function RevealMotion() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], .reveal-name"),
    );
    const revealAll = () => els.forEach((el) => el.classList.add("is-in"));

    // Reduced motion / no IntersectionObserver: jump straight to the end state.
    if (reduce || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          fired = true;
          const el = e.target as HTMLElement;
          const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));

    // Safety net: if the observer never fires, reveal everything anyway.
    const fallback = window.setTimeout(() => {
      if (!fired) revealAll();
    }, 1200);

    // Soft accent glow trails the cursor with an exponential lerp, easing
    // toward the pointer instead of restarting a CSS transition on each event.
    // The loop only runs while the glow is still catching up.
    const glow = document.querySelector<HTMLElement>(".hero-glow");
    let raf = 0;
    let gx = window.innerWidth * 0.36;
    let gy = window.innerHeight * 0.3;
    let tx = gx;
    let ty = gy;
    let last = 0;
    const step = (now: number) => {
      const dt = last ? now - last : 16;
      last = now;
      // time-based smoothing (~300ms to close most of the gap), so the trail
      // feels the same on 60Hz and 120Hz displays
      const k = 1 - Math.exp(-dt / 300);
      gx += (tx - gx) * k;
      gy += (ty - gy) * k;
      if (Math.abs(tx - gx) < 0.5 && Math.abs(ty - gy) < 0.5) {
        gx = tx;
        gy = ty;
        raf = 0;
        last = 0;
      } else {
        raf = requestAnimationFrame(step);
      }
      glow!.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
    };
    const onMove = (ev: PointerEvent) => {
      if (!glow || ev.pointerType === "touch") return;
      tx = ev.clientX;
      ty = ev.clientY;
      if (!raf) {
        // switch from the CSS resting position to transform-driven movement
        glow.style.left = "0";
        glow.style.top = "0";
        raf = requestAnimationFrame(step);
      }
    };
    if (glow) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
      if (glow) window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
