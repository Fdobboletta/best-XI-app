# Best XI — Rediseño UI

**Fecha:** 2026-05-28  
**Handoff base:** `design_handoff_best_xi/README.md` (high fidelity, pixel-perfect)  
**Variante elegida:** Pill refinado (A) · Tono grass · Acento #C4F542 (lima)

---

## Decisiones tomadas

| Decisión | Elección | Motivo |
|---|---|---|
| CSS | Tailwind 4 (no CSS modules) | Consistencia con el proyecto |
| Responsive | Sí, desde el arranque | Desktop 2-col + tablet drawer + mobile |
| DB changes | Ninguno | Todos los campos ya existen en `players` |
| Club colors | Mapa estático en código | No justifica columna en DB |
| "Ver perfil completo" | Eliminado | No existe página de perfil |
| Orden de implementación | Bottom-up | Menor riesgo de regresiones |

---

## 1. Tokens de diseño

Todos van en `src/app/globals.css` como CSS custom properties:

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
  --accent:       #C4F542;

  --radius-s:  6px;
  --radius-m:  10px;
  --radius-l:  16px;
  --radius-xl: 22px;

  --shadow-1: 0 1px 0 rgba(255,255,255,0.04), 0 8px 24px -12px rgba(0,0,0,0.6);
  --shadow-2: 0 1px 0 rgba(255,255,255,0.06), 0 24px 48px -16px rgba(0,0,0,0.7);

  --font-display: "Bricolage Grotesque", "DM Sans", system-ui, sans-serif;
  --font-body:    "DM Sans", system-ui, sans-serif;
  --font-num:     "JetBrains Mono", ui-monospace, monospace;
}
```

**Fuentes** vía `next/font/google` en `layout.tsx`: Bricolage Grotesque (700), DM Sans (400/500/600/700), JetBrains Mono (400/500/600/700).

---

## 2. Score tiers

Función `scoreTier(score: number)` en `src/app/lib/utils.ts`:

```ts
type Tier = "elite" | "strong" | "ok" | "low"

