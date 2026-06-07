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

    // Soft accent glow follows the cursor across the whole viewport.
    const glow = document.querySelector<HTMLElement>(".hero-glow");
    let raf = 0;
    const onMove = (ev: PointerEvent) => {
      if (ev.pointerType === "touch" || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!glow) return;
        glow.style.left = `${(ev.clientX / window.innerWidth) * 100}%`;
        glow.style.top = `${(ev.clientY / window.innerHeight) * 100}%`;
      });
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
