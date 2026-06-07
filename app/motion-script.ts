// Pre-paint inline script, injected at the top of <body>. It opts the page into
// the hidden "reveal" start state by adding `reveal-js` to <html> before first
// paint, so revealed content never flashes visible and then re-animates. The
// reveal itself (IntersectionObserver) and the cursor glow run after hydration
// in <RevealMotion>.
//
// The default state — no JS, print, or reduced motion — is the fully visible end
// state. The safety nets below drop the flag so content can never stay stuck
// hidden, even if the app bundle never hydrates.
//
// (<html> carries `suppressHydrationWarning` in the layout because this script
// changes its class list before React hydrates.)
export const revealFlagScript = `(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var el = document.documentElement;
  el.classList.add("reveal-js");
  var unlock = function () { el.classList.remove("reveal-js"); };
  window.addEventListener("beforeprint", unlock);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) unlock();
  });
  if (document.hidden) unlock();
  setTimeout(unlock, 6000);
})();`;
