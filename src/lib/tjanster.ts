import { Building2, HardHat, House, Truck, type LucideIcon } from "lucide-react";

export type Tjanst = {
  id: string;
  titel: string;
  kort: string;
  punkter: readonly string[];
  ikon: LucideIcon;
  rut: boolean;
};

export const TJANSTER: readonly Tjanst[] = [
  {
    id: "hemstadning",
    titel: "Hemstädning",
    kort: "Regelbunden städning för dig som vill ha ett rent hem utan att lägga din egen tid på det.",
    punkter: [
      "Städning varje vecka, varannan vecka eller var fjärde vecka",
      "Upplägget anpassas efter ditt hem och dina önskemål",
      "RUT-avdrag direkt på fakturan",
    ],
    ikon: House,
    rut: true,
  },
  {
    id: "flytt-storstadning",
    titel: "Flytt- & storstädning",
    kort: "Djuprengöring inför flytt, eller när det är dags för en riktigt ordentlig genomgång av hemmet.",
    punkter: [
      "Flyttstädning inför överlämning av bostaden",
      "Storstädning inför säsongen eller efter lång tid utan städ",
      "RUT-avdrag för privatpersoner",
    ],
    ikon: Truck,
    rut: true,
  },
  {
    id: "foretagsstadning",
    titel: "Företags- & kontorsstädning",
    kort: "Lokalvård som anpassas efter verksamhetens öppettider och behov.",
    punkter: [
      "Kontor, butiker och andra lokaler",
      "Fasta tider som passar din verksamhet",
      "Offert utifrån lokalens storlek och behov",
    ],
    ikon: Building2,
    rut: false,
  },
  {
    id: "bygg-feststadning",
    titel: "Bygg- & feststädning",
    kort: "Rengöring efter renovering eller efter festen, så att du kan njuta av resultatet.",
    punkter: [
      "Byggstädning efter renovering och ombyggnad",
      "Feststädning efter födelsedag, middag och event",
      "Engångsuppdrag med tydlig offert",
    ],
    ikon: HardHat,
    rut: false,
  },
];
