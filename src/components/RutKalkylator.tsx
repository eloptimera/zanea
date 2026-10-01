import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useId, useState } from "react";
import { FORETAG } from "@/lib/foretag";
import { skickaBokning } from "@/lib/formular";

type TjanstId = "hem" | "stor" | "flytt";
type FrekvensId = "en" | "4v" | "2v" | "1v";

const TJANSTER: { id: TjanstId; namn: string; kvmPerTimme: number; minTimmar: number }[] = [
  { id: "hem", namn: "Hemstädning", kvmPerTimme: 25, minTimmar: 2 },
  { id: "stor", namn: "Storstädning", kvmPerTimme: 15, minTimmar: 3 },
  { id: "flytt", namn: "Flyttstädning", kvmPerTimme: 15, minTimmar: 3 },
];

const FREKVENSER: { id: FrekvensId; namn: string; perManad: number }[] = [
  { id: "en", namn: "Engång", perManad: 0 },
  { id: "4v", namn: "Var 4:e vecka", perManad: 1 },
  { id: "2v", namn: "Varannan vecka", perManad: 2.17 },
  { id: "1v", namn: "Varje vecka", perManad: 4.33 },
];

const RUT_ANDEL = 0.5;
const nf = new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 0 });
const kr = (n: number) => `${nf.format(Math.round(n))} kr`;

const PILL =
  "flex min-h-11 cursor-pointer items-center justify-center rounded-full border-2 border-line bg-white px-4 py-2 text-center text-sm font-bold text-ink transition-colors duration-200 hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-light has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45";

