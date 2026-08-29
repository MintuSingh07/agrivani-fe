# AgriVani Agent & Developer Workflow (`AGENTS.md`)

This file defines the 2-step interactive repository sync workflow for all developers and AI agents on this project.

---

## 🚜 2-Option Developer Workflow

Developers can run `./sync.sh` or `npm run sync` in the terminal to open the interactive prompt, or execute the specific option command:

```
==========================================
 🚜 AgriVani Developer Workflow (main)
==========================================
Select workflow step:
  [1] Start Coding  -> Check remote updates & pull latest code
  [2] Finish Coding -> Push all local changes to remote repository
  [3] Exit
```

---

### Option 1: Start Coding (Check & Pull)
Run **Option 1** before beginning any new feature or coding session:
* **Terminal Command**: `./sync.sh 1` or `./sync.sh pull` (or `npm run sync 1`)
* **AI Agent Prompt**: *"Check for remote changes and pull"* or *"Start work"*
* **Behavior**:
  1. Fetches updates from remote tracking repository (`git fetch`).
  2. If remote updates exist, automatically stashes any uncommitted local work (`git stash`), rebases latest remote commits (`git pull --rebase`), and restores stashed work (`git stash pop`).
  3. Confirms that local repository is up-to-date and ready for coding.

---

### Option 2: Finish Coding (Commit & Push)
Run **Option 2** once you finish coding on your local machine:
* **Terminal Command**: `./sync.sh 2` or `./sync.sh push "commit message"` (or `npm run sync 2`)
* **AI Agent Prompt**: *"Push my code with commit message '...'"* or *"Finish work"*
* **Behavior**:
  1. Prompts for a commit message (or uses the provided message).
  2. Stages all local modifications (`git add .`).
  3. Commits changes (`git commit -m "..."`).
  4. Pushes all commits cleanly to the remote repository (`git push`).

---

## 🛠️ Quick Command Reference

| Goal | Terminal Command | AI Agent Prompt |
| :--- | :--- | :--- |
| **Interactive Menu** | `./sync.sh` or `npm run sync` | *"Run sync script"* |
| **Option 1 (Pull Latest)** | `./sync.sh 1` | *"Pull latest updates"* |
| **Option 2 (Push Changes)**| `./sync.sh 2 "your message"` | *"Push my code with message '...'"* |

---

## 🤖 Instructions for AI Assistants
- **Manual User Trigger Only**: Do **NOT** automatically run `./sync.sh` or `npm run sync`. Only execute sync commands when explicitly instructed by the user (e.g. *"Run sync"*, *"Pull code"*, or *"Push changes"*).

---

# 📱 AgriVani Mobile & Tablet First Application Specification

## 1. Application Vision & Target Viewports
- **Target Devices**: Mobile Phones (320px–480px) and Tablets (600px–1024px, e.g. iPad, Android tablets).
- **Core Design Rule**: **MOBILE & TABLET ONLY DESIGN**. The interface must look and feel like a native mobile app.
- **Desktop Adaptation**: On desktop screens (>1024px), center the app layout inside an elegant mobile/tablet app shell container (`max-w-md` for phone view, `max-w-2xl` / `max-w-3xl` for tablet view) with subtle drop shadows, simulating a device canvas.
- **Touch Ergonomics**: Minimum tap target size of 44x44px for buttons, list items, and inputs. Sticky bottom navigation bar optimized for thumb reach.

---

## 2. Routes & Page Architecture

