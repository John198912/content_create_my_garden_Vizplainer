# Vizplainer.com — Complete Motion & Animation Inventory
*Observed: June 19, 2026 | Methodology: Live browser observation + HTML/CSS source inspection*

---

## 🎨 GLOBAL DESIGN SYSTEM

### Color Palette
- **Background:** Pure black `#050505` / `#0A0A0A`
- **Primary accent:** Indigo `rgba(79,70,229,1)` — `bg-indigo-500/600`
- **Secondary accent:** Violet/Purple `bg-violet-600`
- **Feature card gradient:** `from-blue-600/20 to-purple-600/20` (blue-to-purple, 20% opacity)
- **Text primary:** White `#FFFFFF`
- **Text secondary:** `text-white/60` (60% opacity white)
- **Borders:** `border-white/10` (10% opacity white — near-invisible, glass-look)
- **Blur overlays:** `backdrop-blur-md`, `backdrop-blur-xl`, `backdrop-blur-2xl`

### Typography
- **Hero headline:** Bold, tight tracking (`tracking-tighter`), 5xl mobile → 7xl desktop (`text-5xl md:text-7xl`), leading 1.05
- **Font style:** Modern sans-serif (system or Geist-like), monospace used for UI labels (`font-mono text-[10px] tracking-widest uppercase`)
- **Sub-labels:** ALL CAPS, 10px monospace, widely letter-spaced — used as category tags

---

## 📍 SECTION 1 — NAVBAR

### Behavior
- **Fixed/sticky** top bar: `position: fixed; top: 0; z-index: 50`
- **Glassmorphism:** `bg-black/50 backdrop-blur-md border-b border-white/5`
- **Scroll transition:** `transition-all duration-300` — implies it may subtly change on scroll (border becomes visible, bg darkens)

### Hover Effects
- "SIGN IN" link: `transition-colors hover:text-white` — fades from muted white to pure white over ~300ms
- "JOIN WAITLIST" button: White fill, hover → `hover:bg-gray-200` (slight gray press feel, 300ms ease)

---

## 📍 SECTION 2 — HERO (Above the Fold)

### On-Load Animation Sequence (CSS `fadeIn` keyframe, opacity 0 → 1)
All elements start at `opacity: 0` and animate to `opacity: 1` using a custom `fadeIn` keyframe with `ease-out` easing. They stagger in sequence:

| Element | Delay | Duration | CSS Class |
|---|---|---|---|
| "AI AGENT READY" pill badge | 0s | 1s | `animate-[fadeIn_1s_ease-out_forwards]` |
| Hero headline ("Turn Explanation Into Video.") | 0.2s | 1s | `animate-[fadeIn_1s_ease-out_0.2s_forwards]` |
| Subheadline paragraph text | 0.4s | 1s | `animate-[fadeIn_1s_ease-out_0.4s_forwards]` |
| CTA buttons ("Generate Video" / "View Examples") | 0.6s | 1s | `animate-[fadeIn_1s_ease-out_0.6s_forwards]` |
| Email signup form + social links | 0.8s | 1s | `animate-[fadeIn_1s_ease-out_0.8s_forwards]` |
| Hero demo mockup (right side) | 0.8s | 1s | `animate-[fadeIn_1s_ease-out_0.8s_forwards]` |

**Effect:** Pure fade-in (no slide/translate). Clean, smooth, ease-out. Total stagger spread = 0.8 seconds. The cascade reads top → bottom, left side first, then the right-side demo loads simultaneously with the form.

### "AI AGENT READY" Badge
- Pill-shaped badge (`rounded-full`), semi-transparent black with `border border-white/10`, `backdrop-blur-md`
- Contains a **pulsing green dot**: `animate-pulse rounded-full bg-green-500 h-1.5 w-1.5` — standard CSS pulse (scale 1→1.05→1 at ~1s interval)
- Text: "AI AGENT READY" in small mono caps

### Hero Background
- **Canvas element** (`<canvas class="pointer-events-none absolute inset-0 blur-[1px] opacity-40">`) — a particle field or subtle animated background at 40% opacity, blurred 1px. This is JS-driven, likely a star/dot particle animation on pure black.

### Hero Right — Animated Demo Mockup (Looping Multi-State Carousel)
This is the most complex animation on the page. A macOS-style rounded window (`rounded-2xl border border-white/10 bg-[#0A0A0A]`) auto-cycles through 3 states:

