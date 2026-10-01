import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Brand";
import { FORETAG } from "@/lib/foretag";

const VANSTER = [
  { to: "/", label: "Hem" },
  { to: "/tjanster", label: "Tjänster" },
  { to: "/rut", label: "RUT-avdrag" },
] as const;

const HOGER = [
  { to: "/om-oss", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

const LANK =
  "rounded-full px-4 py-2.5 text-sm font-bold whitespace-nowrap text-ink transition-colors duration-200 hover:bg-tint";
const LANK_AKTIV = "bg-brand text-white hover:bg-brand";

function Lank({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeOptions={{ exact: to === "/" }}
      className={LANK}
      activeProps={{ className: `${LANK} ${LANK_AKTIV}`, "aria-current": "page" }}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [oppen, setOppen] = useState(false);

  useEffect(() => {
    if (!oppen) return;
    const stang = (e: KeyboardEvent) => e.key === "Escape" && setOppen(false);
    window.addEventListener("keydown", stang);
    return () => window.removeEventListener("keydown", stang);
  }, [oppen]);

  return (
    <header className="sticky top-6 z-50 -mb-0 h-16 px-6 sm:px-10">
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-6 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
      >
        Hoppa till innehållet
      </a>
      <div className="relative mx-auto max-w-6xl">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center rounded-full bg-white px-3 shadow-xl shadow-brand-deep/25 md:grid-cols-[1fr_auto_1fr] md:px-4">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Huvudmeny">
            {VANSTER.map((l) => (
              <Lank key={l.to} {...l} />
            ))}
          </nav>

          <Link
            to="/"
            aria-label={`${FORETAG.namn} – startsida`}
            className="px-3 md:justify-self-center"
          >
            <Logo />
          </Link>

          <div className="hidden items-center justify-end gap-1 md:flex">
            {HOGER.map((l) => (
              <Lank key={l.to} {...l} />
            ))}
            <Link to="/offert" className="btn-base btn-navy ml-1 min-h-11 py-2 pr-2 pl-5 text-sm">
              Få fri offert
              <span className="grid size-8 place-items-center rounded-full bg-white text-ink">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </div>

          <button
            type="button"
            aria-label={oppen ? "Stäng meny" : "Öppna meny"}
            aria-expanded={oppen}
            aria-controls="mobilmeny"
            onClick={() => setOppen((o) => !o)}
            className="col-start-3 grid size-12 place-items-center rounded-full bg-tint text-ink md:hidden"
          >
            {oppen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {oppen && (
          <nav
            id="mobilmeny"
            aria-label="Mobilmeny"
            className="absolute inset-x-0 top-full mt-2 flex flex-col gap-1 rounded-[2rem] bg-white p-3 shadow-xl shadow-brand-deep/25 md:hidden"
          >
            {[...VANSTER, ...HOGER].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOppen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className={`${LANK} py-3.5 text-base`}
                activeProps={{
                  className: `${LANK} ${LANK_AKTIV} py-3.5 text-base`,
                  "aria-current": "page",
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/offert" onClick={() => setOppen(false)} className="btn-base btn-navy mt-1">
              Få fri offert
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
