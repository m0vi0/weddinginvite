# Rename Bride + Add Background Music — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Rename the bride from "Priya Mehta" to "Lirisha Dsouza" everywhere in the app, and add an elegant background song that plays on the site (with a visible mute/unmute control and autoplay-on-first-interaction, since browsers block autoplay-with-sound).

**Architecture:** The name is centralized in `src/data/wedding.ts` (single source of truth) and echoed in `index.html` meta tags and the placeholder-image generator; all three must be updated together. Background audio is handled by a single `MusicPlayer` client component that mounts a native `<audio>` element, attempts autoplay (muted fallback), and upgrades to audible after the first user gesture — a pattern required because Chrome/Safari block `autoplay` with sound until the user interacts. A royalty-free placeholder track is generated with `ffmpeg` so the feature works out-of-the-box; the user then drops in their real song.

**Tech Stack:** React 19 + TypeScript, Vite, HTML5 `<audio>`, Media Session API (optional), `ffmpeg` (only to synthesize the placeholder mp3 — not a runtime dependency).

---

## Part A — Rename the Bride (Lirisha Dsouza)

### Task 1: Update the single source of truth in `src/data/wedding.ts`

**Objective:** Change `partner2` (and any derived strings) from Priya Mehta to Lirisha Dsouza.

**Files:**
- Modify: `src/data/wedding.ts:10-15` (partner2 block)
- Modify: `src/data/wedding.ts:118-119` (closing tagline + monogram)

**Step 1: Edit the `partner2` object**

Replace lines 11-13:
```ts
    name: 'Priya',
    fullName: 'Priya Mehta',
    image: '/images/couple/priya.webp',
```
with:
```ts
    name: 'Lirisha',
    fullName: 'Lirisha Dsouza',
    image: '/images/couple/lirisha.webp',
```

**Step 2: Edit the `closing` object**

Replace lines 118-119:
```ts
  tagline: 'Two souls, one journey · Amstel & Priya',
  monogram: 'A & P',
```
with:
```ts
  tagline: 'Two souls, one journey · Amstel & Lirisha',
  monogram: 'A & L',
```

**Step 3: Verify no remaining references**

Run:
```bash
grep -rn "Priya\|Mehta\|A & P" src/ index.html scripts/ || echo "CLEAN"
```
Expected: `CLEAN`

**Step 4: Commit**
```bash
git add src/data/wedding.ts
git commit -m "rename: bride is now Lirisha Dsouza (source of truth)"
```

---

### Task 2: Regenerate the bride's placeholder portrait

**Objective:** The old placeholder image `priya.webp` is labeled "P" and the filename no longer matches `lirisha.webp`. Regenerate with the correct filename and initial.

**Files:**
- Modify: `scripts/gen-placeholders.sh:24`
- Output: `public/images/couple/lirisha.webp` (replaces `priya.webp`)

**Step 1: Edit the generator line**

Replace:
```bash
make_img "$ROOT/couple/priya"   900 1200 "#4a1420" "P" "#d4b96a"
```
with:
```bash
make_img "$ROOT/couple/lirisha"  900 1200 "#4a1420" "L" "#d4b96a"
```

**Step 2: Run the generator**
```bash
cd /Users/m0vi0/amstel-wedding-invite && bash scripts/gen-placeholders.sh
```

**Step 3: Remove the stale old file**
```bash
rm -f public/images/couple/priya.webp
ls public/images/couple/
```
Expected: `amstel.webp` and `lirisha.webp`

**Step 4: Commit**
```bash
git add scripts/gen-placeholders.sh public/images/couple/lirisha.webp public/images/couple/priya.webp
git commit -m "chore: regenerate bride placeholder as lirisha.webp"
```

---

### Task 3: Update the OG image monogram in the placeholder generator

**Objective:** The social-share OG image currently renders monogram "A & P". Update to "A & L".

**Files:**
- Modify: `scripts/gen-placeholders.sh:40` (og-image line)

**Step 1: Edit the og-image line**

Replace:
```bash
make_img "$ROOT/og-image" 1200 630 "#6b1d2a" "A & P" "#c9a84c"
```
with:
```bash
make_img "$ROOT/og-image" 1200 630 "#6b1d2a" "A & L" "#c9a84c"
```

**Step 2: Regenerate just the og image**
```bash
bash scripts/gen-placeholders.sh
```

**Step 3: Commit**
```bash
git add public/images/og-image.webp scripts/gen-placeholders.sh
git commit -m "chore: update OG image monogram to A & L"
```

---

### Task 4: Update `index.html` meta tags

