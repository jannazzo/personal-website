# Luke Jannazzo — Personal Website

A single-page personal landing site ("link in bio") for Luke Jannazzo.

Mobile-first, light-only, with subtle motion — staggered entrance reveals, a
cursor-following ambient glow, and glassy hover states — all of which degrade
gracefully (no JS, print, and reduced-motion all render the fully visible page).

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Plain global CSS** (`app/globals.css`) — the design is bespoke, so it's hand-written rather than utility classes
- **[`next/font`](https://nextjs.org/docs/app/api-reference/components/font)** — Newsreader (display serif) and Hanken Grotesk (UI sans)
- **[`next/image`](https://nextjs.org/docs/app/api-reference/components/image)** — the portrait headshot

## Getting started

```bash
npm install
npm run dev      # dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Project structure

```
app/
  layout.tsx         Root layout: metadata, viewport, fonts, pre-paint reveal flag
  page.tsx           The page: hero, "things I've helped build" ledger, footer
  globals.css        All styling (design tokens, type scale, layout, motion)
  fonts.ts           next/font setup (Newsreader + Hanken Grotesk)
  icons.tsx          Inline SVG icon components
  reveal-motion.tsx  Client component: scroll reveals + cursor glow (runs post-hydration)
  motion-script.ts   Inline pre-paint script that sets the reveal "start hidden" flag
  portrait.jpg       Headshot, rendered via next/image
public/
  Luke-Jannazzo-Resume.pdf   Linked from the Résumé button
```

## How the motion works

The entrance reveals are split to stay both flash-free and hydration-safe:

- `motion-script.ts` is injected inline at the top of `<body>`. Before first
  paint it adds a `reveal-js` class to `<html>` (only when motion is allowed), so
  revealed content never flashes in. The page's default state — no JS, print, or
  reduced motion — is the fully visible end state, and several safety nets drop
  the flag so content can never get stuck hidden.
- `reveal-motion.tsx` is a client component whose `useEffect` (i.e. after
  hydration) wires up the `IntersectionObserver` that reveals elements and the
  `pointermove` handler that moves the glow. Running after hydration means its
  DOM changes never conflict with React.

## Deployment

The site is fully static (`next build` prerenders it), so it can be hosted on any
static host or on [Vercel](https://vercel.com/new).
