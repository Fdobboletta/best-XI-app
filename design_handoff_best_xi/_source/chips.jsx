// Two chip variants for the pitch.
// Variant A — "Pill refinado": evolution of what they have now. Score pill
//   above, layered avatar with team ring, club crest chip riding the avatar.
// Variant B — "Mini-card FIFA": tiny vertical card a la FUT — score + position
//   tag stacked on a colored bezel, avatar inset, name strip at the bottom.

const ChipPill = ({ p, focused, showName, showTeam }) => {
  const tier = scoreTier(p.score);
  return (
    <div className={`bxi-chip bxi-chip--pill ${focused ? "is-focused" : ""}`}>
      <div
        className="bxi-pill"
        style={{
          background: TIER_BG[tier],
          color: TIER_TEXT[tier],
          boxShadow: `0 6px 18px -6px ${TIER_GLOW[tier]}, inset 0 0 0 1px rgba(255,255,255,0.18)`,
        }}
      >
        <span className="bxi-pill__score">{p.score.toFixed(1)}</span>
        <span className="bxi-pill__pos">{p.pos}</span>
      </div>

      <div className="bxi-avatar-wrap">
        <span
          className="bxi-avatar-ring"
          style={{
            background: `conic-gradient(from 220deg, ${p.accent} 0deg, transparent 200deg)`,
          }}
        />
        <Avatar p={p} size={52} />
        {showTeam && (
          <span
            className="bxi-club-chip"
            style={{ background: p.accent }}
            title={p.club}
          >
            {p.clubAbbr}
          </span>
        )}
      </div>

      {showName && (
        <div className="bxi-name">
          <span className="bxi-name__last">{p.last}</span>
        </div>
      )}
    </div>
  );
};

const ChipCard = ({ p, focused, showName, showTeam }) => {
  const tier = scoreTier(p.score);
  return (
    <div className={`bxi-chip bxi-chip--card ${focused ? "is-focused" : ""}`}>
      <div
        className="bxi-card"
        style={{
          background: `
            linear-gradient(180deg, rgba(20,24,33,0.95) 0%, rgba(13,16,22,0.95) 100%),
            radial-gradient(120% 80% at 50% 0%, ${p.accent}33 0%, transparent 60%)
          `,
          backgroundBlendMode: "normal",
          borderColor: `${p.accent}55`,
        }}
      >
        <span
          className="bxi-card__accent"
          style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }}
        />
        <div className="bxi-card__head">
          <div
            className="bxi-card__score"
            style={{
              background: TIER_BG[tier],
              color: TIER_TEXT[tier],
              boxShadow: `0 4px 12px -4px ${TIER_GLOW[tier]}`,
            }}
          >
            {p.score.toFixed(1)}
          </div>
          <div className="bxi-card__pos">{p.pos}</div>
        </div>
        <div className="bxi-card__avatar">
          <Avatar p={p} size={44} />
        </div>
        {showName && (
          <div className="bxi-card__name">
            <span>{p.last}</span>
            {showTeam && <em>{p.clubAbbr}</em>}
          </div>
        )}
      </div>
    </div>
  );
};

window.ChipPill = ChipPill;
window.ChipCard = ChipCard;
