---
name: Athenaeum Digital
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  spine-title:
    fontFamily: Archivo Narrow
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  page-headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
  page-headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 30px
    fontWeight: '400'
    lineHeight: 36px
  page-body:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: Archivo Narrow
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-page: 2rem
  gutter-shelf: 1rem
  inset-paper: 1.5rem
  unit: 8px
---

## Brand & Style
The design system embodies the quiet, hallowed atmosphere of a world-class private library. It targets a scholarly audience—researchers, bibliophiles, and collectors—who value tactile permanence in a digital age. 

The design style is **Tactile / Skeuomorphic Modernism**. It blends the structural precision of modern digital interfaces with physical metaphors of the archival world: the weight of ivory paper, the grain of polished oak, and the gold-leaf detailing of rare editions. The goal is to evoke an emotional response of focus, heritage, and quiet luxury.

## Colors
The palette is rooted in traditional library materials. 
- **Primary (Ink):** Used for all critical text and structural strokes to maintain high legibility.
- **Secondary (Gilt):** Reserved for interactive highlights, premium status indicators, and ornamental accents.
- **Tertiary (Cream):** The foundational canvas color, softer than pure white to reduce eye strain.
- **Texture Bases:** Supplemental tokens provide specific hex values for "Oak" (header/navigation backgrounds) and "Parchment" (main content areas) to ground the interface in physical reality.

## Typography
Typography is treated as an archival element. 
- **Book Spines:** Uses **Archivo Narrow** for vertical and condensed horizontal labeling. It mimics the stamped brass type found on vintage bindings.
- **Open Pages:** Uses **Source Serif 4** for body text to ensure modern legibility with a classic, bookish feel.
- **Titles:** **Libre Caslon Text** provides the editorial authority required for major headings, appearing as if printed on high-quality paper stock.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy, centered like an open folio. 
- **Desktop:** A 12-column grid with wide 32px margins to simulate the "negative space" of a desk surface.
- **The "Shelf" Model:** Lists and galleries are organized into horizontal "shelves" with fixed heights and consistent 16px (2 units) gutters.
- **The "Folio" Model:** Reading views utilize a single-column, centered layout with a maximum width of 720px for optimal line lengths.

## Elevation & Depth
Elevation is not conveyed through abstract shadows, but through physical stacking.
- **Level 1 (The Desk):** The base background, often using the Oak or Mahogany texture tokens.
- **Level 2 (The Folio):** Content cards use the Parchment token with a subtle inner-glow to suggest the edge of a paper stack.
- **Spine Shadows:** Objects placed side-by-side (like books on a shelf) use a tight, 15% opacity black gradient on the left edge to simulate the curvature of a binding.
- **Gold Accents:** Interactive elements at the highest elevation use a subtle 1px "gilt" border (#d4af37) rather than a shadow to indicate prominence.

## Shapes
This design system utilizes **ROUND_EIGHT** (0.5rem) as its base shape language.
- **Standard (0.5rem):** Used for cards, buttons, and paper sheets, reflecting the slightly softened corners of well-handled books.
- **Large (1rem):** Used for "Book Covers" or primary containers to emphasize a heavy, protective exterior.
- **Sharp (0px):** Reserved exclusively for separators and decorative "brass" inlays.

## Components
- **Buttons:** Styled as leather-bound tabs or gold-stamped labels. Primary buttons use the Ink Black background with Gold Gilt text.
- **Cards (Books):** Vertical aspect ratios. Each card features a "Spine Shadow" on the left and a "Page Edge" (3px stacked lines) on the right.
- **Input Fields:** Styled as "ledger lines." Minimal borders on three sides with a slightly heavier bottom stroke, suggesting a line to be written upon.
- **Chips (Library Tags):** Small, Archivo Narrow labels with a subtle "parchment" fill and a 1px oak border.
- **The Bookmark (Indicator):** A vertical ribbon component in Gold (#d4af37) used to mark active states or saved items, hanging from the top of its parent container.