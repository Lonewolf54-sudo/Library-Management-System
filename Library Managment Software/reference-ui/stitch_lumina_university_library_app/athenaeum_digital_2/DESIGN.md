---
name: Athenaeum Digital
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#79591d'
  on-secondary: '#ffffff'
  secondary-container: '#fdd089'
  on-secondary-container: '#78581c'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001453'
  on-tertiary-container: '#607cec'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffdeac'
  secondary-fixed-dim: '#ebc07a'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#5f4105'
  tertiary-fixed: '#dde1ff'
  tertiary-fixed-dim: '#b8c4ff'
  on-tertiary-fixed: '#001453'
  on-tertiary-fixed-variant: '#173bab'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is built on the narrative of the "Living Archive." It transforms the mobile device into a personal, high-fidelity gateway to a university’s intellectual wealth. The aesthetic is **Elevated Minimalism**, blending the prestige of a physical Ivy League library with the frictionless efficiency of a futuristic research tool.

The brand personality is scholarly, quiet, and authoritative. It avoids the frantic energy of social media in favor of a "deep work" environment. The UI evokes the tactile satisfaction of heavy paper, the precision of a well-inked manuscript, and the serenity of a stone-walled reading room. 

The visual strategy employs expansive white space (or deep charcoal space in dark mode) to allow the content—books, journals, and research—to remain the focal point. Subtle physical metaphors, such as "bookmark" tabs and "bookshelf" horizontal scrolling, are used sparingly to provide a grounded, intuitive experience without appearing dated.

## Colors

The palette is rooted in **Scholarly Prestige**. 

- **Primary (Deep Navy):** Used for core UI structure, headers, and high-level navigation to provide a sense of stability and institutional authority.
- **Secondary (Academic Gold):** Applied as a surgical accent for "prestige" actions—saving a rare manuscript, highlighting research, or indicating a "premium" status.
- **Tertiary (Academic Blue):** Used for functional interactions, links, and active states to maintain clarity against the deep navy.
- **Neutral (Parchment/Slate):** In light mode, the background is a very subtle off-white (#F8FAFC) to mimic high-quality paper. In dark mode, it shifts to a deep "Night Study" charcoal (#020617) to reduce eye strain during late-night research sessions.

## Typography

This design system utilizes a high-contrast typographic pairing to balance tradition and modernity.

- **The Editorial Serif (Source Serif 4):** Reserved for page titles, book titles, and section headers. It provides an authoritative, literary feel that mimics printed academic journals.
- **The Modern Sans (Hanken Grotesk):** Used for all functional UI elements, body copy, and metadata. Its high legibility and contemporary geometry keep the app feeling "tech-forward" and accessible.
- **Formatting:** Headlines should use tighter tracking to feel "set" like a physical book cover. Labels use wide tracking and uppercase styling to denote categorization and hierarchy without adding visual bulk.

## Layout & Spacing

The layout philosophy follows a **Breathable Grid** model. Given the text-heavy nature of a library app, white space is treated as a functional tool to prevent cognitive overload.

- **Grid:** A 4-column mobile grid with 24px side margins.
- **Vertical Rhythm:** Elements are stacked in multiples of 8px. Use 48px spacing between major sections to emphasize a "chapter-based" navigation feel.
- **Horizontal Scrolling:** Used for "Shelf" layouts. Ensure the first element is aligned with the 24px margin, with the subsequent element partially visible to indicate "off-screen" content.
- **Safe Areas:** Generous padding at the top of screens (minimum 32px below the status bar) ensures titles feel framed, like a well-designed book page.

## Elevation & Depth

Hierarchy is achieved through **Tonal Elevation** and **Soft Diffusion** rather than harsh borders.

- **Surface Layers:** The background is the lowest level. Cards and containers sit on "Level 1," using a slightly different shade (lighter in light mode, more translucent in dark mode).
- **Shadows:** Use extremely soft, long-spread shadows (Blur: 30px, Y: 10px, Opacity: 4% Black) to create a "floating paper" effect.
- **The "Glass Archive":** Modals and navigation bars use a high-density backdrop blur (20px) with a 70% opacity fill of the background color. This creates a futuristic, layered depth that keeps the user grounded in their current context.
- **Paper Texture:** Apply a very subtle, low-opacity grain overlay (2% opacity) to cards to give them a tactile, organic quality.

## Shapes

The shape language is **Refined & Intentional**.

- **Cards & Containers:** Use a 16px (1rem) radius. This softens the scholarly "seriousness" of the app, making it feel modern and approachable.
- **Interactive Elements:** Small buttons and input fields use a slightly smaller 8px radius for a more precise, functional appearance.
- **The "Bookmark" Tab:** Elements like category tags or saved item indicators should have one corner (top right) squared off while the others remain rounded, mimicking a folded page or a physical bookmark.

## Components

- **The Scholarly Card:** The primary unit for displaying books or articles. Includes a subtle grain texture, a 16px corner radius, and the "Source Serif 4" typeface for the title. Metadata is displayed in "Hanken Grotesk" labels.
- **Primary Action Button:** Full-width or large-inset buttons using the Deep Navy background with Gold text. Transitions should be slow and elegant (300ms ease-out).
- **The Shelf (Carousel):** A horizontal list of cards. The container should have no visible scrollbar, relying on the "peek" of the next card to signify movement.
- **Refinement Chips:** Pill-shaped filters using a light-blue tinted background. When active, they transition to the Tertiary Blue with white text.
- **Search Bar:** A minimalist, "ghost" style input with a subtle 1px border in a muted neutral. When focused, the border glows slightly with the Tertiary Blue.
- **Reading Progress Bar:** A thin, 2px line using Academic Gold. It sits at the very top of a book detail page or as a subtle underline on a card to show how much of a text has been consumed.