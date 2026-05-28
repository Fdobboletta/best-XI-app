// Filter bar — segmented chip groups feel sportier than dropdowns and
// reveal the option-space at a glance. Each row collapses gracefully.

const TOTAL_WEEKS = 38;
const AGE_OPTIONS = [
  { v: "",      label: "Todas" },
  { v: "u21",   label: "Sub-21" },
  { v: "21-25", label: "21–25" },
  { v: "26-30", label: "26–30" },
  { v: "o30",   label: "+30" },
];
const VALUE_OPTIONS = [
  { v: "",      label: "Todos" },
  { v: "u10",   label: "<10 M €" },
  { v: "10-30", label: "10–30 M €" },
  { v: "30-50", label: "30–50 M €" },
  { v: "o50",   label: ">50 M €" },
];

const Segment = ({ options, value, onChange, ariaLabel }) => (
  <div role="radiogroup" aria-label={ariaLabel} className="bxi-seg">
    {options.map((o) => {
      const selected = value === o.v;
      return (
        <button
          key={o.v || "all"}
          role="radio"
          aria-checked={selected}
          className={`bxi-seg__btn ${selected ? "is-on" : ""}`}
          onClick={() => onChange(o.v)}
        >
          {o.label}
        </button>
      );
    })}
  </div>
);

const WeekStepper = ({ week, onChange }) => {
  const dec = () => onChange(Math.max(1, week - 1));
  const inc = () => onChange(Math.min(TOTAL_WEEKS, week + 1));
  return (
    <div className="bxi-stepper">
      <button onClick={dec} aria-label="Jornada anterior" disabled={week === 1}>‹</button>
      <div className="bxi-stepper__body">
        <span className="bxi-stepper__eyebrow">Jornada</span>
        <span className="bxi-stepper__value">
          {String(week).padStart(2, "0")}
          <em>/{TOTAL_WEEKS}</em>
        </span>
      </div>
      <button onClick={inc} aria-label="Jornada siguiente" disabled={week === TOTAL_WEEKS}>›</button>
    </div>
  );
};

const FilterBar = ({ week, setWeek, age, setAge, value, setValue }) => (
  <div className="bxi-filters">
    <WeekStepper week={week} onChange={setWeek} />
    <div className="bxi-filters__divider" />
    <div className="bxi-filters__row">
      <span className="bxi-filters__label">Edad</span>
      <Segment options={AGE_OPTIONS} value={age} onChange={setAge} ariaLabel="Filtrar por edad" />
    </div>
    <div className="bxi-filters__divider" />
    <div className="bxi-filters__row">
      <span className="bxi-filters__label">Valor</span>
      <Segment options={VALUE_OPTIONS} value={value} onChange={setValue} ariaLabel="Filtrar por valor de mercado" />
    </div>
  </div>
);

window.FilterBar = FilterBar;
window.TOTAL_WEEKS = TOTAL_WEEKS;
