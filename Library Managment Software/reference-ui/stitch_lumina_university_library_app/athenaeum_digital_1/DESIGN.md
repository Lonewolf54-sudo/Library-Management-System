---
name: Athenaeum Digital
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
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
  tertiary-container: '#1c1b1d'
  on-tertiary-container: '#858385'
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
  tertiary-fixed: '#e5e1e3'
  tertiary-fixed-dim: '#c9c6c7'
  on-tertiary-fixed: '#1c1b1d'
  on-tertiary-fixed-variant: '#474648'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-tabular:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  sidebar-width: 280px
  max-content-width: 1440px
  gutter: 24px
---

## Brand & Style
The design system embodies an "Academic Professional" aesthetic—blending the authoritative heritage of a classical library with the precision of a modern enterprise data engine. It targets administrators who manage high-density information and require a UI that feels both prestigious and highly functional.

The style is **Modern Corporate** with **Minimalist** tendencies, utilizing high-contrast typography and a restricted color palette to maintain focus. It prioritizes information density without sacrificing clarity, using structured layouts and subtle elevation to organize complex data sets. The emotional response is one of trust, stability, and intellectual rigor.

## Colors
The palette is rooted in the "Scholar’s Palette." 

- **Primary (Deep Navy):** Used for structural elements like sidebar backgrounds, primary buttons, and heavy headings to convey authority.
- **Secondary (Antique Gold):** Reserved for accentuation, focus states, and meaningful highlights (e.g., active navigation indicators or specific CTAs).
- **Surface (Scholar’s Cream):** Used as the primary background in light mode to reduce eye strain compared to pure white, providing a sophisticated, paper-like quality.
- **Neutral:** A range of slates used for borders, secondary text, and iconography.

**Dark Mode Implementation:** In dark mode, the Deep Navy becomes the surface color, and the Scholar’s Cream transitions to a high-contrast off-white for typography. The Antique Gold remains consistent as the primary accent.

## Typography
This design system uses a dual-type approach to balance heritage with utility.

- **Libre Caslon Text:** Used for all editorial-style headings and page titles. It provides the "Athenaeum" feel—literary and established.
- **Hanken Grotesk:** The workhorse for the interface. It is used for all body text, dashboard metrics, and form inputs due to its exceptional legibility at small sizes and professional, modern character.
- **JetBrains Mono:** Utilized for technical labels, status badges, and metadata. Its monospaced nature ensures that alphanumeric IDs and status indicators align perfectly in dense tables.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for the main dashboard content to ensure data visualization consistency, while the sidebar remains fixed to the left viewport edge.

- **Grid System:** A 12-column grid with a 24px gutter. 
- **Density:** To accommodate high-density information, the system uses a 4px baseline. Components like data tables should utilize "Compact" (32px row height) or "Standard" (48px row height) spacing depending on the user's preference settings.
- **Sidebar:** The primary navigation resides in a 280px sidebar. On smaller desktop screens (under 1280px), the sidebar may collapse into an icon-only rail (72px).
- **Margins:** Page margins are set to 32px (lg) to provide breathing room around dense data cards.

## Elevation & Depth
Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines** rather than aggressive shadows.

- **Level 0 (Floor):** The background (Scholar’s Cream in light mode) is the lowest level.
- **Level 1 (Cards/Sidebar):** White backgrounds (in light mode) with a 1px solid border (#e2e8f0).
- **Level 2 (Hover/Active States):** Uses a very soft, ambient shadow (0px 4px 12px rgba(15, 23, 42, 0.05)) to suggest interactivity.
- **Level 3 (Modals/Dropdowns):** A more pronounced shadow (0px 12px 24px rgba(15, 23, 42, 0.1)) to separate overlays from the interface.

All cards utilize a 1px border to maintain a "structured ledger" look, ensuring that even in low-elevation states, elements are clearly defined.

## Shapes
The shape language is disciplined. 

- **Cards & Containers:** Use `rounded-lg` (1rem/16px) to soften the information-dense layout and provide a modern feel.
- **Buttons & Inputs:** Use a standard `rounded` (0.5rem/8px) for a crisp, professional appearance.
- **Badges:** Use a full "pill" radius for status indicators (Success, Warning, Error) to distinguish them from interactive buttons.
- **Icons:** Should follow a 2px stroke weight and squared-off ends to match the architectural feel of the brand.

## Components

### Data Tables
- **Header:** Sticky headers with a subtle #f8fafc background and 1px bottom border.
- **Cells:** Use `data-tabular` typography. Numbers must be right-aligned for easy comparison.
- **Status Badges:** Background tints corresponding to the status color (e.g., 10% opacity) with high-contrast text using `label-caps`.

### Metric Cards
- **Structure:** Title (label-caps), Value (headline-md), and a Sparkline Chart.
- **Sparklines:** Minimalist 2px stroke lines without axes, colored according to the trend (Success for up, Error for down).

### Sidebar Navigation
- **Active State:** A vertical 4px bar of Antique Gold on the left edge of the menu item, with the text switching to a medium weight.
- **Icons:** Sized at 20px, centered within a 40px hit area.

### Buttons & Inputs
- **Primary Button:** Deep Navy background, white text, 0.5rem rounded corners. On hover, the background shifts to a slightly lighter navy.
- **Inputs:** 1px border (#cbd5e1). On focus, the border changes to Antique Gold with a 2px outer "halo" of the same color at 20% opacity.

### Professional Forms
- Group related fields into sections using `headline-md` as a sub-header with a horizontal rule below it. Labels always sit above the input field in `body-sm` (medium weight).