export function RutKalkylator() {
  const id = useId();
  const [kvm, setKvm] = useState(70);
  const [tjanst, setTjanst] = useState<TjanstId>("hem");
  const [frekvens, setFrekvens] = useState<FrekvensId>("en");
  const [skickar, setSkickar] = useState(false);
  const [klart, setKlart] = useState(false);
  const [fel, setFel] = useState<string | null>(null);

  const t = TJANSTER.find((x) => x.id === tjanst)!;
  const f = FREKVENSER.find((x) => x.id === frekvens)!;
  const timmar = Math.max(t.minTimmar, Math.ceil((kvm / t.kvmPerTimme) * 2) / 2);
  const fore = timmar * FORETAG.timpris;
  const avdrag = fore * RUT_ANDEL;
  const efter = fore - avdrag;
  const kanRepeteras = tjanst === "hem";

  function valjTjanst(v: TjanstId) {
    setTjanst(v);
    if (v !== "hem") setFrekvens("en");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFel(null);
    setSkickar(true);
    const fd = new FormData(e.currentTarget);
    try {
      await skickaBokning({
        namn: String(fd.get("namn") ?? ""),
        telefon: String(fd.get("telefon") ?? ""),
        epost: String(fd.get("epost") ?? ""),
        tjanst: t.namn,
        frekvens: f.namn,
        yta_kvm: kvm,
        uppskattat_pris_efter_rut: Math.round(efter),
        gdpr_samtycke: true,
      });
      setKlart(true);
    } catch {
      setFel("Förfrågan kunde inte skickas. Försök igen om en stund.");
    } finally {
      setSkickar(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="rounded-[2rem] border-2 border-line bg-white p-6 sm:p-9">
        <fieldset>
          <legend className="text-sm font-bold text-ink">Typ av städning</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {TJANSTER.map((x) => (
              <label key={x.id} className={PILL}>
                <input
                  type="radio"
                  name={`${id}-tjanst`}
                  className="sr-only"
                  checked={tjanst === x.id}
                  onChange={() => valjTjanst(x.id)}
                />
                {x.namn}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <label htmlFor={`${id}-kvm`} className="text-sm font-bold text-ink">
              Bostadsyta (kvm)
            </label>
            <input
              id={`${id}-kvm`}
              type="number"
              inputMode="numeric"
              min={20}
              max={400}
              value={kvm}
              onChange={(e) => setKvm(Math.min(400, Math.max(0, Number(e.target.value) || 0)))}
              onBlur={() => setKvm((v) => Math.max(20, v))}
              className="field w-28 text-right font-bold"
            />
          </div>
          <input
            type="range"
            min={20}
            max={300}
            step={5}
            value={Math.min(kvm, 300)}
            aria-label="Justera bostadsyta i kvadratmeter"
            onChange={(e) => setKvm(Number(e.target.value))}
            className="mt-5 h-8 w-full cursor-pointer accent-brand"
          />
          <div className="flex justify-between text-xs text-muted-foreground" aria-hidden="true">
            <span>20 kvm</span>
            <span>300 kvm</span>
          </div>
        </div>

        <fieldset className="mt-8" disabled={!kanRepeteras}>
          <legend className="text-sm font-bold text-ink">Hur ofta?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FREKVENSER.map((x) => (
              <label key={x.id} className={PILL}>
                <input
                  type="radio"
                  name={`${id}-frekvens`}
                  className="sr-only"
                  checked={frekvens === x.id}
                  onChange={() => setFrekvens(x.id)}
                />
                {x.namn}
              </label>
            ))}
          </div>
          {!kanRepeteras && (
            <p className="mt-3 text-xs text-muted-foreground">
              {t.namn} utförs som ett engångsuppdrag. Regelbundenhet finns för hemstädning.
            </p>
          )}
        </fieldset>
      </div>

      <div className="flex flex-col gap-4">
        <div className="panel-blue rounded-[2rem] p-6 sm:p-9" aria-live="polite" aria-atomic="true">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-white/80">
            Din uppskattning
          </p>
          <p className="mt-3 font-display text-[clamp(2.6rem,6vw,3.6rem)] leading-none">
            {kr(efter)}
            <span className="ml-2 font-sans text-base font-bold text-white/85">efter RUT</span>
          </p>
          {f.perManad > 0 && (
            <p className="mt-2 text-sm text-white/90">
              ≈ {kr(efter * f.perManad)} per månad · {f.namn.toLowerCase()}
            </p>
          )}
          <dl className="mt-6 space-y-3 border-t border-white/25 pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-white/85">Uppskattad tid</dt>
              <dd className="font-bold">{nf.format(timmar)} h</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/85">Pris före RUT</dt>
              <dd className="font-bold">{kr(fore)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/85">RUT-avdrag (50 %)</dt>
              <dd className="font-bold">−{kr(avdrag)}</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-white/80">
            Preliminär uppskattning per tillfälle utifrån yta och typ av städning. Exakt pris får du
            i en offert.
          </p>
        </div>

        {klart ? (
          <div className="rounded-[2rem] bg-tint p-6 sm:p-8" role="status">
            <CheckCircle2 className="size-8 text-brand" aria-hidden="true" />
            <h3 className="mt-3 text-2xl">Tack – vi hör av oss</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Din förfrågan är mottagen. Vi återkommer med en offert så snart vi kan.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4 rounded-[2rem] bg-tint p-6 sm:p-8">
            <h3 className="text-2xl">Få en exakt offert</h3>
            <div>
              <label htmlFor={`${id}-namn`} className="text-sm font-bold">
                Namn
              </label>
              <input
                id={`${id}-namn`}
                name="namn"
                autoComplete="name"
                required
                className="field mt-1.5"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-tel`} className="text-sm font-bold">
                  Telefon
                </label>
                <input
                  id={`${id}-tel`}
                  name="telefon"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="field mt-1.5"
                />
              </div>
              <div>
                <label htmlFor={`${id}-epost`} className="text-sm font-bold">
                  E-post
                </label>
                <input
                  id={`${id}-epost`}
                  name="epost"
                  type="email"
                  autoComplete="email"
                  required
                  className="field mt-1.5"
                />
              </div>
            </div>
            <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
              <input type="checkbox" required className="mt-0.5 size-5 shrink-0 accent-brand" />
              <span>
                Jag samtycker till att {FORETAG.namn} använder mina uppgifter för att svara på
                förfrågan. Läs{" "}
                <Link to="/integritetspolicy" className="font-bold text-brand underline">
                  integritetspolicyn
                </Link>
                .
              </span>
            </label>
            {fel && (
              <p role="alert" className="text-sm font-bold text-destructive">
                {fel}
              </p>
            )}
            <button type="submit" disabled={skickar} className="btn-base btn-blue">
              {skickar ? "Skickar …" : "Skicka förfrågan"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
