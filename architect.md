# Architecture Document: AndolaLabs Multi-App Studio Hub

**Domain:** `https://andolalabs.com`  
**Host:** GitHub Pages (Custom Domain via CNAME)  
**Stack:** React 18 / TypeScript / Vite / Tailwind CSS / React Router 6 / Web Audio API DSP

---

## 1. Executive Summary & Vision

**AndolaLabs** is an independent creative software laboratory and engineering studio building next-generation digital instruments, audio DSP engines, developer utilities, and mobile applications.

* **Studio Landing Page (`/`):** The primary brand and studio showcase featuring active applications, in-the-lab experimental projects, engineering pillars, developer philosophy, and studio contact.
* **Metronome Showcase (`/metronome`):** The interactive web demonstration and deep dive for **AndolaLabs MetroNome**, with live Web Audio DSP playback, polyrhythm engines, haptic demos, and app store download links.
* **Future Product Hub (`/apps/*`):** Seamless foundation to add new apps (e.g. ToneLab, BeatMatrix, CloudSet) as new routes within the unified studio portal.

---

## 2. Routing Strategy: `BrowserRouter` vs `HashRouter`

### Comparison

| Criterion | `BrowserRouter` (with SPA 404 Handler) 🌟 | `HashRouter` |
| :--- | :--- | :--- |
| **URL Appearance** | `https://andolalabs.com/` & `https://andolalabs.com/metronome` | `https://andolalabs.com/#/` & `https://andolalabs.com/#/metronome` |
| **Aesthetics & Branding** | **Clean, modern, studio-grade**. | Dated `#` hash fragments in URLs. |
| **SEO & Social Sharing** | Google/Bing index pages cleanly; OpenGraph tags and link previews work. | Search engines ignore hash fragments (`#`). |
| **Google Play Compliance** | Clean URLs required for store listings and policy reviews. | Certain aggregators strip `#` in web views. |
| **GitHub Pages Reliability** | 100% reliable with standard `public/404.html` SPA handler. | 100% reliable without config. |

### Architecture Decision
We use **`BrowserRouter`** paired with the industry-standard GitHub Pages SPA redirect trick (`public/404.html` + `index.html` URL decoder). This delivers clean, professional URLs with zero page-refresh breakage.

```
                              User Visits https://andolalabs.com/metronome
                                                   │
                                                   ▼
                                        GitHub Pages Static Server
                                                   │
                                                   ▼
                                       Serves public/404.html
                                                   │
                                 (Encodes path & redirects to index.html)
                                                   │
                                                   ▼
                                        index.html (Restores URL)
                                                   │
                                                   ▼
                                       React Router (BrowserRouter)
                                                   │
                                     Renders <MetronomePage />
```

---

## 3. Directory & Component Architecture

```
andolalabs/
├── public/
│   ├── 404.html                     # SPA redirect handler for GitHub Pages
│   ├── CNAME                        # andolalabs.com
│   ├── cancellation-and-refund.html # Google Play compliance document
│   ├── contact.html                 # Standalone support document
│   ├── privacy.html                 # Privacy policy document
│   └── terms.html                   # Terms & conditions document
├── src/
│   ├── App.tsx                      # BrowserRouter & route definitions
│   ├── main.tsx                     # React entrypoint
│   ├── pages/
│   │   ├── StudioHome.tsx           # AndolaLabs Studio Landing Page (/)
│   │   ├── MetronomePage.tsx        # MetroNome Product Showcase (/metronome)
│   │   └── NotFoundPage.tsx         # 404 Fallback page
│   ├── components/
│   │   ├── studio/                  # Studio Hub components
│   │   │   ├── StudioNavbar.tsx     # Studio navigation bar with active badges
│   │   │   ├── StudioHero.tsx       # Studio headline & interactive visualizer
│   │   │   ├── AppShowcaseGrid.tsx  # Featured released products catalog
│   │   │   ├── LabProjects.tsx      # In-development experimental tools
│   │   │   ├── StudioTechPillars.tsx# DSP, React Native, & Architecture pillars
│   │   │   └── StudioFooter.tsx     # Global studio footer with legal links
│   │   ├── metronome/               # Metronome specific components
│   │   │   ├── AppNavbar.tsx        # Metronome navbar with "← Back to Studio"
│   │   │   ├── AppHero.tsx          # Hero section with tempo display
│   │   │   ├── MetronomeDemo.tsx    # Live Web Audio player & interactive controls
│   │   │   ├── AudioVisualizerCanvas.tsx # Canvas audio visualizer
│   │   │   ├── PolyrhythmVisualizer.tsx  # Concentric circular polyrhythms
│   │   │   ├── ProjectDeepDive.tsx  # Engineering deep-dive & benchmarks
│   │   │   ├── ArchitectureExplorer.tsx  # Interactive TypeScript code tabs
│   │   │   └── AppFooter.tsx        # Metronome product footer
│   │   └── shared/                  # Reusable UI elements
│   ├── data/
│   │   ├── studioData.ts            # Studio apps, lab roadmap, engineering stats
│   │   └── metronomeData.ts         # Metronome presets, time signatures, DSP data
│   ├── audio/
│   │   └── WebAudioEngine.ts        # Zero-drift Lookahead Web Audio DSP Engine
│   └── styles/
│       └── index.css                # Tailwind base, neon gradients, glassmorphism
├── vite.config.ts                   # base: '/'
├── package.json
└── architect.md                     # This architectural document
```