**Objective:** The page title, description, and social meta still say "Priya". Update to "Lirisha".

**Files:**
- Modify: `index.html:10,15,24,31`

**Step 1: Apply these four edits**

Line 10 (description):
```html
      content="You are cordially invited to the wedding of Amstel & Lirisha — Udaipur, February 2027."
```
Line 15 (og:title):
```html
    <meta property="og:title" content="Amstel & Lirisha — Wedding Invitation" />
```
Line 24 (twitter:title):
```html
    <meta name="twitter:title" content="Amstel & Lirisha — Wedding Invitation" />
```
Line 31 (title):
```html
    <title>Amstel &amp; Lirisha — Wedding Invitation</title>
```

**Step 2: Verify**
```bash
grep -n "Priya" index.html || echo "CLEAN"
```
Expected: `CLEAN`

**Step 3: Commit**
```bash
git add index.html
git commit -m "chore: update meta tags to Lirisha"
```

---

## Part B — Background Music

### Task 5: Generate a royalty-free placeholder track

**Objective:** So the music feature works immediately without copyright issues, synthesize a short, gentle ambient loop (no melody, just a warm pad) with ffmpeg. The user later swaps in their real song.

**Files:**
- Create: `public/audio/wedding-theme.mp3` (generated)

**Step 1: Create the audio dir and generate a soft 20s loop**
```bash
cd /Users/m0vi0/amstel-wedding-invite
mkdir -p public/audio
ffmpeg -y -f lavfi -i "sine=frequency=220:duration=20" \
  -f lavfi -i "sine=frequency=277:duration=20" \
  -filter_complex "[0:a][1:a]amerge=inputs=2,afade=t=in:st=0:d=2,afade=t=out:st=18:d=2,volume=0.12" \
  -c:a libmp3lame -b:a 128k public/audio/wedding-theme.mp3
```

> NOTE: This is a placeholder **tone**, intentionally simple. Replace it with the couple's real song by dropping the file at `public/audio/wedding-theme.mp3` (same name) or updating the path in `src/data/wedding.ts` (Task 7).

**Step 2: Confirm it exists**
```bash
ls -la public/audio/wedding-theme.mp3
```

**Step 3: Commit**
```bash
git add public/audio/wedding-theme.mp3
git commit -m "chore: add royalty-free placeholder theme track"
```

---

### Task 6: Add the music source path to wedding data

**Objective:** Centralize the audio path so it's easy to swap, matching the rest of the content model.

**Files:**
- Modify: `src/data/wedding.ts` (add near top, after imports)

**Step 1: Add the constant**

After the imports / before `export const couple`, add:
```ts
export const music = {
  src: '/audio/wedding-theme.mp3',
  // Swap in your real song by replacing the file at public/audio/wedding-theme.mp3
  // or changing this path. Keep it short/loopable for background playback.
}
```

**Step 2: Verify import compiles**
```bash
npx tsc -p tsconfig.app.json --noEmit 2>&1 | grep -v "npm notice" | head
```
Expected: no output (clean)

**Step 3: Commit**
```bash
git add src/data/wedding.ts
git commit -m "feat: add music source path to wedding data"
```

---

### Task 7: Build the `MusicPlayer` component

**Objective:** A floating, minimal mute/unmute control that plays the background song. Handles the autoplay-with-sound restriction gracefully.

**Files:**
- Create: `src/components/layout/MusicPlayer.tsx`
- Modify: `src/App.tsx` (mount `<MusicPlayer />`)

**Step 1: Create the component**

`src/components/layout/MusicPlayer.tsx`:
```tsx
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { music } from '../../data/wedding'

export function MusicPlayer() {
  const reduced = useReducedMotion()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  // Try to start muted (browsers allow muted autoplay), then enable sound
  // on the first user interaction anywhere on the page.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.35
    audio.loop = true

    const tryPlay = () => {
      audio.play().then(() => setReady(true)).catch(() => {/* blocked, wait for gesture */})
    }
    tryPlay()

    const onFirstGesture = () => {
      if (!playing) {
        audio.play().then(() => { setPlaying(true); setReady(true) }).catch(() => {})
      }
      window.removeEventListener('pointerdown', onFirstGesture)
      window.removeEventListener('keydown', onFirstGesture)
    }
    window.addEventListener('pointerdown', onFirstGesture, { once: true })
    window.addEventListener('keydown', onFirstGesture, { once: true })
    return () => {
      window.removeEventListener('pointerdown', onFirstGesture)
      window.removeEventListener('keydown', onFirstGesture)
    }
  }, [playing])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  if (reduced) {
    // Respect reduced-motion: render the control but don't auto-start audio.
    return (
      <button
        onClick={toggle}
        aria-label="Play music"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold"
      >
        ♪
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={music.src} preload="auto" />
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggle}
          aria-label={playing ? 'Mute music' : 'Play music'}
          aria-pressed={playing}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-ivory/80 text-gold backdrop-blur transition-colors hover:bg-gold hover:text-ivory"
        >
          {playing ? '♫' : '♪'}
        </motion.button>
      </AnimatePresence>
      {ready && !playing && (
        <span className="sr-only">Music loaded — tap to play</span>
      )}
    </div>
  )
}
```

