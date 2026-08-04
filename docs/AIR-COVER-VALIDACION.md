# Air Cover: playbook de validacion de traccion

Este documento define como lanzar la landing con ads y tomar una decision objetiva de produccion piloto.

## 1) Tracking implementado en la landing

Archivo: `/workspace/08-air-cover/index.html`

Eventos instrumentados:

- `view_content`: visita de la landing.
- `view_item`: interes por modelo y comparador before/after.
- `contact`: click a WhatsApp, mail o links de contacto.
- `lead`: formulario enviado con exito.
- `begin_checkout`: interes fuerte (seña reembolsable).
- `purchase`: confirmacion de pago via `?payment=success`.

Campos UTM capturados:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Tambien se guarda primer toque en `localStorage` (`palma_first_touch`) y se manda en hidden field `first_touch`.

## 2) Configuracion minima antes de lanzar ads

1. Reemplazar el endpoint de Formspree en la landing:
   - Buscar en `index.html`: `action="https://formspree.io/f/mblkewop"`
   - Cambiar por endpoint real de tu cuenta.
2. Instalar IDs reales:
   - Meta Pixel (si usas `fbq`).
   - Google Analytics 4 (si usas `gtag`).
3. Confirmar WhatsApp de negocio en todos los links `wa.me`.
4. Confirmar email de soporte (`info@palma-cover.com`) o reemplazarlo.

## 3) Oferta de validacion recomendada

La landing ya incluye 3 ofertas:

1. `lista-espera` (bajo compromiso, alto volumen).
2. `sena-reembolsable` (intencion fuerte).
3. `muestra-estudio` (B2B: arquitectos/interioristas).

Regla:

- Leads de lista miden interes.
- Leads de seña miden viabilidad comercial real.
- Muestras miden potencial B2B y ticket por volumen.

## 4) Experimentos de anuncios (fase de traccion)

### Plataforma inicial

- Meta Ads primero.
- Google Search en segunda etapa (si aparecen busquedas de alta intencion).

### Estructura recomendada

- 1 campana por objetivo (`Leads`).
- 3 ad sets por angulo creativo.
- 2-3 audiencias por ad set:
  - intereses interiorismo/deco/arquitectura,
  - lookalike (si luego hay base),
  - remarketing de visitantes.

### Angulos creativos

1. `antes-despues`:
   - Gancho: "Oculta el split sin obra."
2. `premium-arquitectos`:
   - Gancho: "Materialidad y silencio visual."
3. `instalacion-compatibilidad`:
   - Gancho: "15 minutos, multi-marca."

### Convencion UTM

Usar siempre:

- `utm_source`: `meta` o `google`
- `utm_medium`: `paid-social` o `paid-search`
- `utm_campaign`: `aircover_validacion_fase1`
- `utm_content`: variante creativa (`antes_despues_v1`, `premium_v2`)
- `utm_term`: audiencia o keyword

Ejemplo:

`https://tu-dominio.com/08-air-cover/index.html?utm_source=meta&utm_medium=paid-social&utm_campaign=aircover_validacion_fase1&utm_content=antes_despues_v1&utm_term=intereses_interiorismo`

## 5) Framework go / no-go para producir

Definir una ventana fija de analisis (misma cantidad de dias y presupuesto por angulo) y decidir con estos umbrales:

- CPL objetivo (lead): <= ARS 18.000
- Tasa visita->lead: >= 4.0%
- % leads calificados: >= 35%
- % intencion fuerte (seña o reunion agendada): >= 12%

### Regla de decision

- **GO**: se cumplen al menos 3 de 4 metricas, incluyendo `intencion fuerte`.
- **ITERAR**: si CPL y conversion fallan pero hay interes por un modelo puntual.
- **NO-GO**: si no aparece demanda calificada sostenida.

## 6) Operacion diaria de validacion

Registrar en una hoja unica:

- fecha
- fuente / campana / ad set / anuncio
- modelo elegido
- tipo de interes (`lista`, `sena`, `muestra`)
- presupuesto estimado cliente
- estado (`nuevo`, `contactado`, `calificado`, `descartado`, `venta`)

Checklist diario:

1. responder leads < 1 hora habil.
2. clasificar cada lead.
3. revisar anuncios caros sin conversion.
4. mover presupuesto a creativos con mejor `lead rate`.