---

## 4. Page Layout Specifications

### A. AndolaLabs Studio Landing Page (`/`)
1. **Studio Navbar (`StudioNavbar.tsx`):**
   - Brand logo with glowing cyan accent and pulse dot: `AndolaLabs`
   - Links: `Applications`, `Engineering`, `In The Lab`, `Open Source`, `Contact`
   - Quick Action: `MetroNome Live Demo →` (links to `/metronome`)
2. **Hero Section (`StudioHero.tsx`):**
   - Title: *Engineering Next-Gen Digital Instruments & High-Performance Software*
   - Subtitle: Independent creative laboratory crafting ultra low-latency DSP audio engines, multisensory mobile apps, and developer platforms.
   - Interactive Audio Visualizer canvas backdrop.
   - CTAs: `Explore Applications` and `Developer Portfolio ↗`.
3. **App Showcase Catalog (`AppShowcaseGrid.tsx`):**
   - **AndolaLabs MetroNome (Flagship / Available Now):**
     - Feature tags: `Audio DSP`, `React Native 0.86`, `Web Audio API`, `Tri-Modal Haptics`.
     - Direct CTA: `Launch Web Experience →` (navigates to `/metronome`).
     - Mobile CTA: `Google Play Store`.
4. **Lab Roadmap & Experimental Projects (`LabProjects.tsx`):**
   - *ToneLab DSP*: Polyphonic microtonal pitch detector.
   - *BeatMatrix Pro*: Generative Euclidean rhythm sequencer.
   - *CloudSet Sync*: Real-time live concert setlist synchronization engine.
5. **Engineering & Architecture Pillars (`StudioTechPillars.tsx`):**
   - Low-latency Lookahead Audio Scheduler (sub-millisecond jitter).
   - Tri-Modal Multisensory Sync (Audio + Impact Haptics + 90ms Screen Strobe).
   - Atomic Offline Persistence & Optimistic State Engines.
6. **Creator & Laboratory Info:**
   - Profile & engineering philosophy by Nikhil Andola.
   - Direct links to GitHub, Developer Portfolio, and Contact.
7. **Studio Global Footer (`StudioFooter.tsx`):**
   - Legal links (`Privacy Policy`, `Terms & Conditions`, `Cancellation & Refund Policy`, `Contact Us`).

---

### B. Metronome Showcase Page (`/metronome`)
1. **Metronome Navbar (`AppNavbar.tsx`):**
   - Header with **`← Back to Studio`** navigation pill.
   - Live tempo audio visualizer badge and Mute toggle.
2. **Interactive Metronome Demo (`MetronomeDemo.tsx` & `AudioVisualizerCanvas.tsx`):**
   - Full Web Audio synthesizer with real-time waveform graphics.
   - Tap tempo, subdivision switcher, tempo increment dials, sound library.
3. **Deep Dive & Concentric Polyrhythms (`PolyrhythmVisualizer.tsx`):**
   - Visual concentric rings for polyrhythmic meters (3:4, 4:5, 5:7).
4. **Architecture Explorer (`ArchitectureExplorer.tsx`):**
   - Live code explorer for DSP lookahead scheduling and haptic sync.
5. **Footer:**
   - Links back to `/` and legal pages.

---

## 5. GitHub Pages 404 SPA Implementation Details

### File: `public/404.html`
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>AndolaLabs</title>
    <script type="text/javascript">
      var segmentCount = 0;
      var location = window.location;
      location.replace(
        location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') +
        location.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
        location.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (location.search ? '&q=' + location.search.slice(1).replace(/&/g, '~and~') : '') +
        location.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

### File: `index.html` Script
```html
<script type="text/javascript">
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&') 
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

---

## 6. Implementation Checklist

- [ ] Install `react-router-dom`
- [ ] Add `public/404.html` and `index.html` SPA redirect script
- [ ] Create `src/data/studioData.ts` with studio apps, roadmap, and stats
- [ ] Create Studio landing components in `src/components/studio/`
- [ ] Create `src/pages/StudioHome.tsx`, `src/pages/MetronomePage.tsx`, and `src/pages/NotFoundPage.tsx`
- [ ] Configure `BrowserRouter` routes in `src/App.tsx`
- [ ] Add "← Back to Studio" link in Metronome header
- [ ] Update legal documents footer navigation to support `/` and `/metronome`
- [ ] Run `npm run build` and verify production bundle
- [ ] Commit, push to `main`, and verify deployment on `https://andolalabs.com/` and `https://andolalabs.com/metronome`
