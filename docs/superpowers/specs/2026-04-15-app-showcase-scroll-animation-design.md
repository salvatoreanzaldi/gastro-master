# App Showcase Scroll Animation — Design Spec

**Date:** 2026-04-15  
**Feature:** iPhone App Screenshot Carousel mit Pendel-Scroll-Animation  
**Status:** Design Approved ✅

---

## 1. Overview

Eine neue Sektion auf der Landingpage, die die **5 App-Screenshots** (Startbild, Bestellart, Filialen, Menü, Benutzerkonto) mit einer smooth **Pendel-Scroll-Animation** zeigt. Die iPhones bewegen sich synchron von rechts nach links, während sie sich um die X-Achse (oben hin zum Zentrum) neigen — wie ein Pendel, das am unteren Ende fixiert ist.

**Placement:** Nach `VideoTestimonialSection` (YouTube-Videos), vor `PositioningSection` ("Du machst die Arbeit...")

---

## 2. Feature Scope

### Funktionalität
- ✅ Alle 5 iPhones bewegen sich **gleichzeitig** (synchrone Animation)
- ✅ Scroll-basierte Animation (Seiten-Scroll triggert die Bewegung)
- ✅ Keine Überlappung der iPhones
- ✅ Text-Labels für jeden Screenshot (z.B. "Bestellart", "Menü")
- ✅ Responsive Design: 3 iPhones auf Desktop, 2 auf Tablet, 1.5 auf Mobile
- ✅ i18n-Integration (deutsche Copy, SEO-optimiert)

### Non-Features (bewusst ausgeschlossen)
- ❌ Click-to-enlarge oder Modal-Popup für Screenshots
- ❌ Autoplay/Carousel-Navigation (reine Scroll-Animation)
- ❌ Video-Playback in den Screenshots
- ❌ 3D-Perspektive Kamera (nur rotateX, keine komplexe 3D-Matrie)

---

## 3. Animation Specification

### Animation Values

| Parameter | Start | End | Explanation |
|---|---|---|---|
| **Scroll Progress** | 0 | 1 | Seiten-Scroll-Position (normalized) |
| **translateX** | +300px (Desktop) | -300px (Desktop) | iPhones fahren von rechts nach links |
| **rotateX** | -45° | +45° | Pendelbewegung (10–2 Uhr Rotation) |
| **Duration** | Scroll-basiert | (keine feste Dauer) | Animiert mit Page-Scroll, nicht Timed |

### Easing
- **Type:** Linear (konstante Geschwindigkeit mit Scroll)
- **Reason:** Scroll-basierte Animationen fühlen sich nicht-linear an, wenn sie linear sind; daher linear für echte 1:1 Scroll-Reaktivität

### Rotation Formula
```
rotateX = -45 + (scrollProgress * 90)
// Beispiel:
// scrollProgress = 0   → rotateX = -45°
// scrollProgress = 0.5 → rotateX = 0°
// scrollProgress = 1   → rotateX = +45°
```

### Container Height Calculation
Der ScrollContainer muss Höhe haben, um Scroll-Raum zu schaffen:
```
containerHeight = viewport height + extra scroll buffer
// Typisch: 150vh oder 200vh, damit user scrollen kann
```

---

## 4. Responsive Behavior

### Desktop (lg: 1024px+)
- **Visible iPhones:** 3
- **iPhone Width:** ~340px
- **Gap:** 24px
- **translateX Range:** +400px → -400px
- **Overflow:** `overflow-x-hidden` (kein Scrollbar)

### Tablet (md: 768px–1023px)
- **Visible iPhones:** 2
- **iPhone Width:** ~300px
- **Gap:** 16px
- **translateX Range:** +300px → -300px

### Mobile (sm: < 768px)
- **Visible iPhones:** 1.5 (zeigt teilweise das nächste)
- **iPhone Width:** ~280px
- **Gap:** 12px
- **translateX Range:** +250px → -250px

---

## 5. Component Structure

### File: `src/components/landing/AppShowcaseSection.tsx`

```
AppShowcaseSection (Functional Component)
├── useScroll() hook für Seiten-Scroll-Tracking
├── useTransform() für translateX und rotateX
├── Section Header
│   ├── Badge (optional, z.B. "APPS")
│   ├── Headline (SEO-optimiert)
│   └── Subtitle
├── ScrollContainer (motion.div mit useScroll ref)
│   └── iPhone Carousel (5x)
│       ├── motion.div (mit Animationen)
│       ├── iPhone Frame (Bezel, Radius, Shadow)
│       ├── Screenshot Image
│       └── Label Text (unter/über iPhone)
└── [Optional] Progress Indicator
```

### Data Structure

```typescript
// Aus i18n: public/locales/de/common.json
{
  "appShowcase": {
    "headline": "...", // von gastro-master-sprache
    "subtitle": "...",
    "screens": [
      {
        "id": "startbild",
        "label": "Startbild",
        "description": "Deine Seite — dein Eindruck",
        "image": "Take - Startbild 2.png"
      },
      // ... 4 weitere
    ]
  }
}
```

---

## 6. Styling & Design Tokens

