# Rehearsal: Pixelnest services bento + testimonial result card

Gold: `bento` (kept: one Stage per tile at 1:1, run-in copy outside the stage, one window in the grid, a single dark stat tile, beats staggered 110ms in reading order, play once). Changed: square tiles on the site's paper ground instead of rounded gray ones; pictures fill the slot under the copy (one gap below it) instead of being pinned to the bottom, so no band opens between copy and picture; Newsreader serif for the stat to match the page.

Beats (each tile once, as the grid scrolls in): dashboard chart draws and revenue rolls → +36% counts up → Send turns Sent → token lines draw and the button takes its style → the "Aa" specimen eases from light to medium weight → tools rise → top finding turns Fixed. Payoff holds; no loop.

Restyle after review: ruled grid on the paper ground, serif titles with numerals, ink controls, one coral accent, grayscale tool marks that take color on hover; the swatch chips were replaced by a type specimen. The dashboard window is now inset on both sides (bottom bleed only). Re-filmed in the browser at 1440 after these changes; the motion gate was not re-run.

Result card (testimonials): the figure rolls and the line eases to the new trend each time the testimonial rotates (6s, paused on hover).

Captured: 1440 and 390 stills of the bento, 1440 still of the testimonial card, the motion gate at 1440. Light look only (the page has no dark mode).

Film:
- framing: hero window gutter 0 above vs 28 left → moved the gutter inside the stage; cleared.
- sliver: last tool tile showed 20px at the edge → tile gap computed from the slot width so the edge cuts one tile through its middle; cleared.
- cut by the crop: "+18%" badge in the compact window → compact window is whole across (pinned bottom bleed); cleared.
- connectors offset 28px from the chips → Connectors moved to the stage root (rect() coordinates start there) and Stages render only after the slot is measured; cleared.
- half-pixel glyph in Sent → even-width label box; cleared.
- swatch "uneven gutters / uneven padding": the swatches are a deliberately centered, rotated object; the measurements are of rotated boxes. Stands.
- kit override (.ss-phone…, 36 lines): false positive. No phone is used; the bundled CSS keeps `@layer stageshow` (41 blocks). Film doesn't recognise the kit at `src/stageshow/kit`. Stands.
- jump: chart dot +2.6px at 1.62s: the kit's draw-in moves the dot along the steep last segment, inside a 40ms sampling gap. Stands; watch it in a real browser.
- Gate result: inconclusive (headless sampling gaps up to 40ms), not "rehearsal passed".

Assumptions: tool logos are the ones from the old Framer site plus the kit's Vercel and GitHub marks; "+36%" and the testimonial metrics come from the site's existing copy.

Unresolved: the gate never printed `rehearsal passed` because of the false positives above.

Not checked: Safari and Firefox; the 620–959px two-column layout (only 1440 and 390 were filmed); reduced-motion posters in a real browser; the result card at phone width.