// ≥ 8.3 → elite (gold), 7.5–8.2 → strong (green), 7.0–7.4 → ok (sky), < 7.0 → low (amber)
```

Cada tier tiene: `bg` (gradiente para badge), `text` (color del texto), `glow` (box-shadow).

---

## 3. Club colors

Archivo `src/app/lib/clubColors.ts` — mapa estático keyed por `transfermarktClubId`:

```ts
export const CLUB_COLORS: Record<number, { hex: string; hue: number }> = {
  // expandir con los clubs que aparecen en los datos reales
}
```

Si un club no está en el mapa: fallback `hex: "#5B6273"`, `hue: 220`. El `hue` se usa para el gradiente del avatar; el `hex` para el ring y el club chip.

---

## 4. Componentes

### 4.0 Archivos eliminados

- `EmptyPlayerCard.tsx` — ya no se necesita; `DetailPanel` maneja el estado vacío

### 4.1 `ChipPill` — reemplaza `PlayerCard.tsx`

Props: `{ player, focused, onFocus }`

Estructura visual:
```
┌─────────────────┐
│  [score tier]   │  ← badge con gradiente por tier
│   [AVATAR]      │  ← 52px, ring conic-gradient (color de club)
│   Apellido      │  ← name strip con backdrop-blur
└─────────────────┘
```

Estados:
- **Normal:** ring opacity 0.6, inset -3px
- **Focused:** ring opacity 1, inset -4px, translateY(-2px)
- **Hover:** translateY(-2px), transition 160ms cubic-bezier(.2,0,0,1)

El club chip (abreviatura) va en esquina inferior-derecha del avatar, background = color del club.

### 4.2 `DetailPanel` — reemplaza `PlayerTooltip.tsx` (Popover)

Props: `{ player: Player | null; onClose: () => void }`

**Desktop (≥ 1024px):** panel lateral fijo de 340px, slide-in `translateX(8px) → 0` + `opacity 0 → 1` en 200ms ease-out.

**Tablet/Mobile (< 1024px):** bottom drawer con drag handle, altura ~60vh, `border-radius: 16px 16px 0 0`.

Secciones cuando hay jugador seleccionado:
1. **Hero:** badge score (top-left) + avatar 88px + bloque ID (posición label, nombre h2, club)
2. **Stats grid:** 2 columnas, `gap: 1px`, fondo `--bg-2`
   - Posición (abreviatura), Edad
   - Valor de mercado (span 2 cols, color `--accent`)
   - Fin de contrato, Fecha de nacimiento
3. **CTA:** único botón "Comparar" (ghost)

**Estado vacío:** glifo "11" en accent + "Tocá un jugador".

### 4.3 `FilterBar` — reemplaza `FilterBar.tsx`

Props: `{ week, onWeek, age, onAge, value, onValue }`

Tres secciones separadas por divisores verticales:
1. **WeekStepper:** `‹` / `›` (32×32) + label "JORNADA" + valor "NN/38". Botón `‹` disabled en semana 1, `›` disabled en semana 38.
2. **Segmented age:** Todas | Sub-21 | 21–25 | 26–30 | +30
3. **Segmented value:** Todos | <10M€ | 10–30M€ | 30–50M€ | >50M€

Chip activo: `background: --accent`, `color: --bg`, `font-weight: 700`. Inactivo: surface semitransparente.

### 4.4 `SoccerPitch` — actualizar estilos

Tono **grass**: `linear-gradient(180deg, #163C2A 0%, #0F2B1F 100%)`, `border-radius: var(--radius-xl)`.  
Stripes: `repeating-linear-gradient(90deg, ...)` blanco 4% opacidad cada 1/12 del ancho.  
SVG lines: `viewBox="0 0 100 66"`, `stroke="rgba(255,255,255,0.55)"`. Incluye: rect exterior, línea del medio, círculo central, áreas de penales, arcos de córner.  
Player slots: `position: absolute`, `left={x}%`, `top={y}%`, `transform: translate(-50%, -50%)`.

---

## 5. Layout de `page.tsx`

```
<html>
  <body style="background: var(--bg)">
    <Header />           ← eyebrow + h1 "Premier League · Jornada NN" + meta
    <BestXIClient        ← Client Component con estado
      players={...}
      keepers={...}
    />
    <Footer />           ← créditos + leyenda tiers
  </body>
</html>
```

**Header:**
- Eyebrow: `JetBrains Mono 11px`, letter-spacing 0.18em, color `--text-dim`, prefijado con "•"
- H1: `Bricolage Grotesque 700 36px`, letter-spacing -0.02em
- Meta block (right): Temporada + Formación en dos columnas; números de formación en `--accent`

**BestXIClient** (Client Component):
```ts
const [focused, setFocused] = useState<string | null>(null)
const [week, setWeek] = useState(initialWeek)
const [age, setAge] = useState("")
const [value, setValue] = useState("")
```

- Cambio de `week` → `router.push(?week=N)` → re-fetch server-side
- Filtros `age`/`value` → client-side sobre datos ya cargados
- Stage: `grid-template-columns: 1fr 340px` en desktop, `1fr` en tablet/mobile

**Footer:**
- Izquierda: "Datos: FBref · Transfermarkt" + créditos personales (LinkedIn/Instagram) — se conservan del diseño actual
- Derecha: 4 dots con glow coloreado + labels de tiers

---

## 6. Responsive

| Breakpoint | Layout |
|---|---|
| ≥ 1024px | Stage: 2 columnas (pitch 1fr + panel 340px fijo) |
| 768–1023px | Stage: 1 columna; panel como bottom sheet ~60vh |
| < 768px | Igual que tablet; pitch se reorienta verticalmente |

En mobile el FilterBar colapsa los segmented chips en scroll horizontal.

---

## 7. Interacciones y animaciones

- **Hover chip:** `translateY(-2px)`, 160ms `cubic-bezier(.2,0,0,1)`
- **Click chip:** toggle `focused`. Si ya estaba focused → `focused = null`
- **Focused chip:** ring `inset: -4px`, opacity 1, sin transition (inmediato)
- **Panel slide-in:** `translateX(8px) → 0` + `opacity 0 → 1`, 200ms ease-out
- **Bottom drawer:** slide up desde abajo, misma duración

---

## 8. Checklist de aceptación (QA)

- [ ] Header renderiza eyebrow + h1 con número de jornada + meta (temporada, formación)
- [ ] Week stepper: `‹` disabled en semana 1, `›` disabled en semana 38
- [ ] Segmented chips de edad y valor funcionan como radio group
- [ ] Pitch con tono grass (gradiente verde oscuro) + stripes + SVG lines completas
- [ ] 11 chips posicionados en sus slots correctos
- [ ] Chip tiene: badge tier, avatar con ring de color de club, club chip, nombre
- [ ] Click chip abre DetailPanel con datos del jugador
- [ ] Click en chip activo cierra el panel
- [ ] Hover chip sube 2px
- [ ] DetailPanel muestra: score, avatar 88px, posición, nombre, club, stats grid, botón Comparar
- [ ] "Ver perfil completo" NO aparece
- [ ] Estado vacío del panel: glifo "11" + "Tocá un jugador"
- [ ] Footer: créditos + leyenda de 4 tiers con dots coloreados
- [ ] Desktop: pitch + panel lateral en 2 columnas
- [ ] Tablet/mobile: panel como bottom drawer
- [ ] Fuentes cargadas: Bricolage Grotesque, DM Sans, JetBrains Mono
- [ ] Cambio de jornada recarga los datos
- [ ] Filtros de edad y valor filtran los jugadores en cancha