### Colors
- **Background:** `bg-background` (konsistent mit Seite)
- **Text:** `text-foreground` (Headlines), `text-muted-foreground` (Subtitles)
- **iPhone Frame:** `border-primary-foreground/20` (subtle border)
- **Shadow:** Multi-layer `shadow-2xl` + custom blur-effect

### Typography
- **Headline:** `text-3xl md:text-4xl lg:text-5xl font-black`
- **Subtitle:** `text-lg text-muted-foreground`
- **Label:** `text-sm md:text-base font-semibold`

### iPhone Frame Design
```
- Border Radius: 48px (iPhone 15 Pro style)
- Border: 1px solid primary-foreground/20
- Aspect Ratio: 9/19.5 (iPhone Screen)
- Box Shadow: 
  - Outer: 0 25px 50px rgba(0,0,0,0.15)
  - Inner: 0 0 0 1px rgba(255,255,255,0.1)
```

---

## 7. i18n Integration

### Keys in `public/locales/de/common.json`

```json
{
  "appShowcase": {
    "badge": "UNSERE APPS",
    "headline": "...", // [gastro-master-sprache optimiert]
    "subtitle": "...", // [gastro-master-sprache optimiert]
    "screens": [
      { "label": "Startbild", "description": "..." },
      { "label": "Bestellart", "description": "..." },
      { "label": "Filialen", "description": "..." },
      { "label": "Menü", "description": "..." },
      { "label": "Benutzerkonto", "description": "..." }
    ]
  }
}
```

### Implementation
```typescript
const { t } = useTranslation("common");
const screens = t("appShowcase.screens", { returnObjects: true });
```

---

## 8. Performance Considerations

### Animation Performance
- ✅ **GPU-accelerated:** `translateX` + `rotateX` sind beide GPU-beschleunigt
- ✅ **No Layout Thrashing:** Keine dynamischen Größen-Berechnungen während Animation
- ✅ **Passive Scroll Listener:** `useScroll()` nutzt passive Event-Listener (Framer Motion default)

### Image Optimization
- Screenshot-Assets sind bereits PNG-compressed (~800KB–1MB pro Bild)
- Optional: WebP variants oder Lazy Loading hinzufügbar (Phase 2)

### Browser Support
- Chrome, Safari, Edge: ✅ (CSS Transform 3D + Framer Motion)
- Firefox: ✅ (volles Support)
- Mobile Safari: ⚠️ (getestet mit ios 17+, eventuell `will-change` CSS nötig)

---

## 9. Placement in Index.tsx

```typescript
// src/pages/Index.tsx
import AppShowcaseSection from "@/components/landing/AppShowcaseSection";

// In der Sektion-Reihenfolge:
<VideoTestimonialSection />  {/* YouTube Videos */}
<AppShowcaseSection />       {/* 👈 NEU */}
<PositioningSection />       {/* "Du machst die Arbeit..." */}
```

---

## 10. Testing & Validation

### Manual Testing Checklist
- [ ] Desktop (1440px): 3 iPhones sichtbar, smooth Scroll-Animation
- [ ] Tablet (768px): 2 iPhones sichtbar, responsive
- [ ] Mobile (375px): 1.5 iPhones sichtbar, keine Layout-Breaks
- [ ] Rotation sichtbar: iPhone neigt sich von -45° zu +45°
- [ ] Keine Überlappung: GAP ist konstant
- [ ] Text-Labels lesbar auf allen Screens
- [ ] i18n funktioniert (Deutsch, andere Sprachen)
- [ ] Performance: 60fps auf Scroll (DevTools Performance Tab)

### Edge Cases
- [ ] Mobile Safari: Rotation-Animation smooth?
- [ ] Sehr langsames Scrolling: translateX/rotateX bleibt synchron?
- [ ] Schnelles Scrolling: Keine Jank/Flicker?
- [ ] Zoom-Level 150%+: Layout zerbricht?

---

## 11. Known Limitations & Future Improvements

### Limitations
1. **Rotation nur auf X-Achse** — keine echte 3D-Kamera-Perspektive (bewusst gewählt für Stabilität)
2. **Scroll-basiert** — keine Möglichkeit, einzelne iPhones zu interagieren (nur visuelle Scroll-Animation)

### Phase 2 (Future)
- [ ] WebP image variants für bessere Performance
- [ ] Lazy-loading für Screenshots
- [ ] Click-to-enlarge mit Modal
- [ ] Swap zwischen Portrait/Landscape für Detail-View

---

## 12. Dependencies

- `framer-motion`: `useScroll`, `useTransform`, `motion.div`
- `react-i18next`: Translation keys
- `tailwindcss`: Styling, Responsive Utilities
- Bestehende: `src/assets/screenshots/Take - *.png` (5 Files)

---

## 13. Success Criteria

✅ **Animation läuft smooth** (60fps)  
✅ **Keine Überlappung der iPhones** (konstanter Gap)  
✅ **Text-Labels sind lesbar** und passen zum Seiten-Design  
✅ **Responsive** auf allen Breakpoints (Desktop, Tablet, Mobile)  
✅ **i18n funktioniert** (Deutsch, SEO-optimiert)  
✅ **Placement** zwischen Video- und PositioningSection  
✅ **Keine Regressions** in anderen Sektionen