**State 1 — INPUT CONTENT (script.txt)**
- Shows a terminal/text-editor panel with a script being typed
- A **blinking cursor** (`animate-pulse bg-indigo-500 h-5 w-2 align-middle`) blinks at the end of text — standard pulse animation
- Bottom bar shows "Voice mode enabled" badge with microphone icon
- A **shimmer/progress bar** at the bottom: `animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-indigo-500/20 to-transparent` — a sheen sweeps left→right over indigo bar every 2s

**State 2 — AI AUTO BUILD (project.vizplainer)**
- Shows a timeline editor with scene labels
- A **loading spinner** icon: `lucide-loader-circle animate-spin text-indigo-400` — continuously spins
- A **progress bar fill**: `animate-[loading_2s_ease-in-out_infinite] origin-left` — fills from left to right and resets
- Three bouncing dots: `h-1 w-1 animate-bounce bg-indigo-400` — staggered bounce animations (typing indicator feel)
- Right panel shows "Vizplainer AI / Generating visual style..."

**State 3 — EDITABLE VIDEO (SCENE 02)**
- Shows a video editor canvas view with the generated video frame
- Timeline track visible at the bottom with colored scene blocks

**Transition between states:**
- `transition-all duration-700 ease-out` with `translate-x-0 scale-100 opacity-100` (active state) vs `translate-x-8 scale-95 opacity-0` (inactive states)
- **Outgoing state:** slides right by 32px (`translate-x-8`) and scales down to 95% + fades out simultaneously
- **Incoming state:** slides in from right (same direction) and scales up to 100% + fades in
- Duration: 700ms, ease-out — smooth, not springy
- Auto-cycles on a timer (appears to be ~3-4s per state based on loading bar duration)

**Tab indicators (INPUT CONTENT / AI AUTO BUILD / EDITABLE VIDEO):**
- Active tab: `border-indigo-500 bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.4)] scale-110` — icon glows with a **box shadow blur-20px** in indigo, scales up 10%
- Inactive tab: `border-white/5 bg-black/20 text-white/20 hover:border-white/20 hover:text-white/40`
- Active label: `text-indigo-400` 
- Transition: `duration-500` for scale + border, `duration-300` for color
- **Active progress bar**: `transition-all duration-1000 scale-x-0` → scales to full width as the state plays out (scrub-like indicator)

**Bottom status bar:**
- "INPUT:" / "OUTPUT:" monospace label in indigo
- Animated ellipsis dots (3× `animate-bounce` dots)

---

## 📍 SECTION 3 — "WHAT VIZPLAINER DOES"

### Section Entry
- **Heading:** Very large white text ("What Vizplainer Does") — appears with a scroll-triggered fade. The section has large bold typography that snaps into view as you scroll past the fold.

### Left Panel — Input (Scrollable Script)
- Shows a split-panel UI: left = raw text input (scrollable script panel in monospace/dark editor style), right = output video frame
- The left text panel scrolls its content independently (overflow-y-auto)
- Text is rendered in monospace white, against very dark gray (`bg-[#0A0A0A]`)

### Right Panel — Output Video
- Shows a **video player** (`<video>` element using `video-react` library)
- A **"Play Video" button** overlaid in the center
- Output is labeled "Output Result Generated by Vizplainer / Fully Editable Video Project"

### Tabs — Financial Analysis / Client Education / Patient Guide
- Tab bar with underline indicator style
- **Active tab indicator:** A white underline (`after:w-full`) slides in from left (`after:w-0` → `after:w-full`), `after:transition-all after:duration-300`
- **Hover:** `hover:text-white hover:after:w-full` — preview of underline on hover
- Inactive tabs: `text-white/40`, active: `text-white`

### Accordion/Expand sections (tab content panels)
- Panel reveal: `grid transition-all duration-300 ease-in-out grid-rows-[0fr] opacity-0` → `grid-rows-[1fr] opacity-100`
- Uses CSS grid height animation trick (grid-rows: 0fr → 1fr) for smooth expand without fixed height
- Duration: 300ms ease-in-out

---

## 📍 SECTION 4 — "THERE'S NOTHING TO SCREEN-RECORD" (Comparison Table)

### Heading
- Bold, full-width heading on dark background — snaps in on scroll (standard fade-in on intersection)

### Comparison Table
- Clean dark table with horizontal row lines
- **Competitor columns** (Sora/Veo, Synthesia/HeyGen, Storylane/Navattic): show "✕ no" in muted white/gray
- **Vizplainer column**: highlighted in indigo — "✓ yes" in green (`text-green-500` or similar)
- No animated reveal per row — table appears as a static block

