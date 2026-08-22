# Architecture Document: Andola Labs Multi-App Hub

**Domain:** `https://andolalabs.com`  
**Host:** GitHub Pages (Custom Domain via CNAME)  
**Stack:** React 18 / TypeScript / Vite / Tailwind CSS / React Router 7 / Web Audio API DSP

---

## 1. Vision & Architecture

**Andola Labs** (`https://andolalabs.com/`) is the primary engineering portfolio and multi-app release hub for all current and future software applications developed by Andola Labs.

* **Andola Labs Home (`/`):** The primary organization showcase featuring live applications, experimental in-development lab projects, engineering pillars, and philosophy.
* **Metronome Product Showcase (`/metronome`):** The interactive web demonstration for **AndolaLabs MetroNome**, featuring live Web Audio DSP playback, concentric polyrhythm visualizers, and app download links.
* **Future Products (`/apps/*` or `/*`):** Easily add new routes as new applications are launched under the Andola Labs umbrella.

---

## 2. Legal Pages Architecture: Global Organization Policies

### Why Global Policies are Standard & Better:
1. **Accepted by Google Play & App Store**: You provide `https://andolalabs.com/privacy.html` across all present and future app listings in Google Play Developer Console.
2. **Single Source of Truth**: When policy regulations or support emails change, you update one central file and all applications remain compliant.
3. **No Maintenance Overhead**: Avoids having to build and maintain separate privacy/terms pages for every individual app.

**Global Policy Routes:**
* `https://andolalabs.com/privacy.html` — Privacy Policy & Data Deletion
* `https://andolalabs.com/terms.html` — Terms of Service
* `https://andolalabs.com/cancellation-and-refund.html` — Cancellation & Refund Policy
* `https://andolalabs.com/contact.html` — Contact & Support

---

## 3. Directory Structure

```
andolalabs/
├── public/
│   ├── 404.html                     # SPA redirect handler for GitHub Pages
│   ├── CNAME                        # andolalabs.com
│   ├── cancellation-and-refund.html # Global Google Play compliance document
│   ├── contact.html                 # Global support & contact document
│   ├── privacy.html                 # Global privacy policy document
│   └── terms.html                   # Global terms of service document
├── src/
│   ├── App.tsx                      # BrowserRouter & route definitions
│   ├── main.tsx                     # React entrypoint
│   ├── pages/
│   │   ├── StudioHome.tsx           # Andola Labs Home Page (/)
│   │   ├── MetronomePage.tsx        # MetroNome Product Showcase (/metronome)
│   │   └── NotFoundPage.tsx         # 404 Fallback page
│   ├── components/
│   │   ├── studio/                  # Andola Labs Home components
│   │   │   ├── StudioNavbar.tsx     # Navigation bar with live status
│   │   │   ├── StudioHero.tsx       # Headline & generative audio visualizer
│   │   │   ├── AppShowcaseGrid.tsx  # Featured released products catalog
│   │   │   ├── LabProjects.tsx      # In-development experimental tools
│   │   │   ├── StudioTechPillars.tsx# Core DSP & Architecture pillars
│   │   │   └── StudioFooter.tsx     # Global footer with legal links
│   │   ├── metronome/               # Metronome specific components
│   │   │   ├── AppNavbar.tsx        # Metronome navbar with "← Andola Labs" link
│   │   │   ├── AppHero.tsx          # Hero section with tempo display
│   │   │   ├── MetronomeDemo.tsx    # Live Web Audio player & interactive controls
│   │   │   ├── AudioVisualizerCanvas.tsx # Canvas audio visualizer
│   │   │   ├── PolyrhythmVisualizer.tsx  # Concentric circular polyrhythms
│   │   │   ├── ProjectDeepDive.tsx  # Engineering deep-dive & benchmarks
│   │   │   ├── ArchitectureExplorer.tsx  # Interactive TypeScript code tabs
│   │   │   └── AppFooter.tsx        # Metronome product footer
│   │   └── shared/                  # Reusable UI elements
│   ├── data/
│   │   ├── studioData.ts            # Andola Labs applications, lab roadmap, stats
│   │   └── metronomeData.ts         # Metronome presets, time signatures, DSP data
│   ├── audio/
│   │   └── WebAudioEngine.ts        # Zero-drift Lookahead Web Audio DSP Engine
│   └── styles/
│       └── index.css                # Tailwind base, neon gradients, glassmorphism
├── vite.config.ts                   # base: '/'
├── package.json
└── architect.md                     # This architectural document
```
