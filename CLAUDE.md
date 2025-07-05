# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**The Scrap Pit** is an Astro-based combat sports training gym website featuring a brutalist design aesthetic. The site embodies the raw, uncompromising intensity of combat sports with a stark visual design system and advanced CSS effects.

- **Framework**: Astro (Static Site Generator)
- **Styling**: SCSS with custom brutalist design system
- **Theme**: Combat sports training gym
- **Design Philosophy**: Brutalist aesthetic with "big text, big content, big spaces"

## Common Commands

```bash
# Development
cd the-scrap-pit
npm run dev          # Start development server on http://localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands

# Dependencies
npm install          # Install dependencies
npm install sass     # SCSS support (already included)
```

## Architecture

### Project Structure
```
the-scrap-pit/
├── src/
│   ├── layouts/
│   │   └── FightLayout.astro     # Main layout with nav, footer, and cursor
│   ├── components/
│   │   ├── CombatButton.astro    # Brutalist button with impact animations
│   │   └── GritCursor.astro      # Custom cursor with trail effects
│   ├── styles/
│   │   ├── global.scss           # Global styles and utilities
│   │   ├── _variables.scss       # Design system variables
│   │   └── _color_filters.scss   # Advanced visual effects
│   └── pages/
│       └── index.astro           # Main landing page
├── public/
└── package.json
```

### Design System Colors
- **Primary 1 (Base)**: Ghost White (#F8F8FF) - Background and negative space
- **Primary 2 (Contrast)**: Iron Black (#1A1A1A) - Text and depth
- **Accent 1 (Aggression)**: Blood Red (#E00000) - CTAs and intensity
- **Accent 2 (Victory)**: Championship Gold (#CC9900) - Achievement and prestige

### Typography
- **Display Text**: Bebas Neue (massive, impactful headlines)
- **Body Text**: Space Mono (technical, raw, monospace feel)

### Key Visual Effects
1. **Monochrome to Color on Scroll**: Hero section transitions from B&W to color
2. **Duotone/Tritone Filters**: Applied to training section images
3. **Chromatic Displacement**: Glitch effect on fighter profile images
4. **Impact Animations**: Sharp, decisive button interactions
5. **Custom Cursor Trail**: Blood-red cursor with sharp-edged trail

## Key Components

### FightLayout.astro
- Main layout component with navigation, footer, and JavaScript
- Implements custom cursor, scroll effects, and impact animations
- Fixed navigation with brutalist styling
- Responsive design with mobile considerations

### CombatButton.astro
- Reusable button component with multiple variants (primary, accent, victory, ghost)
- Impact flash effects and hover animations
- Multiple sizes (small, medium, large, mega)
- Accessibility features and loading states

### GritCursor.astro
- Standalone custom cursor component
- Multiple variants (default, red, gold, minimal)
- Particle trail system with configurable length
- Hover effects for interactive elements
- Responsive (hidden on touch devices)

## Page Sections

### Hero: "The Arena Entrance"
- Fullscreen immersive section
- Monochrome to color scroll effect
- Massive typography with text shadows
- Dual CTA buttons

### Training: "The Gauntlet Stages"
- Three-column grid (Striking, Grappling, Conditioning)
- Duotone image filters (red-black, gold-black)
- Hover effects with shadow displacement
- Training statistics badges

### Fighters: "Iron Will Profiles"
- Dark background section
- Circular profile images with chromatic displacement
- Testimonial quotes with golden accents
- Responsive grid layout

### Join: "The Call to Arms"
- Call-to-action section with features grid
- Guarantee section with gold border
- Multiple button variants
- Responsive feature layout

## Development Guidelines

### SCSS Organization
- Import order: variables → color_filters → component styles
- Use design system variables for consistency
- Extend utility classes for common patterns
- Maintain responsive breakpoints

### Component Patterns
- Use Astro component syntax with TypeScript interfaces
- Implement prop validation and defaults
- Include accessibility features (focus states, ARIA labels)
- Follow responsive-first design principles

### Effects Implementation
- Leverage CSS filters for image effects
- Use CSS custom properties for dynamic values
- Implement JavaScript for scroll-triggered animations
- Maintain performance with efficient selectors

## Browser Support
- Modern browsers with CSS Grid and Flexbox support
- Custom cursor hidden on touch devices
- Reduced motion support for accessibility
- Progressive enhancement for advanced effects

## Performance Considerations
- Astro's zero-JS by default approach
- Minimal JavaScript for interactions only
- Optimized SCSS compilation
- Image optimization for filters and effects