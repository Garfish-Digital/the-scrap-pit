// Clip-path geometry shared by the preloader and the Cut. All polygons are
// six points so GSAP can morph between them. Percentages are of the overlay
// square, whose side is max(100vw, 100vh); the rising diagonal is the cut.
//
// Upper (red) piece: hypotenuse x + y = 99.5%; lower (ink) piece: x + y = 100.5%.
// The 1% between them is the tear; the ghost-white drop-shadows on each piece
// (see pit-overlay.css) draw its edges. A void [v0, v1] turns each triangle
// into a bracket by inserting three points at the void's corners.

const RED_HYP = 99.5
const INK_HYP = 100.5

export function redBracket(v0: number, v1: number) {
  void v1
  // (0,0) → (93.75,0) → hypotenuse at y=v0 → void top-left corner → hypotenuse at x=v0 → (0,93.75)
  return `polygon(0% 0%, ${RED_HYP}% 0%, ${RED_HYP - v0}% ${v0}%, ${v0}% ${v0}%, ${v0}% ${RED_HYP - v0}%, 0% ${RED_HYP}%)`
}

export function inkBracket(v0: number, v1: number) {
  void v0
  // (100,100) → (6.25,100) → hypotenuse at y=v1 → void bottom-right corner → hypotenuse at x=v1 → (100,6.25)
  return `polygon(100% 100%, ${100 - RED_HYP}% 100%, ${INK_HYP - v1}% ${v1}%, ${v1}% ${v1}%, ${v1}% ${INK_HYP - v1}%, 100% ${100 - RED_HYP}%)`
}

// Triangles with the void collapsed to the hypotenuse midpoint (same point count).
export const RED_CLOSED = `polygon(0% 0%, ${RED_HYP}% 0%, ${RED_HYP / 2}% ${RED_HYP / 2}%, ${RED_HYP / 2}% ${RED_HYP / 2}%, ${RED_HYP / 2}% ${RED_HYP / 2}%, 0% ${RED_HYP}%)`
export const INK_CLOSED = `polygon(100% 100%, ${100 - RED_HYP}% 100%, ${INK_HYP / 2}% ${INK_HYP / 2}%, ${INK_HYP / 2}% ${INK_HYP / 2}%, ${INK_HYP / 2}% ${INK_HYP / 2}%, 100% ${100 - RED_HYP}%)`

/** The Cut's resolved mark: a 30% void. */
export const CUT_VOID: [number, number] = [35, 65]
/** The preloader's assembled mark: a 14% void (the site glimpsed through it). */
export const BOOT_VOID: [number, number] = [43, 57]
/** Fully open: the void has swallowed the viewport. */
export const OPEN_VOID: [number, number] = [-30, 130]
