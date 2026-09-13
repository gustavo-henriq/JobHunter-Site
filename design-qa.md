# Design QA — JobHunter landing page

## Evidence

- Source visual truth: `C:\Users\Carlos\Projetos\jobhunter-site\design-reference-modular-profiles.png`
- Browser-rendered implementation: `C:\Users\Carlos\Projetos\jobhunter-site\qa-modular-implementation.png`
- Normalized source: `C:\Users\Carlos\Projetos\jobhunter-site\qa-source-normalized.png`
- Side-by-side comparison: `C:\Users\Carlos\Projetos\jobhunter-site\qa-modular-comparison.png`
- Telegram section capture: `C:\Users\Carlos\Projetos\jobhunter-site\qa-telegram-section.png`
- Source pixels: 1487 × 1058.
- Implementation pixels / CSS viewport: 1265 × 712 at 1× density.
- Normalization: the source was center-fitted to 1265 × 712 for an equal-size, same-state comparison.
- State: desktop, dark theme, final `Oportunidades` stage with all four layers assembled.

## Full-view comparison

The implementation preserves the selected concept's split hierarchy, oversized editorial headline, acid-lime emphasis, technical grid, angled overlapping layers, vertical connector, subdued intermediate states, and highlighted result. The final result remains the strongest plane and the copy-to-diagram balance is consistent with the source.

## Required fidelity surfaces

- Fonts and typography: Inter/system sans reproduces the source's compact grotesk feel; weights, line-height, wrapping, and hierarchy remain legible at the tested viewport.
- Spacing and layout rhythm: the two-column proportions, layer offsets, step index, and negative space match the source closely without clipping.
- Colors and visual tokens: the existing `--ink`, `--panel`, `--mint`, and `--acid` tokens map cleanly to the reference palette with sufficient contrast.
- Image quality and asset fidelity: the delivery showcase now uses a dedicated 1536 × 1024 atmospheric raster behind a native, responsive interface. The generated asset has no baked-in UI or text, so all essential content stays crisp and accessible.
- Copy and content: profile, competencies, search criteria, result, historical 82% reduction, Telegram delivery explanation, and contact CTA are present and consistent.

Focused region comparison was not required because every important layer label, status, headline, and score is readable in the equal-size side-by-side evidence. The Telegram image was inspected separately at its rendered section size.

## Comparison history

### Pass 1

- P2: the first scroll frame was too empty when entered from navigation.
- P2: the inherited vertical scroll cue overlapped the result layer.
- Fixes: made the first profile layer and opening headline visible immediately, advanced the remaining reveals progressively, and removed the competing vertical cue.

### Pass 2

- Post-fix evidence: `qa-modular-comparison.png`.
- No remaining P0, P1, or P2 differences. The implementation intentionally activates step 03 when the result is fully assembled, which improves interaction clarity over the static source's step-02 label.

## Interaction and runtime checks

- Main navigation to `#perfis`: passed.
- Stage control from Identidade to Oportunidades: passed.
- External Telegram CTA exposes `https://t.me/gutosmboy`: passed.
- Browser console errors in a fresh preview tab: none.
- Lint, production build, rendered HTML tests, and whitespace checks: passed.

## Responsive polish

- Hero, accumulated evidence, Telegram delivery, and incremental-efficiency sections were inspected at a 568 px in-app-browser viewport.
- The 145/74/71 evidence cards and 83/78/−42 comparison stack without horizontal overflow.
- The seven-source strip remains intentionally horizontally scrollable on narrow screens.

## Telegram delivery redesign

### Evidence

- Source visual truth: Raycast Teams product showcase at `https://www.raycast.com/teams`, captured in the Codex in-app browser on 2026-09-03.
- Implementation: `http://localhost:3000/?preview=telegram#entrega`, captured in the same in-app browser.
- Reference and implementation viewport: 568 × 560 CSS px at 1× density.
- State: dark theme, narrow responsive layout, Telegram-inspired delivery panel fully visible.
- Generated background asset: `C:\Users\Carlos\Projetos\jobhunter-site\public\jobhunter-delivery-atmosphere-green-v2.png` (1536 × 1024).

### Visual comparison

- Typography: the implementation follows the reference hierarchy with one large, sharp focal title and quieter supporting UI copy. JobHunter's existing type system is retained intentionally.
- Spacing and layout: both designs use an oversized atmospheric frame, a centered crisp product surface, clipped peripheral surfaces, and generous depth around the focal panel.
- Colors and tokens: the Raycast depth treatment is translated entirely into JobHunter's ink, deep-green, mint, and restrained acid-lime palette; the earlier isolated magenta treatment was removed.
- Image quality: the background remains soft and atmospheric while the HTML interface and title render sharply at every density.
- Copy: the example communicates match score, role, company, rationale, competencies, source, and next action without pretending to be a literal Telegram screenshot.
- Interaction: the primary panel lifts subtly on hover; the panel action and all illustrative opportunity cards open `https://t.me/gutosmboy`; responsive content remains readable without horizontal overflow.

The two captures were inspected at equal viewport dimensions. A persisted side-by-side file was not produced because the in-app browser does not expose screenshot-file export, but both source and implementation were opened and compared at the same viewport and state.

### Findings and iteration history

- Pass 1 P2: the previous treatment read as a rectangular screenshot pasted into the page rather than product UI integrated with the composition.
- Fix: replaced the rasterized Telegram screenshot with a responsive interface over a generated atmospheric background, added clipped low-focus context panels, and concentrated sharpness on the score and job title.
- Pass 2: no remaining P0, P1, or P2 issues at the tested viewport. The partially visible peripheral panels are intentional and match the selected depth language.
- Pass 3: recolored the atmosphere and Telegram-inspired surface to the site's existing green tokens, labeled the opportunity cards as illustrative, and added dedicated rules below 420 px for title, tags, metadata, and CTA wrapping.
- Console errors or warnings: none.
- Lint: passed.
- Production build: passed.
- Rendered HTML tests: 2 passed.

final result: passed

## Data evidence audit — 2026-09-03

- Local evidence reviewed: 45 log files, including 34 completed pipeline summaries from 2026-07-12 through 2026-09-03.
- Accumulated delivery: 145 new Telegram alerts — 74 for IA/Web and 71 for Psicologia/RH/Comunicação.
- Detailed audit coverage: 133 delivery lines with scores from 65 to 100; 12 older deliveries are supported only by run-level totals.
- Historical reduction retained from the measured 528 → 92 round: 82.6%, displayed as 82% in the headline.
- Latest same-day comparison: 83.3% of collected jobs recognized in Bronze, 77.9% of accepted jobs reused an existing score, and cycle duration fell from 5m27s to 3m10s.
- Removed from the public page: unsupported 79% unique-jobs rate, generic 64% cache rate, 100% stability/completion claims, and 0% reprocessing claim.
- Resilience is described as an architectural behavior rather than an error-free guarantee: isolated source workers preserve collected listing data, AI can continue from valid cached scores, and notification claims prevent duplicate sends.