---

## 📍 SECTION 5 — "POWERFUL FEATURES"

### Section Heading
- "Powerful Features" — very large bold white text, fades in on scroll (uses IntersectionObserver or CSS scroll-driven animation)

### Left — Feature List (Accordion/Vertical Tabs)
Three feature items: "Explainer Videos", "Full Control", "Speed"
- **Active item**: left border becomes solid white/indigo (`border-l-2 border-indigo-500` style), heading is bright white
- **Inactive items**: left border is muted (`border-l-2 border-white/20`), text is `text-white/40`
- Transition: `transition-all duration-300 ease-in-out`

**Content accordion (active item body text):**
- Body text expands using grid animation: `grid-rows-[0fr] opacity-0` → `grid-rows-[1fr] opacity-100`, duration 300ms ease-in-out
- Auto-advances after each state — tied to the demo carousel on the right

### Right — Editor Screenshot / Demo Panel
- Large macOS-style window (`rounded-2xl border border-white/10 bg-[#0A0A0A]`)
- Shows editor interface with:
  - Left sidebar (icons)
  - Main canvas showing video frame (labeled "AI-FIRST ARCHITECTURE" or "SYSTEM MODERNIZATION")
  - Right panel: "Effect: AI Effect" panel with descriptive text about neon-border glow
  - Bottom: full timeline track (`00:00:00` timecode, scene blocks colored in indigo/teal gradient)
  - Bottom-right: AI chat input "Change the style" with send button

**Inside the editor — the described AI Effect panel explicitly reads:**
> *"Implementing neon-border glow effect (blue to purple gradients) with visual narrative sequence:*  
> *Frame 1: Sleek glowing search bar*  
> *Frame 3: "Money Printer" window transition*  
> *Frame 4: Reveal "Google Stack" foundation"*

This is the product demo — it shows the style of videos Vizplainer produces: neon-glow borders, frame-by-frame scene construction, blue→purple gradient effects.

**Editor image crossfade:**
- Two `<img>` elements layered with `transition-opacity duration-300`: one at `opacity-100`, other at `opacity-0`
- Used to crossfade between different editor states or scenes
- Duration: 300ms

**Glow overlay on features card:**
- `absolute -inset-1 rounded-2xl bg-linear-to-r from-blue-600/20 to-purple-600/20 opacity-50 blur-2xl`
- A soft blue-to-purple radial glow bleeds behind the editor card, blurred 2xl

**Ambient glow blobs (hover-activated):**
- Two large blur circles: `h-64 w-64 rounded-full bg-indigo-600/10 blur-[80px]` (top-right) and `bg-violet-600/10 blur-[80px]` (bottom-left)
- Start at `opacity-0`, transition to visible on hover or scroll: `transition-opacity duration-1000`
- Creates a soft indigo/violet ambient light effect on card hover

---

## 📍 SECTION 6 — CONTACT US + STAY UPDATED

### Entry Animation
- Section fades in on scroll — no dramatic slide
- "Contact Us" heading is large white bold serif-style
- Email link has `transition-colors hover:text-white` effect

### Social Icons (Discord, X, YouTube)
- Three icon buttons in rounded containers: `hover:scale-105` — subtle 5% scale-up on hover
- `transition-all duration-300`

### "Stay Updated" Form Box
- Dark card with `rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl`
- Email input: `border border-white/10 focus:border-white/20` — border brightens on focus
- "Subscribe to Newsletter" button: white fill, `hover:bg-gray-200`, `transition-all`

---

## 📍 SECTION 7 — FOOTER

- Simple footer: dark background, Vizplainer logo + tagline left, nav links center, copyright right
- Nav links: `transition-colors hover:text-white/50` — subtle fade to 50% white opacity
- No animation — static presentation

---

## ⚡ HOVER EFFECTS — MASTER LIST

| Element | Hover Effect | Timing |
|---|---|---|
| Navbar links | `text-white` (fade from 60% → 100% opacity) | 300ms ease |
| "JOIN WAITLIST" button | `bg-gray-200` (slight darken from white) | 300ms |
| "Generate Video" / "View Examples" buttons | `bg-gray-200` on primary; implied glow on secondary | 300ms |
| Hero tab buttons (INPUT/AUTO/VIDEO) | `border-white/20 text-white/40` (ghost brighten) | 500ms |
| Feature tabs (left accordion) | Border brightens + text to white | 300ms |
| Footer links | `text-white/50` | 300ms |
| Social icons | `scale(1.05)` | 300ms |
| Editor card | Ambient glow blobs appear (indigo + violet `blur-80px`) | 1000ms |
| Email inputs | `border-white/20` (brighter border) + `bg-black/40` | immediate |
| Feature title text | `group-hover:scale-105` (5% text scale-up) | 500ms |

