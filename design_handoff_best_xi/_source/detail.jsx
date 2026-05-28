// Player detail panel — slides in from the right when a player is clicked.
// (Tooltip-on-hover felt cramped for this density of info; a real panel
// gives more room and is comparable across players without re-hovering.)

const Stat = ({ label, value, span }) => (
  <div className="bxi-stat" style={span ? { gridColumn: `span ${span}` } : null}>
    <span className="bxi-stat__label">{label}</span>
    <span className="bxi-stat__value">{value}</span>
  </div>
);

const DetailPanel = ({ player, onClose }) => {
  if (!player) {
    return (
      <aside className="bxi-panel is-empty">
        <div className="bxi-panel__empty">
          <div className="bxi-panel__empty-glyph">
            <span>11</span>
          </div>
          <h3>Tocá un jugador</h3>
          <p>Acá vas a ver su valor de mercado, contrato y stats de la jornada.</p>
        </div>
      </aside>
    );
  }

  const tier = scoreTier(player.score);
  const age = ageFromDob(player.dob);
  return (
    <aside className="bxi-panel">
      <button className="bxi-panel__close" onClick={onClose} aria-label="Cerrar">✕</button>

      <div className="bxi-panel__hero" style={{
        background: `
          linear-gradient(180deg, rgba(13,16,22,0) 0%, rgba(13,16,22,0.85) 100%),
          radial-gradient(80% 100% at 50% 0%, ${player.accent}55 0%, transparent 70%)
        `,
      }}>
        <span
          className="bxi-panel__score"
          style={{ background: TIER_BG[tier], color: TIER_TEXT[tier] }}
        >
          {player.score.toFixed(1)}
        </span>
        <Avatar p={player} size={88} />
        <div className="bxi-panel__id">
          <span className="bxi-panel__pos">{player.posName}</span>
          <h2>{player.name}</h2>
          <span className="bxi-panel__club">
            <span className="bxi-panel__crest" style={{ background: player.accent }}>
              {player.clubAbbr}
            </span>
            {player.club}
          </span>
        </div>
      </div>

      <div className="bxi-panel__grid">
        <Stat label="Posición" value={player.pos} />
        <Stat label="Edad"     value={age ? `${age} años` : "—"} />
        <Stat label="Valor de mercado" value={fmtMoney(player.marketValue)} span={2} />
        <Stat label="Fin de contrato"  value={fmtDate(player.contractEnd)} />
        <Stat label="Fecha de nacimiento" value={fmtDate(player.dob)} />
      </div>

      <div className="bxi-panel__cta">
        <button className="bxi-btn">Ver perfil completo</button>
        <button className="bxi-btn bxi-btn--ghost">Comparar</button>
      </div>
    </aside>
  );
};

window.DetailPanel = DetailPanel;
