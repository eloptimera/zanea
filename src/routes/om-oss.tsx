import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Heading, Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { FORETAG } from "@/lib/foretag";

export const Route = createFileRoute("/om-oss")({
  head: () => ({
    meta: [
      { title: "Om oss – Zanea AB, städfirma i Bromma" },
      {
        name: "description",
        content:
          "Zanea AB är ett städ- och lokalvårdsbolag i Bromma som arbetar i Stockholm och Bromma. Möt teamet och läs om hur vi arbetar.",
      },
      { property: "og:title", content: "Om oss – Zanea AB" },
      { property: "og:url", content: "/om-oss" },
    ],
    links: [{ rel: "canonical", href: "/om-oss" }],
  }),
  component: OmOss,
});

const VARDERINGAR = [
  {
    ikon: Heart,
    titel: "Trygghet",
    text: "Du ska känna dig trygg med den som städar hos dig. Därför har vi ansvarsförsäkring och RUT-avdrag direkt på fakturan.",
    stil: "bg-brand text-white",
  },
  {
    ikon: Sparkles,
    titel: "Noggrannhet",
    text: "Vi städar efter dina önskemål och tar oss tid för detaljerna, från hemmet till kontoret.",
    stil: "bg-ink text-white",
  },
  {
    ikon: ShieldCheck,
    titel: "Nöjd-kund-garanti",
    text: "Är du inte nöjd ska du säga till. Vi vill att varje uppdrag ska kännas värt det.",
    stil: "bg-tint text-ink",
  },
] as const;

const FAKTA = [
  { rubrik: "Företag", varde: FORETAG.namn },
  { rubrik: "Organisationsnummer", varde: FORETAG.orgnr },
  { rubrik: "Verksamma sedan", varde: String(FORETAG.startar) },
  { rubrik: "Bransch", varde: "Lokalvård & städservice" },
  { rubrik: "Säte", varde: FORETAG.adress },
  { rubrik: "Arbetsområde", varde: FORETAG.omrade },
] as const;

const initialer = (namn: string) =>
  namn
    .split(" ")
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .map((d) => d[0])
    .join("");

function OmOss() {
  return (
    <>
      <PageHero
        eyebrow="Om oss"
        title={
          <>
            Ett lokalt städteam i <Mark>Bromma</Mark>
          </>
        }
        intro={`${FORETAG.namn} är ett städ- och lokalvårdsbolag med säte i ${FORETAG.ort}. Vi hjälper privatpersoner och företag i ${FORETAG.omrade}.`}
      />

      <section className="container-page grid gap-4 py-20 md:grid-cols-3 sm:py-28">
        {VARDERINGAR.map((v, i) => (
          <Reveal key={v.titel} delay={i * 90}>
            <article className={`h-full rounded-[2rem] p-8 ${v.stil}`}>
              <span className="grid size-14 place-items-center rounded-full bg-white/20">
                <v.ikon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-8 text-3xl">{v.titel}</h2>
              <p className="mt-3 leading-relaxed opacity-90">{v.text}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="bg-fade-tint py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Teamet</p>
            <Heading className="mt-4 text-4xl sm:text-5xl">Människorna bakom Zanea</Heading>
            <ul className="mt-8 space-y-3">
              {FORETAG.personer.map((p) => (
                <li key={p} className="flex items-center gap-4 rounded-3xl bg-white p-4">
                  <span
                    aria-hidden="true"
                    className="grid size-14 shrink-0 place-items-center rounded-full bg-brand font-display text-xl text-white"
                  >
                    {initialer(p)}
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{p}</span>
                    <span className="text-sm text-muted-foreground">{FORETAG.namn}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Fakta om företaget</p>
            <dl className="mt-6 divide-y-2 divide-line rounded-[2rem] bg-white px-6 py-2 sm:px-8">
              {FAKTA.map((f) => (
                <div key={f.rubrik} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-sm font-bold text-ink">{f.rubrik}</dt>
                  <dd className="text-muted-foreground">{f.varde}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <Reveal className="flex flex-wrap justify-center gap-3">
          <Link to="/offert" className="btn-base btn-blue px-9 py-4 text-base">
            Få fri offert
          </Link>
          <Link to="/kontakt" className="btn-base btn-outline px-9 py-4 text-base">
            Kontakta oss
          </Link>
        </Reveal>
      </section>
    </>
  );
}
