---
target: 06-cerrajeria/
total_score: 30
p0_count: 1
p1_count: 3
timestamp: 2026-07-16T22-25-18Z
slug: 06-cerrajeria-index-html
---
# Critique · 06-cerrajeria/

Method: DEGRADED single-context (no sub-agent tool exposed).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Bug runtime: 30/42 (71%) elementos .rv siguen opacity:0 tras cargar |
| 2 | Match System / Real World | 4 | Vocabulario y marcas reales |
| 3 | User Control and Freedom | 3 | Nav mobile drawer con aria-expanded |
| 4 | Consistency and Standards | 3 | Pesos de línea mezclan 1/3/4px sin regla |
| 5 | Error Prevention | 3 | Sin forms |
| 6 | Recognition Rather Than Recall | 4 | Todo etiquetado, tel repetido |
| 7 | Flexibility and Efficiency | 2 | Sólo tap-para-llamar |
| 8 | Aesthetic and Minimalist Design | 3 | Highlighter repetido en 4 lugares |
| 9 | Error Recovery | 3 | n/a |
| 10 | Help and Documentation | 3 | FAQ cubre lo típico |
| Total | | 30/40 | Good con salvedad |

## Priority Issues

- P0 reveals-bug: 71% de .rv ocultos (overflow-x:hidden en body + IntersectionObserver rompen scroll detection). Fix: sacar reveals o mover overflow a wrapper. → /impeccable harden
- P1 estrellas-fiverr: 5 estrellas gigantes en reseñas violan anti-referencia explícita del PRODUCT.md padre. → /impeccable distill
- P1 numbered-markers: 01-06 en servicios (detector confirmado, no son secuencia). → /impeccable layout o /impeccable typeset
- P1 side-stripe-border: hero-deck usa border-left:3px red — absolute ban de la skill. → /impeccable polish
- P2 tel-designer: 11 enlaces al teléfono personal de Teo en el demo. Fix manual.
- P3 space-grotesk: en reflex-reject list. → /impeccable typeset

## Detector findings
- 1× overused-font (Space Grotesk)
- 3× design-system-font (Bodoni Moda, Source Serif 4, Space Grotesk fuera de DESIGN.md — falso positivo por principio "cada demo defiende su rubro")
- 1× numbered-section-markers (01/02/03/04/05/06)

## Personas
- Casey (mobile): CTA below fold en 375px; bug reveal empeora; FAB rescata parcialmente
- Jordan (first-timer): falta rango orientativo de precios
- Riley (stress): detectaría tel personal, estrellas literales, "presupuesto sin cargo" sin form real
