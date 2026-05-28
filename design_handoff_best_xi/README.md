# Handoff · Best XI redesign

> Adaptación visual del repo [`Fdobboletta/best-XI-app`](https://github.com/Fdobboletta/best-XI-app).
> Variante elegida: **A · Pill refinado**. Tono de cancha **grass**. Acento **#C4F542** (lima). Mostrar nombre y club: **sí**.

---

## 1. Sobre estos archivos

Los archivos en este bundle son **referencias de diseño** hechos en HTML/React-Babel-in-browser. **No son código de producción listo para copiar**. La tarea es **recrear este diseño dentro del Next.js existente** (`src/app/...`), aprovechando la estructura de carpetas y los datos que ya están conectados (FBref/Transfermarkt vía Drizzle).

Concretamente: mantener la lógica server-side de `page.tsx` y `fetch*` intactas. Reemplazar los siguientes componentes presentación-only:

| Componente actual | Componente nuevo |
| --- | --- |
| `src/app/page.tsx` (header + layout) | layout con header pulido, stage grid 2-col (pitch + panel) |
| `src/app/components/FilterBar.tsx` | filter bar con week stepper + segmented chips |
| `src/app/components/SoccerPitch/SoccerPitch.tsx` | pitch SVG con áreas + semicírculos + esquineros |
| `src/app/components/SoccerPitch/PlayerCard.tsx` | `ChipPill` (variante A) |
| `src/app/components/SoccerPitch/PlayerTooltip.tsx` | `DetailPanel` (slide-in lateral, no popover) |
| `src/app/globals.css` | nuevo set de tokens + fuentes |

---

## 2. Fidelidad

**Alta fidelidad.** Colores, tipografías, tamaños, radios y espaciados son finales. El developer debería conseguir paridad pixel-perfect adaptando el código al stack del repo (Next 15 + Tailwind 4 + Radix). Si Radix Popover desaparece (porque cambiamos a panel lateral), no hace falta nada nuevo de Radix; con `useState` alcanza.

---

## 3. Pantalla única — `Home` (`src/app/page.tsx`)

### Layout

```
┌───────────────────────────────────────────────────────────────────┐
│  HEADER                                                            │
│  ┌──────────────────────────────────┬────────────────────────────┐ │
│  │ eyebrow + h1 (Premier League)    │ meta: temporada + formación│ │
│  └──────────────────────────────────┴────────────────────────────┘ │
├───────────────────────────────────────────────────────────────────┤
│  FILTER BAR  (week stepper · age segmented · value segmented)      │
├───────────────────────────────────────────────────────────────────┤
│  STAGE — grid 2 columnas                                           │
│  ┌──────────────────────────────────────┬─────────────────────┐   │
│  │  PITCH (aspect-ratio 100/66)          │  DETAIL PANEL      │   │
│  │  11 slots posicionados con left/top % │  (vacío o jugador) │   │
│  └──────────────────────────────────────┴─────────────────────┘   │
├───────────────────────────────────────────────────────────────────┤
│  FOOTER — créditos + leyenda de colores de score                   │
└───────────────────────────────────────────────────────────────────┘
```

- App container: `display: grid; grid-template-rows: auto auto 1fr; background: radial(80% 60% at 50% -10%, rgba(196,245,66,0.06), transparent) + var(--bg);`
- Paddings horizontales: **40px**. Header padding-top **32px**, padding-bottom **24px**.
- Stage gap **24px**, columnas `minmax(0, 1fr) 340px`. En viewport < 1024px colapsar a una sola columna y el panel pasa a un drawer inferior.

### Header

- **Eyebrow** (línea pequeña arriba del título): mono-uppercase con bullet `var(--accent)` luminoso a la izquierda. Texto: `"PREMIER LEAGUE · ONCE IDEAL"`. `font-family: JetBrains Mono; font-size: 11px; letter-spacing: 0.18em; color: var(--text-dim);`
- **H1**: `Premier League · Jornada {NN}` — `Bricolage Grotesque 700, 36px, line-height 1.05, letter-spacing -0.02em`. La palabra-bullet "·" usa `<em>` con color `var(--text-dim)` y `font-style: normal`.
- **Meta block (derecha)**: dos columnitas separadas por gap 24px.
  - Cada bloque: label mono-uppercase (`10px / 0.18em / var(--text-faint)`) + valor `Bricolage 600 / 20px / letter-spacing -0.01em`.
  - "Temporada" → `2023 / 24`.
  - "Formación" → `4 – 3 – 3`. Cada número en `JetBrains Mono 22px / 500`, con el número resaltado en `var(--accent)`.

> El verifier reportó que en algunos viewports la H1 se parte a 2 líneas. Si pasa, usar `white-space: nowrap` o bajar a 32px. No es bloqueante pero conviene mirarlo.

### Filter bar

Card oscuro con `backdrop-filter: blur(12px)`, `border: 1px solid var(--border)`, `background: var(--surface)`, `border-radius: 16px`, `padding: 10px 12px`, gap interno **16px**, separadores verticales de 1px entre grupos.

#### Week stepper

```
┌──┬───────────────────┬──┐
│ ‹│ JORNADA           │ ›│
│  │ 01/38             │  │
└──┴───────────────────┴──┘
```

- Wrapper: `display: flex; padding: 4px; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 12px;`
- Botones ‹ › : 32px cuadrados, sin border, fondo transparente, color `var(--text)`, `font-size: 20px`, hover `background: var(--hover)`. Disabled cuando `week === 1` o `week === 38`.
- Body central: eyebrow mono ("JORNADA", 9px / 0.2em / faint) + valor (`Bricolage 600 / 18px`, número padded a 2 dígitos `01`, denominador `/38` en `JetBrains Mono 14px / faint`).
- min-width body: 88px.

#### Segmented chips (age / value)

- Wrapper: `padding: 4px; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 999px; display: inline-flex; gap: 2px;`
- Cada chip: `padding: 7px 12px; border-radius: 999px; font: 500 13px DM Sans; color: var(--text-dim);`
- Hover: color → `var(--text)`. Seleccionado: `background: var(--text); color: var(--bg);`
- A la izquierda de cada grupo va un label mono-uppercase ("EDAD", "VALOR", 10px / 0.2em / faint).

**Opciones edad**: `Todas` · `Sub-21` (`u21`) · `21–25` · `26–30` · `+30` (`o30`).
**Opciones valor**: `Todos` · `<10 M €` (`u10`) · `10–30 M €` · `30–50 M €` · `>50 M €` (`o50`).

> Mantener los mismos query params (`week`, `age`, `value`) y la integración con `useRouter` que ya tiene `FilterBar.tsx` — solo cambia la presentación.

### Pitch

- Wrapper: `position: relative; width: 100%; aspect-ratio: 100/66; border-radius: 22px; overflow: hidden;`
- **Fondo (tone = grass)**: `linear-gradient(180deg, #163C2A 0%, #0F2B1F 100%);` con sombra interna `inset 0 0 120px rgba(0,0,0,0.45)` y hairline interior `inset 0 0 0 1px rgba(255,255,255,0.10)`.
- **Stripes** (capa por encima del fondo, debajo de las líneas): `repeating-linear-gradient(90deg, transparent 0, transparent calc(100%/12 - 1px), rgba(255,255,255,0.040) calc(100%/12 - 1px), rgba(255,255,255,0.040) calc(100%/12))`.
- **Líneas (SVG)**, `viewBox 0 0 100 66`, `preserveAspectRatio="none"`, `stroke="rgba(255,255,255,0.55)"`, `stroke-width="0.25"`:
  - Outer: `rect 1.4,1.4 → 97.2×63.2`
  - Halfway: línea vertical `x=50`
  - Centre circle: `r=7.6 cx=50 cy=33`; punto central `r=0.5 fill`
  - Penalty box izq: `rect 1.4,17,14.6,32`
  - Goal box izq: `rect 1.4,25.6,6,14.8`
  - Penalty arc izq: `M 16 26.5 A 7 7 0 0 1 16 39.5`
  - Espejado del lado derecho
  - 4 arcos esquineros r=1.6

### Player slot (chip variante A — Pill refinado)

Posición: `position: absolute; left: {slot.x}%; top: {slot.y}%; transform: translate(-50%, -50%);`. Hover: `translate(-50%, -52%)`. Slots:

| pos | x   | y   |
| --- | --- | --- |
| GK  | 6   | 50  |
| LB  | 22  | 14  |
| CB  | 22  | 36  |
| CB  | 22  | 58  |
| RB  | 22  | 82  |
| CM  | 50  | 22  |
| DM  | 50  | 50  |
| AM  | 50  | 78  |
| LW  | 78  | 22  |
| FW  | 78  | 50  |
| RW  | 78  | 78  |

**Estructura del chip (variante A):**

```
[ score pill + pos ]      ← pequeña, color tier
   (avatar 52px)           ← con anillo cónico color club + chip "FUL"
    Apellido               ← name strip con backdrop-blur
```

- **Score pill**:
  - `display: inline-flex; gap: 4px; padding: 3px 8px 4px; border-radius: 8px;`
  - Background gradiente según tier (ver §5 Design tokens · Score tiers).
  - Texto: número `JetBrains Mono 600 / 13px`, posición `JetBrains Mono 600 / 9px, letter-spacing 0.1em, opacity 0.75`.
  - Sombra: `0 6px 18px -6px {tier-glow}, inset 0 0 0 1px rgba(255,255,255,0.18)`.

- **Avatar wrap**:
  - `position: relative; display: inline-flex; align-items: center;`
  - **Ring**: pseudo / span absoluto en `inset: -3px; border-radius: 999px;` con `conic-gradient(from 220deg, {clubColor} 0deg, transparent 200deg); opacity: 0.6;`. En foco: `opacity: 1; inset: -4px;`.
  - **Avatar**: 52×52, `border-radius: 999px;`, fondo `radial-gradient(120% 120% at 30% 20%, hsl({hue} 55% 38%), hsl({hue} 50% 22%) 55%, #0d1117)`. Iniciales encima en `Bricolage 600 / 34% del tamaño / rgba(255,255,255,0.92)`. Sombra interna hairline `inset 0 0 0 1.5px rgba(255,255,255,0.1)` y drop `0 4px 14px -4px rgba(0,0,0,0.7)`.
  - **Club chip** (esquina inferior derecha): texto del abbr (`FUL`, `TOT`...) en `JetBrains Mono 700 / 8px / letter-spacing 0.08em / white`. `padding: 3px 5px; border-radius: 6px; border: 1.5px solid rgba(10,12,18,0.85); background: {clubColor};`. Posición `bottom: -2px; right: -6px;`.

  > Si el repo ya devuelve `player.image` con una foto real, mantenerla dentro del avatar (object-cover) y dejar el gradiente solo como fallback cuando no hay imagen. La iniciales se calculan como `name.split(" ").map(n => n[0]).slice(0,2).join("")`.

- **Name strip**: `padding: 2px 8px; border-radius: 6px; background: rgba(10,12,18,0.7); backdrop-filter: blur(6px); border: 1px solid var(--border);`. Texto: solo apellido (`name.split(" ").pop()`), `Bricolage 600 / 11px / letter-spacing -0.005em / white-space: nowrap`.

- **Estado focused** (cuando es el seleccionado en el panel): el avatar tiene un outer ring `box-shadow: 0 0 0 2px var(--accent)` además del cónico.

### Detail panel

Reemplaza al `Popover` actual (que se desmonta al hacer click fuera) por un **panel lateral persistente** que vive siempre a la derecha del campo. Cuando no hay jugador seleccionado, muestra un empty state. Cuando hay uno, muestra su ficha.

- Wrapper: `background: var(--surface); border: 1px solid var(--border); border-radius: 22px; min-height: 480px; overflow: hidden; display: flex; flex-direction: column; position: relative;`
- **Botón cerrar** (✕): 28×28, `top: 12px; right: 12px; position: absolute;`. Fondo `rgba(10,12,18,0.5)`, hover `var(--hover)`.

#### Hero del panel

```
┌────────────────────────────────────┐
│ [8.4]                              │
│        AVATAR 88px                 │
│              POS · NOMBRE         │
│              [WHU] West Ham        │
└────────────────────────────────────┘
```

- Background: `linear-gradient(180deg, transparent, rgba(13,16,22,0.85)) + radial-gradient(80% 100% at 50% 0%, {clubColor}55 0%, transparent 70%)`.
- Padding `28px 24px 24px`. Grid `auto 1fr` con gap 16px.
- **Score badge** (`top: 12px; left: 12px; position: absolute`): `padding: 4px 9px; border-radius: 8px;` con el gradiente del tier.
- **Avatar 88px** (mismo treatment que en el chip pero más grande).
- **Identidad**:
  - Pos name (mono-uppercase 10px / 0.18em / dim) — texto completo, ej. "DEFENSOR CENTRAL"
  - H2 con nombre completo: `Bricolage 700 / 22px / letter-spacing -0.015em; text-wrap: pretty`
  - Club row: crest chip (mismo treatment que en el chip pero más prolijo: `padding: 2px 5px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.18); background: {clubColor};`) + nombre del club (`13px / var(--text-dim)`)

#### Stats grid

Grid `1fr 1fr` con `gap: 1px` y `background: var(--border)` para crear hairlines. Cada celda `background: var(--bg-2); padding: 16px 20px;`.

Celdas:
- `Posición` → abbr (GK, LB...)
- `Edad` → calculada desde dob, ej "31 años"
- `Valor de mercado` → ocupa 2 columnas (`grid-column: span 2`)
- `Fin de contrato` → fecha formato `30 jun 2027`
- `Fecha de nacimiento` → mismo formato

Cada celda: label mono-uppercase `10px / 0.18em / faint`, valor `Bricolage 600 / 15px`.

#### CTAs

Footer del panel, dos botones full-width side by side, gap 8px, padding 16px:
- **Primario**: `background: var(--accent); color: #0A0C12; padding: 12px 14px; border-radius: 10px; font: 600 13px DM Sans;`. Texto: "Ver perfil completo".
- **Ghost**: `background: transparent; border: 1px solid var(--border-2); color: var(--text);`. Texto: "Comparar".

> Si por ahora estas CTAs no llevan a ningún lado, dejarlas como placeholders o quitarlas — son opcionales.

#### Empty state

Cuando `focused == null`:
- Glyph cuadrado 72×72 (`radius 18px, border 1px var(--border), bg var(--bg-2)`) con el texto **"11"** en `Bricolage 700 / 28px / color var(--accent)`.
- Título: "Tocá un jugador" (`Bricolage 600 / 16px`).
- Body: "Acá vas a ver su valor de mercado, contrato y stats de la jornada." (`13px / line-height 1.5 / max-width 220px / dim`).

### Footer

Padding `16px 40px 24px`. Flex space-between.

- Izquierda: `Datos: FBref · Transfermarkt` (12px / faint, links en `var(--text-dim)` → hover `var(--text)`).
- Derecha: **leyenda de tiers de score**. Cuatro chips horizontales:
  - `8.3+` con punto dorado `#F7D261`
  - `7.5–8.2` con punto verde `#5DE8A1`
  - `7.0–7.4` con punto celeste `#7AC8FF`
  - `< 7.0` con punto ámbar `#F5A45A`
  - Punto: 8×8 redondo + glow sutil `box-shadow: 0 0 8px {color}55`.
  - Texto: `JetBrains Mono 10px / 0.12em / uppercase`.

---

## 4. Interacciones

- **Click en un chip** → setea `focused = player.name` (string). Si ya era el focused, lo deselecciona.
- **Click ✕ en el panel** → `focused = null`.
- **Hover en chip**: `translate(-50%, -52%)` (lift 2px), transición `transform 160ms cubic-bezier(.2,0,0,1)`. Cambio de z-index al hover y al focused para no quedar tapado por chips vecinos.
- **Stepper de jornada**: ‹ y › disparan setState. Si está en el extremo (`1` o `38`), botón disabled.
- **Filtros**: mismo contrato actual — actualizan la query string (`?week=...&age=...&value=...`) y server re-fetchea.

### Animaciones

- Slide-in del panel cuando aparece (opcional): `transform: translateX(8px) → 0`, `opacity 0 → 1`, `200ms ease-out`.
- Hover de chip: `transform 160ms cubic-bezier(.2, 0, 0, 1)` (Material enter curve).
- Focused chip: anillo crece y se opacifica (`opacity 0.6 → 1`, `inset -3px → -4px`), instant — no transición.

---

## 5. Design tokens

Pegar como `:root` en `globals.css`:

```css
:root {
  --bg:           #0A0C12;
  --bg-2:         #10141C;
  --surface:      rgba(255,255,255,0.04);
  --surface-2:    rgba(255,255,255,0.08);
  --hover:        rgba(255,255,255,0.06);
  --border:       rgba(255,255,255,0.08);
  --border-2:     rgba(255,255,255,0.14);
  --text:         #E7EAF2;
  --text-dim:     #8C93A6;
  --text-faint:   #5B6273;
  --accent:       #C4F542;        /* lima — acento elegido */

  --radius-s:     6px;
  --radius-m:     10px;
  --radius-l:     16px;
  --radius-xl:    22px;

  --shadow-1:     0 1px 0 rgba(255,255,255,0.04), 0 8px 24px -12px rgba(0,0,0,0.6);
  --shadow-2:     0 1px 0 rgba(255,255,255,0.06), 0 24px 48px -16px rgba(0,0,0,0.7);

  --font-display: "Bricolage Grotesque", "DM Sans", system-ui, sans-serif;
  --font-body:    "DM Sans", system-ui, sans-serif;
  --font-num:     "JetBrains Mono", ui-monospace, monospace;
}
```

### Fuentes (Google Fonts)

En `src/app/layout.tsx` reemplazar el import actual por:

```ts
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-display" });
const body    = DM_Sans({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-body" });
const mono    = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-num" });

// <html className={`${display.variable} ${body.variable} ${mono.variable}`}>
```

### Score tiers

```ts
const TIER_BG = {
  elite:  "linear-gradient(180deg, #F7D261 0%, #E0A93A 100%)", // ≥ 8.3
  strong: "linear-gradient(180deg, #5DE8A1 0%, #1FB36B 100%)", // 7.5–8.2
  ok:     "linear-gradient(180deg, #7AC8FF 0%, #2F8FE0 100%)", // 7.0–7.4
  low:    "linear-gradient(180deg, #F5A45A 0%, #D9762B 100%)", // < 7.0
};
const TIER_TEXT = { elite: "#3A2606", strong: "#063C20", ok: "#08243F", low: "#3D1B05" };
const TIER_GLOW = {
  elite:  "rgba(247, 210, 97, 0.55)",
  strong: "rgba(93, 232, 161, 0.45)",
  ok:     "rgba(122, 200, 255, 0.40)",
  low:    "rgba(245, 164, 90, 0.40)",
};
```

### Colores de club (extender según los equipos que aparezcan)

```ts
{ FUL: "#CC2A2A", TOT: "#132257", WOL: "#FDB913", BHA: "#0057B8",
  WHU: "#7A263A", MUN: "#DA291C", LUT: "#F78F1E", /* … */ }
```

Idealmente: agregar `clubColor` (y `clubHue` si querés mantener el avatar gradiente como fallback) a la tabla `club` del schema de Drizzle, así el back lo manda y el front no tiene un map hardcodeado.

### Espaciado / radios

| Token | Valor | Uso |
| --- | --- | --- |
| `--radius-s` | 6px | name strip, score pill |
| `--radius-m` | 10px | botones |
| `--radius-l` | 16px | filter bar |
| `--radius-xl` | 22px | pitch wrapper, detail panel |

Paddings: header `32px 40px 24px`. Stage `24px 40px 40px`. Filter bar `10px 12px`. Stats cell `16px 20px`.

---

## 6. Estado

Estado local del client component que envuelve pitch + panel:

```ts
const [focused, setFocused] = useState<string | null>(null); // player.name
```

`week / age / value` siguen en la URL (server-side filtering ya está implementado).

No hace falta context ni store nuevo.

---

## 7. Responsive

- **≥ 1024px**: layout descrito (pitch + panel 340px).
- **768–1023px**: stage colapsa a una columna; panel se vuelve un drawer fijo abajo (sheet) con altura ~60vh, slide-up cuando hay jugador focused.
- **< 768px**: igual que tablet pero pitch en aspect 100/130 (vertical) — re-mapear `slot.x ↔ slot.y` o usar otro array de slots verticales. La app actual ya tiene un fallback mobile en `SoccerPitch.tsx`; conviene mantener esa misma lógica de break.

---

## 8. Assets

- Sin imágenes externas. Avatares son sintéticos (gradiente radial + iniciales).
- Si el repo ya guarda `player.image` con foto real, ponerla dentro del avatar (`object-fit: cover`); el gradiente queda como fallback.
- Sin SVG icons. ‹ › del stepper y ✕ del panel son glyphs unicode (`'\u2039' '\u203A' '✕'`). Si querés iconos vectoriales, usar Lucide o Tabler con stroke 1.75.

---

## 9. Files

En la carpeta `_source/` están los archivos de referencia tal como se usaron en el prototipo:

```
_source/
  Best XI.html         — HTML host con design_canvas y tweaks panel
  styles.css           — todos los estilos (los relevantes para la opción A)
  data.jsx             — players, formatters, scoreTier, TIER_BG/TEXT/GLOW, Avatar
  chips.jsx            — ChipPill (variante A) y ChipCard (NO usar — variante B)
  pitch.jsx            — Pitch SVG + slot positioning
  filters.jsx          — FilterBar + WeekStepper + Segment
  detail.jsx           — DetailPanel (slide-in con stats grid)
  app.jsx              — composición completa
```

**Importante**: el código en `_source/` está pensado para correr con Babel-in-browser. Para llevarlo a Next.js:

1. Quitar las exposiciones a `window.*` al final de cada archivo.
2. Exportar/importar con ES modules.
3. Mover los estilos a CSS modules o Tailwind utilities (preferible: CSS modules con las clases `.bxi-*` tal cual, así no hay que reescribir todo a Tailwind y el diff queda chico).
4. Mantener las clases con prefijo `bxi-` para no colisionar con globales del repo.
5. Si usás Tailwind 4 con `@theme`, exportar los tokens del §5 como custom properties dentro de `@layer base { :root { ... } }` y usarlos como `bg-[var(--surface)]`.

---

## 10. Acceptance checklist

- [ ] Header con eyebrow + h1 + meta (temporada + formación) renderiza igual.
- [ ] Stepper de jornada con `‹ 01/38 ›`, disabled en extremos.
- [ ] Filtros edad y valor con segmented chips (no selects).
- [ ] Pitch con tone grass: gradiente `#163C2A → #0F2B1F`, stripes sutiles cada 1/12 del ancho, líneas blancas 55% alpha.
- [ ] 11 chips posicionados en los `% slot` exactos.
- [ ] Cada chip: pill arriba (score+pos), avatar 52px con anillo cónico del color del club, chip del club (`FUL`, `TOT`...) en la esquina inferior derecha, apellido abajo en strip con backdrop-blur.
- [ ] Click en chip → panel lateral muestra el jugador con su hero (score, avatar 88px, pos name, h2, club row) y stats grid (Posición / Edad / Valor / Contrato / Nacimiento).
- [ ] Click ✕ → empty state con glyph "11" en accent.
- [ ] Hover en chip lo eleva 2px sin saltos.
- [ ] Footer con créditos + leyenda de 4 tiers de score con dots glowy.
- [ ] Fuentes Bricolage Grotesque / DM Sans / JetBrains Mono cargadas vía `next/font`.

---
