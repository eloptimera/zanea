import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  House,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import { Bubblor, Sparkle } from "@/components/Brand";
import { Heading, Mark } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { RutKalkylator } from "@/components/RutKalkylator";
import { FORETAG } from "@/lib/foretag";
import { TJANSTER } from "@/lib/tjanster";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Städfirma i Bromma & Stockholm – Zanea AB" },
      {
        name: "description",
        content:
          "Professionell lokalvård och hemstädning i Stockholm & Bromma. RUT-avdrag direkt på fakturan, ansvarsförsäkring och nöjd-kund-garanti. Få fri offert.",
      },
      { property: "og:title", content: "Städfirma i Bromma & Stockholm – Zanea AB" },
      {
        property: "og:description",
        content: "Hemstädning, flyttstädning, kontorsstädning och feststädning. Få fri offert.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Start,
});

const TRYGGHET = [
  { ikon: BadgeCheck, text: "RUT-avdrag direkt på fakturan" },
  { ikon: ShieldCheck, text: "Ansvarsförsäkring" },
  { ikon: ThumbsUp, text: "Nöjd-kund-garanti" },
] as const;

const KORTSTIL = [
  "bg-brand text-white",
  "border-2 border-line bg-white text-ink",
  "bg-ink text-white",
  "bg-tint text-ink",
] as const;

function Start() {
  return (
    <>
      {/* Hero */}
      <section className="-mt-16 p-3">
        <div className="panel-blue relative isolate overflow-hidden rounded-[2.25rem] pt-24 pb-8 sm:pt-28 lg:pb-10">
          <div className="container-page max-w-[88rem]">
            {/* Jättestor ordbild */}
            <div
              aria-hidden="true"
              className="mx-auto w-fit text-center font-display text-[min(27vw,23rem)] leading-[0.82] text-white select-none"
            >
              zanea
            </div>

            <div className="relative z-20 mt-8 grid gap-8 lg:mt-4 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <h1 className="max-w-lg text-[clamp(1.9rem,4.4vw,2.9rem)]">
                  Professionell lokalvård och hemstädning i <Mark>Stockholm &amp; Bromma</Mark>
                </h1>
                <p className="mt-4 max-w-md leading-relaxed text-white/90">
                  Vi städar hem, kontor och lokaler så att du kan lägga tiden på annat. Skicka en
                  förfrågan så återkommer vi med fri offert.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/offert" className="btn-base btn-white">
                    Få fri offert
                  </Link>
                  <Link to="/rut" className="btn-base btn-outline-white">
                    Boka städning
                  </Link>
                </div>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {TRYGGHET.map(({ ikon: Ikon, text }) => (
                    <li
                      key={text}
                      className="glass flex items-center gap-2 rounded-full py-2 pr-4 pl-3 text-sm font-bold"
                    >
                      <Ikon className="size-4 text-sun" aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 lg:w-[22rem] lg:items-end">
                <div className="w-full rounded-[1.75rem] bg-white p-5 text-ink shadow-2xl shadow-brand-deep/40">
                  <p className="font-display text-xl text-brand">Få fri offert</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    Berätta vad du behöver hjälp med så återkommer vi med ett förslag och pris.
                  </p>
                  <Link
                    to="/offert"
                    className="btn-base btn-blue mt-4 w-full justify-between py-2 pr-2 pl-5"
                  >
                    Begär offert
                    <span className="grid size-9 place-items-center rounded-full bg-white text-brand">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Sparkle className="pointer-events-none absolute top-24 left-[8%] -z-10 hidden size-5 text-white/70 lg:block" />
        </div>
      </section>

      {/* Tjänster */}
      <section id="tjanster" className="container-page py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Tjänster</p>
          <Heading className="mt-4 max-w-2xl text-4xl sm:text-5xl">
            Städning för hem, kontor och <Mark>bygge</Mark>
          </Heading>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {TJANSTER.map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <Link
                to="/tjanster"
                hash={t.id}
                className={`group flex h-full min-h-[17rem] flex-col justify-between rounded-[2rem] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9 ${KORTSTIL[i]}`}
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-full bg-white/20 ring-1 ring-current/15">
                    <t.ikon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="grid size-11 place-items-center rounded-full bg-white text-brand transition-colors group-hover:bg-sun group-hover:text-ink">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-10">
                  <h3 className="text-3xl sm:text-4xl">{t.titel}</h3>
                  <p className="mt-3 max-w-sm leading-relaxed opacity-90">{t.kort}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RUT-kalkylator */}
      <section id="rut" className="bg-fade-tint py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">RUT-kalkylator</p>
            <Heading className="mt-4 max-w-2xl text-4xl sm:text-5xl">
              Se vad städningen kostar <Mark>efter RUT</Mark>
            </Heading>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Ange yta och hur ofta du vill ha städning så får du direkt en uppskattad prislapp
              efter RUT-avdraget.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <RutKalkylator />
          </Reveal>
        </div>
      </section>

      {/* Om oss */}
      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow">Om Zanea</p>
          <Heading className="mt-4 max-w-2xl text-4xl sm:text-5xl">
            Ett lokalt städteam i <Mark>Bromma</Mark>
          </Heading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {FORETAG.namn} är ett städ- och lokalvårdsbolag med säte i {FORETAG.ort}. Vi arbetar i
            Stockholm och Bromma och tar hand om allt från regelbunden hemstädning till
            företagslokaler och byggstädning.
          </p>
          <Link to="/om-oss" className="btn-base btn-outline mt-8">
            Läs mer om oss
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <dl className="grid grid-cols-2 gap-4">
            <div className="rounded-[2rem] bg-brand p-6 text-white">
              <dt className="text-xs font-bold tracking-[0.14em] text-white/85 uppercase">
                Verksamma sedan
              </dt>
              <dd className="mt-3 font-display text-4xl sm:text-5xl">{FORETAG.startar}</dd>
            </div>
            <div className="rounded-[2rem] bg-ink p-6 text-white">
              <dt className="text-xs font-bold tracking-[0.14em] text-sun uppercase">Säte</dt>
              <dd className="mt-3 font-display text-3xl sm:text-4xl">{FORETAG.ort}</dd>
            </div>
            <div className="col-span-2 rounded-[2rem] bg-tint p-6">
              <dt className="text-xs font-bold tracking-[0.14em] text-brand uppercase">
                Arbetsområde
              </dt>
              <dd className="mt-3 font-display text-3xl text-ink">{FORETAG.omrade}</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* Avslutande CTA */}
      <section className="p-3 pt-0">
        <Reveal>
          <div className="panel-blue relative isolate overflow-hidden rounded-[2.25rem] px-6 py-16 sm:px-14 sm:py-24">
            <Bubblor className="pointer-events-none absolute -right-8 -bottom-10 -z-10 hidden w-72 sm:block lg:right-16 lg:w-96" />
            <h2 className="max-w-2xl text-[clamp(2.2rem,5vw,4rem)]">
              Redo för ett <Mark>skinande rent</Mark> hem eller kontor?
            </h2>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/offert" className="btn-base btn-white">
                Få fri offert
              </Link>
              <Link to="/kontakt" className="btn-base btn-outline-white">
                Kontakta oss
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