| Route Path | Page Name / Purpose | Description & Key Components |
|------------|---------------------|------------------------------|
| `/get-started` | Splash / Get Started | AgriVani logo, tagline, scenic farm illustration, loading state & "Get Started" trigger. |
| `/onboarding` | Onboarding Carousel | 3-step feature tour: 1. Smart Crop Care, 2. Learn Farming, 3. Your Farming Assistant. |
| `/auth` | Authentication | Mobile number + Password login/signup/reset, "Continue with OTP", "Continue as Guest", "Works Offline" badge. |
| `/home` | Home Dashboard | Farmer greeting ("Hello, Farmer! 👋"), Crop selector, Offline/Online sync status badge, 9 grid feature cards, bottom navigation. |
| `/crops` | My Crops | Crop growth tracker with "Current Crops" & "Past Crops" tabs, planting date, days counter, "+ Add Crop" action. |
| `/detection` | Disease Detection | Camera viewfinder overlay for leaf scanning, "Take Photo", "Choose from Gallery", AI diagnostic result card. |
| `/chat` | AgriVani Chatbot | AI Farming Assistant ("Namaste! How can I help you today?"), quick query chips (pest, water, yellowing, fertilizer), voice input, chat history. |
| `/learn` | Learn Farming | Search bar, "Courses", "Videos", "Articles" tabs, offline course cards with progress & badges. |
| `/mandi` | Mandi Prices | Market selector ("Kolkata Mandi"), last synced timestamp, commodity price list with unit rate & price trend indicators (↑/↓). |
| `/profile` | Profile & Settings | Farmer profile (Ramesh Kumar, Mobile #, Offline status), My Information, Data Sync, Language selector, Support, Logout. |

---

## 3. Navigation & Layout Architecture
- **Mobile Container**: `w-full max-w-md md:max-w-xl mx-auto min-h-screen bg-[#F4F7F4] flex flex-col relative overflow-hidden`.
- **Responsive Tablet Grid**: Responsive 2-column or 3-column grids on tablet (`md:grid-cols-3`) for feature cards, learning items, and crop cards.
- **Fixed Bottom Navigation Bar** (5 Touch Tabs):
  1. **Home** (`/home`) - `Home` icon
  2. **Crops** (`/crops`) - `Sprout` / `Leaf` icon
  3. **Chat** (`/chat`) - Central floating AgriVani Bot icon
  4. **Learn** (`/learn`) - `BookOpen` / `GraduationCap` icon
  5. **Profile** (`/profile`) - `User` icon

---

## 4. Design System & Theme (Mobile Optimized)

### Color Palette
- **Primary Dark Green**: `#2D7A4D` (AgriVani Brand Green)
- **Secondary Leaf Green**: `#4CAF50` (Fresh Crop Green)
- **Accent Forest Green**: `#1B4D2E` (Deep Forest)
- **Background**: `#F4F7F4` (Soft organic off-white)
- **Surface / Card Color**: `#FFFFFF` (Pure white with soft rounded corners `rounded-2xl`)
- **Offline Pill Badge**: `#EF4444` (Red pill: "Offline - Using saved data")
- **Online Pill Badge**: `#22C55E` (Green pill: "Online - Syncing latest data")
- **Trend Up**: `#22C55E` (Green ↑)
- **Trend Down**: `#EF4444` (Red ↓)
- **Text Primary**: `#1F2937` (Dark slate gray)
- **Text Muted**: `#6B7280` (Muted gray)
- **Border / Divider**: `#E5E7EB` / `#D1D5DB`

### Typography & Touch Sizing
- **Primary Font**: `Inter`, `Plus Jakarta Sans`, or Next.js `Geist` sans-serif.
- **Touch Target Padding**: `p-3`, `p-4`, `py-3.5` for comfortable finger tapping on small screens.

---

## 5. Mobile & Tablet Development Guidelines
- **Responsive Viewport First**: Every single page, card, modal, drawer, and input must be designed mobile/tablet first using fluid Tailwind utility classes (`w-full`, `max-w-md`, `md:max-w-xl`).
- **No Wide Desktop Spreads**: Layouts must not stretch horizontally across wide desktop monitors; maintain a clean, polished mobile/tablet app shell centered on larger displays.
- **Mobile Number Auth**: Use 10-digit mobile number input fields instead of email for authentication.
- **Offline-First Paradigm**: Simulated offline/online status indicator across all screens.

---

## 6. Home Page Header Weather Card Specification
The top of the `/home` page route must feature an exact scenic Weather Header Card matching the visual design:
- **Background**: High-definition lush green rice field landscape background image with a subtle dark gradient overlay for text legibility.
- **Top Bar**:
  - **Left**: Translucent circular Settings button (`bg-black/30 backdrop-blur-md p-2 rounded-full text-white`).
  - **Right**: User avatar thumbnail with white border (`w-10 h-10 rounded-full border-2 border-white/40 object-cover`).
- **Greeting & Location**:
  - **Greeting Text**: `"Hi, Good Morning Zara"` (or farmer name), styled with `text-xl font-bold text-white shadow-sm`.
  - **Location Row**: Pin icon (`MapPin`) + `"Sawojajar, Jawa Timur"` (or local area) styled with `text-sm text-white/90 font-medium flex items-center gap-1`.
- **Primary Weather Stats**:
  - **Temperature**: `26°C` in massive bold hero typography (`text-5xl font-extrabold text-white tracking-tight`).
  - **Condition & Timestamp**:
    - Sun icon (`Sun`) + `"Sunny Day"` (`text-lg font-semibold text-white flex items-center gap-1.5`).
    - Timestamp `"8:45 AM | Jan 26"` (`text-xs text-white/80 font-medium mt-0.5`).
- **Bottom Metrics Bar** (3 Glassmorphic frosted pills `bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-white flex items-center gap-1.5 border border-white/20`):
  1. **Wind**: `Wind` icon + `5 km/h`
  2. **Temperature Variation**: `Thermometer` icon + `+12°C`
  3. **Humidity**: `Droplets` icon + `42.5%`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
