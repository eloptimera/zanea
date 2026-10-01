import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Heading, Mark, PageHero } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { RutKalkylator } from "@/components/RutKalkylator";

export const Route = createFileRoute("/rut")({
  head: () => ({
    meta: [
      { title: "RUT-avdrag & priskalkylator – Zanea AB" },
      {
        name: "description",
        content:
          "Räkna ut vad städningen kostar efter RUT-avdrag. Zanea AB drar avdraget direkt på fakturan för hemstädning, storstädning och flyttstädning i Stockholm och Bromma.",
      },
      { property: "og:title", content: "RUT-avdrag & priskalkylator – Zanea AB" },
      { property: "og:url", content: "/rut" },
    ],
    links: [{ rel: "canonical", href: "/rut" }],
  }),
  component: Rut,
});

const FRAGOR = [
  {
    f: "Vad är RUT-avdrag?",
    s: "RUT är en skattereduktion för hushållsnära tjänster, till exempel städning i hemmet. Du betalar bara halva arbetskostnaden – avdraget dras direkt på fakturan och vi ansöker om det hos Skatteverket.",
  },
  {
    f: "Hur mycket kan jag spara?",
    s: "Avdraget är 50 % av arbetskostnaden, upp till 75 000 kr per person och år. Kalkylatorn visar ett räkneexempel – exakt pris får du i en offert.",
  },
  {
    f: "Gäller RUT för företag?",
    s: "Nej, RUT-avdraget är för privatpersoner. Företags- och kontorsstädning faktureras utan avdrag.",
  },
  {
    f: "Vad krävs av mig som kund?",
    s: "Du ska vara folkbokförd i Sverige, minst 18 år och ha betalat tillräckligt med skatt för att kunna utnyttja skattereduktionen. Kontrollera alltid aktuella regler hos Skatteverket, de kan ändras.",
  },
] as const;

function Rut() {
  return (
    <>
      <PageHero
        eyebrow="RUT-avdrag"
        title={
          <>
            Halva arbetskostnaden – direkt på <Mark>fakturan</Mark>
          </>
        }
        intro="Räkna ut vad din städning kostar efter RUT-avdrag och skicka en förfrågan när du är nöjd med upplägget."
      />

      <section className="container-page py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Kalkylator</p>
          <Heading className="mt-4 max-w-2xl text-4xl sm:text-5xl">Din uppskattade kostnad</Heading>
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <RutKalkylator />
        </Reveal>
      </section>

      <section className="bg-fade-tint py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Vanliga frågor</p>
            <Heading className="mt-4 text-4xl sm:text-5xl">Så fungerar RUT</Heading>
            <Link to="/kontakt" className="btn-base btn-outline mt-8">
              Fråga oss
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-3">
              {FRAGOR.map((x) => (
                <details
                  key={x.f}
                  className="group rounded-3xl bg-white p-1 open:shadow-lg open:shadow-brand/10"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-3 font-bold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                    {x.f}
                    <ChevronDown
                      className="size-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-6 pb-5 leading-relaxed text-muted-foreground">{x.s}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
