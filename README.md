# Emmatos Fitness — Multi-Branch Gym Web App

**One membership, three homes.** A static, server-free React application for Emmatos Fitness Clubs across Alagbado, Ipaja and Isashi, Lagos.

[![Built with](https://img.shields.io/badge/Built%20with-React%2019%20%7C%20TypeScript%205.9%20%7C%20Vite%208%20%7C%20Tailwind%20v4-f0c040?logo=react&logoColor=white)](https://react.dev)
[![Assets](https://img.shields.io/badge/Self–hosted%20Fonts-Bricolage%20Grotesque%20%2B%20Space%20Mono-informational?logo=fontsource)](https://fontsource.org)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel%20%7C%20Netlify-0054a7?logo=vercel)](https://vercel.com)

---

## What's inside

| Feature | Route | Description |
|---|---|---|
| **Landing page** | `/` | Hero carousel, branch cards, features, pricing, Pro Shop |
| **Pro Shop** | `/#proshop` | 10 demo gym products (belts, gloves, bands, etc.) |
| **Admin dashboard** | `/admin` | Front-desk control room — KPIs, revenue chart, check-ins, member table, branch performance |
| **Admin login** | `/admin/login` | Demo: `admin@emmatos.ng` / `front-desk` |
| **Member dashboard** | `/member/dashboard` | Personalized hub — stats, check-in history, billing, classes, branch info |
| **Member login** | `/member/login` | Demo: any member email (e.g. `adaeze.okafo@emmatos.ng`) / PIN `gym2026` |

## Quick start

```bash
npm install
npm run dev          # → http://localhost:5173
npm run build        # → dist/ (production build)
npm run preview      # preview production build locally
```

## Deploy

```bash
npm run build
npx vercel --prod    # or drag dist/ onto vercel.com / netlify
```

A `vercel.json` is included for SPA routing — no configuration needed.

## Project structure

```
src/
├── main.tsx                  # Entry point — imports fonts, renders App
├── App.tsx                   # BrowserRouter + routes
├── index.css                 # Tailwind @theme + @utility tokens (brand colors, fonts, keyframes)
│
├── data/                     # 100% mock data (no database, no API)
│   ├── branches.ts           # 3 branches with addresses, features, colors
│   ├── members.ts            # 27 members with plans, status, check-in data
│   ├── checkins.ts           # 25 recent check-in events
│   ├── revenue.ts            # Weekly revenue, KPIs, plan mix, capacity
│   ├── products.ts           # 10 Pro Shop products
│   └── classes.ts            # 10 gym classes schedule
│
├── lib/                      # Shared utilities
│   ├── auth.ts               # Admin auth (sessionStorage)
│   ├── auth-member.ts        # Member auth (email + PIN)
│   ├── store.tsx             # Branch state (observer pattern)
│   ├── format.ts             # ₦ formatting, relative time, delta helpers
│   ├── useCountUp.ts         # Animated number count-up hook
│   └── cn.ts                 # Class name helper
│
├── pages/                    # Route pages
│   ├── Landing.tsx
│   ├── AdminLogin.tsx / AdminDashboard.tsx
│   └── MemberLogin.tsx / MemberDashboard.tsx
│
└── components/               # UI components
    ├── ui/                   # Reusable: Button, Badge, SectionTag, BranchSwitcher, ScrollReveal
    ├── landing/              # Nav, Hero, BranchCards, Features, Pricing, ProShop, Footer
    ├── admin/                # Rail, TopBar, KpiCard, RevenueChart, CheckinsFeed, MembersTable, BranchPerformance
    └── member/               # ProfileCard, StatsPanel, CheckInPanel, BillingCard, ClassSchedule, BranchInfo
```

## Design system

All brand tokens live in one file: `src/index.css` → `@theme { }`

| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#0B0A0C` | Near-black canvas |
| `--color-bone` | `#F4F1EA` | Off-white type |
| `--color-em-red` | `#E6352B` | Alagbado / strength accent |
| `--color-em-yellow` | `#FFC400` | Ipaja / CTA accent |
| `--color-em-blue` | `#2146F3` | Isashi / info accent |

**Fonts** (self-hosted via Fontsource, works offline):
- **Bricolage Grotesque** — display + UI
- **Space Mono** — data / counters / KPIs

**Animations**: scroll-triggered reveal (`enter-slide-up`), count-up (ease-out-expo), staggered children, marquee ticker, pulse dot.

## Demo credentials

```
Admin:   admin@emmatos.ng / front-desk
Member:  any email from src/data/members.ts (e.g. adaeze.okafo@emmatos.ng) / gym2026
```

## Updating branch data

The 3 branch addresses are placeholders in `src/data/branches.ts`. Open `emmatos.com.ng` on your machine and update the `address` fields — they're the only production data gap.

## Tech

- **React 19** + **TypeScript 5.9** + **Vite 8** — fast development, clean builds
- **Tailwind CSS v4** — utility-first, `@theme` tokens for brand colors/fonts/animations
- **React Router v7** — client-side routing with `element` API
- **Zero server** — 100% static. No API calls, no database, no environment variables
- **Framer Motion 14** — animation primitives (used through the `motion` package)
- **Fontsource** — self-hosted Google Fonts alternative (no external font loading at runtime)
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
