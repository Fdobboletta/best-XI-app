import { Suspense } from "react";
import { fetchKeeper } from "./lib/fetchKeepers/fetchKeepers";
import { fetchPlayers } from "./lib/fetchPlayers/fetchPlayers";
import { BestXIClient } from "./components/BestXIClient";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ week?: string; age?: string; value?: string }>;
}) {
  try {
    const params = await searchParams;
    const currentWeek = Math.max(1, Math.min(38, parseInt(params.week ?? "1") || 1));

    const [players, keeper] = await Promise.all([
      fetchPlayers(params),
      fetchKeeper(params),
    ]);

    const bestXI = [...players, keeper];

    return (
      <div className="min-h-screen" style={{ background: "var(--bg)" }}>
        {/* Header */}
        <header className="px-6 md:px-10 pt-8 pb-5">
          <div
            style={{
              color: "var(--text-dim)",
              fontSize: 11,
              letterSpacing: "0.18em",
              fontFamily: "var(--font-num)",
              marginBottom: 8,
            }}
          >
            • PREMIER LEAGUE · ONCE IDEAL
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1
              style={{
                color: "var(--text)",
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 700,
                fontFamily: "var(--font-display)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Premier League · Jornada {String(currentWeek).padStart(2, "0")}
            </h1>
            <div className="flex gap-8">
              <div>
                <div
                  style={{
                    color: "var(--text-faint)",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    fontFamily: "var(--font-num)",
                    marginBottom: 2,
                  }}
                >
                  TEMPORADA
                </div>
                <div
                  style={{
                    color: "var(--text)",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  2023 / 24
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: "var(--text-faint)",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    fontFamily: "var(--font-num)",
                    marginBottom: 2,
                  }}
                >
                  FORMACIÓN
                </div>
                <div
                  style={{
                    color: "var(--accent)",
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "var(--font-num)",
                    letterSpacing: "0.04em",
                  }}
                >
                  4 – 3 – 3
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Filters + Pitch + Panel */}
        <Suspense>
          <BestXIClient players={bestXI} currentWeek={currentWeek} />
        </Suspense>

        {/* Footer */}
        <footer
          className="px-6 md:px-10 py-4 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p style={{ color: "var(--text-faint)", fontSize: 11 }}>
            Datos:{" "}
            <a
              href="https://fbref.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-dim)" }}
            >
              FBref
            </a>
            {" · "}
            <a
              href="https://transfermarkt.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-dim)" }}
            >
              Transfermarkt
            </a>
          </p>

          {/* Score tier legend */}
          <div className="flex items-center gap-4">
            {(
              [
                { label: "8.3+", color: "#F7D261" },
                { label: "7.5–8.2", color: "#5DE8A1" },
                { label: "7.0–7.4", color: "#7AC8FF" },
                { label: "<7.0", color: "#F5A45A" },
              ] as const
            ).map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: color,
                    boxShadow: `0 0 6px ${color}`,
                  }}
                />
                <span style={{ color: "var(--text-dim)", fontSize: 10 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Personal credits */}
          <div className="flex items-center gap-4">
            <p style={{ color: "var(--text-dim)", fontSize: 11 }}>
              Creado por{" "}
              <a
                href="https://www.linkedin.com/in/facundo-dobboletta/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text)",
                  fontWeight: 600,
                }}
              >
                Facundo Dobboletta
              </a>
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/facundo-dobboletta/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-dim)" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/facudobbo/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-dim)" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <div className="text-center">
          <h1
            style={{
              color: "var(--text)",
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Error de conexión
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 14 }}>
            No se pudo conectar con la base de datos.
          </p>
        </div>
      </div>
    );
  }
}
