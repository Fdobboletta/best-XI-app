// Pitch component — SVG of a 4-3-3 football pitch with players overlaid.
// Players are positioned with absolute %, the SVG handles markings.

const Pitch = ({ players, Chip, showName, showTeam, focused, onFocus, tone }) => {
  // Pitch tones — three curated options. Stripes are subtle, not broadcasty.
  const tones = {
    night: {
      base:   "linear-gradient(180deg, #0F1A14 0%, #0A1410 100%)",
      stripe: "rgba(255,255,255,0.022)",
      line:   "rgba(255,255,255,0.22)",
      edge:   "rgba(255,255,255,0.06)",
    },
    grass: {
      base:   "linear-gradient(180deg, #163C2A 0%, #0F2B1F 100%)",
      stripe: "rgba(255,255,255,0.040)",
      line:   "rgba(255,255,255,0.55)",
      edge:   "rgba(255,255,255,0.10)",
    },
    noir: {
      base:   "linear-gradient(180deg, #0C0D12 0%, #07080C 100%)",
      stripe: "rgba(255,255,255,0.018)",
      line:   "rgba(160,180,255,0.22)",
      edge:   "rgba(120,140,200,0.08)",
    },
  };
  const t = tones[tone] || tones.night;

  return (
    <div className="bxi-pitch-wrap">
      <div
        className="bxi-pitch"
        style={{
          background: t.base,
          boxShadow: `inset 0 0 0 1px ${t.edge}, inset 0 0 120px rgba(0,0,0,0.45)`,
        }}
      >
        {/* faint grass stripes */}
        <div
          className="bxi-pitch__stripes"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent calc(100%/12 - 1px), ${t.stripe} calc(100%/12 - 1px), ${t.stripe} calc(100%/12))`,
          }}
        />
        <svg
          className="bxi-pitch__lines"
          viewBox="0 0 100 66"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* outer */}
          <rect x="1.4" y="1.4" width="97.2" height="63.2" stroke={t.line} strokeWidth="0.25" />
          {/* halfway */}
          <line x1="50" y1="1.4" x2="50" y2="64.6" stroke={t.line} strokeWidth="0.25" />
          {/* centre circle */}
          <circle cx="50" cy="33" r="7.6" stroke={t.line} strokeWidth="0.25" />
          <circle cx="50" cy="33" r="0.5" fill={t.line} />
          {/* left penalty box */}
          <rect x="1.4" y="17"   width="14.6" height="32"  stroke={t.line} strokeWidth="0.25" />
          <rect x="1.4" y="25.6" width="6"    height="14.8" stroke={t.line} strokeWidth="0.25" />
          <path d="M 16 26.5 A 7 7 0 0 1 16 39.5" stroke={t.line} strokeWidth="0.25" />
          {/* right penalty box */}
          <rect x="84"   y="17"   width="14.6" height="32"  stroke={t.line} strokeWidth="0.25" />
          <rect x="92.6" y="25.6" width="6"    height="14.8" stroke={t.line} strokeWidth="0.25" />
          <path d="M 84 26.5 A 7 7 0 0 0 84 39.5" stroke={t.line} strokeWidth="0.25" />
          {/* corners */}
          {[[1.4,1.4],[98.6,1.4],[1.4,64.6],[98.6,64.6]].map(([x,y],i) => (
            <path key={i}
              d={`M ${x} ${y + (y < 33 ? 1.6 : -1.6)} A 1.6 1.6 0 0 ${y < 33 ? (x < 50 ? 0 : 1) : (x < 50 ? 1 : 0)} ${x + (x < 50 ? 1.6 : -1.6)} ${y}`}
              stroke={t.line} strokeWidth="0.25" />
          ))}
        </svg>

        {/* Players */}
        {players.map((p) => {
          const isFocused = focused === p.name;
          return (
            <button
              key={p.name}
              className={`bxi-slot ${isFocused ? "is-focused" : ""}`}
              style={{ left: `${p.slot.x}%`, top: `${p.slot.y}%` }}
              onClick={() => onFocus(isFocused ? null : p.name)}
              aria-label={`${p.name}, ${p.posName}`}
            >
              <Chip p={p} focused={isFocused} showName={showName} showTeam={showTeam} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

window.Pitch = Pitch;