**Step 2: Mount it in `App.tsx`**

In `src/App.tsx`, add the import and render `<MusicPlayer />` alongside `<Navigation />`:
```tsx
import { MusicPlayer } from './components/layout/MusicPlayer'

export default function App() {
  return (
    <main className="relative">
      <Navigation />
      <MusicPlayer />
      <Hero />
      ...
```

**Step 3: Type-check + build**
```bash
npx tsc -p tsconfig.app.json --noEmit 2>&1 | grep -v "npm notice" | head
npm run build 2>&1 | grep -E "built|error" | tail -3
```
Expected: `✓ built`

**Step 4: Commit**
```bash
git add src/components/layout/MusicPlayer.tsx src/App.tsx
git commit -m "feat: background music player with autoplay-on-gesture"
```

---

### Task 8: Verify in the running dev server

**Objective:** Confirm the rename is reflected and the audio element loads without 404.

**Step 1: Check the audio file is served**
```bash
curl -s -o /dev/null -w "audio: %{http_code}\n" http://localhost:5173/audio/wedding-theme.mp3
curl -s -o /dev/null -w "lirisha img: %{http_code}\n" http://localhost:5173/images/couple/lirisha.webp
```
Expected: both `200`

**Step 2: Confirm no "Priya" remains in the built HTML/JS**
```bash
grep -rn "Priya" dist/ 2>/dev/null || echo "CLEAN (run build first if needed)"
```

**Step 3: Manual (user) check**
Open http://localhost:5173/ — the bride's name should read "Lirisha" in the hero and couple sections; a ♪ control sits bottom-right; clicking it (or any first interaction) starts the track; the icon toggles to ♫ when playing.

**Step 4: Commit any follow-up fixes if found**
```bash
git add -A && git commit -m "fix: post-verify cleanup for rename + music"
```

---

## How the User Adds Their Real Song (documentation, no code task)

1. Drop the MP3 at `public/audio/wedding-theme.mp3` (overwriting the placeholder), OR
2. Change `music.src` in `src/data/wedding.ts` to a new path, and put the file there.
3. Keep it loopable and reasonably short (30–90s) for background ambience; target ~128 kbps MP3.
4. If the song must NOT autoplay, set the `reduced` path to also start paused (already does) — or remove the `onFirstGesture` listeners in `MusicPlayer.tsx`.

---

## Risks, Tradeoffs & Open Questions

1. **Autoplay policy:** Browsers (Safari/Chrome) block sound until a user gesture. The plan handles this with muted-attempt + gesture upgrade. Some browsers may still require the explicit toggle tap — that's expected and the control is always available.
2. **Audio licensing:** The placeholder is a synthesized tone (safe). The user's real song must be theirs or properly licensed; this is their responsibility.
3. **Music + reduced-motion:** Under `prefers-reduced-motion`, audio does NOT auto-start (only the manual button is offered). This is intentional — motion/audio sensitivity.
4. **Filename casing:** `lirisha.webp` is lowercase to match the existing `amstel.webp` convention and avoid case-sensitivity issues on deploy (Linux hosts are case-sensitive).
5. **Monogram "A & L":** Used in the closing section signature and OG image. If the user prefers "L & A" or full initials, adjust `src/data/wedding.ts:119` and `scripts/gen-placeholders.sh:40`.
6. **Audio volume:** Default 0.35 — gentle background level. Adjust `audio.volume` in `MusicPlayer.tsx` if too loud/quiet.
7. **Build chunking:** `<audio>` is native, no new JS bundle weight.

---

## Execution Order Summary

| Phase | Tasks | Result |
|-------|-------|--------|
| A — Rename | 1-4 | All "Priya Mehta" → "Lirisha Dsouza" across data, images, OG, meta |
| B — Music | 5-8 | Placeholder track + MusicPlayer + autoplay-on-gesture + verify |

Total: 8 tasks, each 2–5 minutes.
