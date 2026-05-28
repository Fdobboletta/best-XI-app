// Best XI app shell — composes header + filters + pitch + detail panel.
// One <App> = one full mock. We mount it twice (one per chip variant) inside
// a design_canvas so the two options can be compared side-by-side.

const { useState } = React;

const App = ({ chip, label, tweaks }) => {
  const [focused, setFocused] = useState(null);
  const [week, setWeek] = useState(1);
  const [age, setAge] = useState("");
  const [value, setValue] = useState("");

  const Chip = chip === "card" ? ChipCard : ChipPill;
  const focusedPlayer = focused ? PLAYERS.find((p) => p.name === focused) : null;

  const formation = "4-3-3";

  return (
    <div className="bxi-app">
      <header className="bxi-header">
        <div className="bxi-header__title">
          <span className="bxi-header__eyebrow">{label} · Once ideal</span>
          <h1 className="bxi-header__h1">
            Premier League <em>·</em> Jornada {String(week).padStart(2, "0")}
          </h1>
        </div>
        <div className="bxi-header__meta">
          <div className="bxi-header__meta-block">
            <div className="bxi-header__meta-label">Temporada</div>
            <div className="bxi-header__meta-value">2023 / 24</div>
          </div>
          <div className="bxi-header__meta-block">
            <div className="bxi-header__meta-label">Formación</div>
            <div className="bxi-header__formation">
              {formation.split("-").map((n, i, arr) => (
                <React.Fragment key={i}>
                  <span>{n}</span>
                  {i < arr.length - 1 && <em style={{ fontStyle: "normal", color: "var(--text-faint)" }}>–</em>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div style={{ padding: "0 0 4px" }}>
        <FilterBar
          week={week} setWeek={setWeek}
          age={age}   setAge={setAge}
          value={value} setValue={setValue}
        />
      </div>

      <div className="bxi-stage">
        <Pitch
          players={PLAYERS}
          Chip={Chip}
          showName={tweaks.showName}
          showTeam={tweaks.showTeam}
          focused={focused}
          onFocus={setFocused}
          tone={tweaks.tone}
        />
        <DetailPanel
          player={focusedPlayer}
          onClose={() => setFocused(null)}
        />
      </div>

      <footer className="bxi-footer">
        <div>
          Datos: <a href="#" onClick={(e)=>e.preventDefault()}>FBref</a> · <a href="#" onClick={(e)=>e.preventDefault()}>Transfermarkt</a>
        </div>
        <div className="bxi-footer__legend">
          <span className="bxi-footer__dot bxi-footer__dot--elite">8.3+</span>
          <span className="bxi-footer__dot bxi-footer__dot--strong">7.5–8.2</span>
          <span className="bxi-footer__dot bxi-footer__dot--ok">7.0–7.4</span>
          <span className="bxi-footer__dot bxi-footer__dot--low">&lt; 7.0</span>
        </div>
      </footer>
    </div>
  );
};

window.App = App;