---

## 🎬 MOTION GRAPHICS / VIDEO DEMO STYLE

Based on the embedded demo panels and described effects:

1. **Neon-border glow effect** — elements have glowing indigo/purple borders with `box-shadow` outer glow (`shadow-[0_0_20px_rgba(79,70,229,0.4)]`)
2. **Blue-to-purple gradients** — backgrounds use `bg-linear-to-r from-blue-600 to-purple-600` (Tailwind CSS gradient syntax)
3. **Frame-by-frame scene reveals** — the product builds videos scene by scene with explicit frame numbering
4. **Timeline scrubbing** — the editor shows a full timeline track at the bottom with scene blocks (similar to Premiere Pro/After Effects), but content is auto-generated
5. **Shimmer sweep animation** — `bg-linear-to-r from-transparent via-indigo-500/20 to-transparent` mask sweeps across loading bars at 2s intervals

---

## ⏱️ EASING & TIMING SUMMARY

| Feel | Implementation |
|---|---|
| **Subtle, smooth fades** | `ease-out` 0.3s–1s — page load elements |
| **Content transitions** | `ease-out` 0.7s — demo state slides |
| **Interaction responses** | `ease-in-out` 0.3s — tabs, buttons |
| **Slow ambient effects** | `duration-1000` — glow orb reveals |
| **Rapid UI feedback** | `duration-300` — hover color changes |
| **Loading indicators** | `ease-in-out` 2s infinite — shimmer bars |
| **Overall feel** | **Smooth and cinematic, not springy** — no bounce, no spring physics. Pure CSS ease-out curves throughout. |

---

## 📐 SCROLL BEHAVIOR

- **No parallax detected** — the hero section does not use parallax scrolling
- **No scroll-scrubbed/timeline animation** (no GSAP ScrollTrigger or equivalent detected)
- **IntersectionObserver-style** section reveals likely used for "What Vizplainer Does", "Powerful Features", and comparison table headings (elements appear as viewport enters)
- **Sticky header** — navbar is fixed, not scroll-sticky with state change detected (though `transition-all duration-300` class is present suggesting it may update subtly)
- **Scroll within demo** — the left "script" panel in the demo scrolls its own content independently (auto-scrolling script text effect to simulate real-time input)

---

## 🔢 ANIMATED DATA / COUNTERS

- **No number counters** or progress bar statistics detected on the page
- **Loading bars** exist inside the hero mockup but they represent UI process states, not data metrics
- The comparison table shows checkmarks (✓ yes) vs crosses (✕ no) — static, no animation

---

## 🏗️ DEVELOPER IMPLEMENTATION NOTES

### To recreate the hero stagger:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero-badge    { animation: fadeIn 1s ease-out 0s both; }
.hero-heading  { animation: fadeIn 1s ease-out 0.2s both; }
.hero-sub      { animation: fadeIn 1s ease-out 0.4s both; }
.hero-buttons  { animation: fadeIn 1s ease-out 0.6s both; }
.hero-form     { animation: fadeIn 1s ease-out 0.8s both; }
.hero-demo     { animation: fadeIn 1s ease-out 0.8s both; }
```

### To recreate demo state transitions:
```css
.state { transition: all 700ms ease-out; }
.state--active   { transform: translateX(0) scale(1); opacity: 1; }
.state--inactive { transform: translateX(32px) scale(0.95); opacity: 0; pointer-events: none; }
```

### To recreate the shimmer sweep:
```css
@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.shimmer-bar {
  background: linear-gradient(to right, transparent, rgba(79,70,229,0.2), transparent);
  animation: shimmer 2s infinite;
}
```

### To recreate the tab underline slide:
```css
.tab::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  height: 2px; width: 0;
  background: white;
  transition: width 300ms ease;
}
.tab:hover::after,
.tab--active::after { width: 100%; }
```

### To recreate the glow card:
```css
.glow-card {
  background: linear-gradient(to right, rgba(37,99,235,0.2), rgba(124,58,237,0.2));
  filter: blur(40px);
  border-radius: 16px;
  opacity: 0.5;
  position: absolute;
  inset: -4px;
}
```
