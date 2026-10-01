// Enda källan till företagsuppgifter. Allt på sajten (sidfot, kontakt, integritetspolicy,
// meta-data) läser härifrån.
//
// Fält med tomt värde (telefon, e-post, öppettider) visas inte på sajten förrän de fylls i.
export const FORETAG: {
  namn: string;
  kortnamn: string;
  ort: string;
  omrade: string;
  startar: number;
  anstallda: string;
  orgnr: string;
  gata: string;
  postnummer: string;
  adress: string;
  telefon: string;
  telefonLank: string;
  epost: string;
  oppettider: readonly { dagar: string; tid: string }[];
  personer: readonly string[];
  /** PLATSHÅLLARE: kr/timme inkl. moms före RUT-avdrag. Används bara i kalkylatorn. Ersätt med Zaneas riktiga pris. */
  timpris: number;
} = {
  namn: "Zanea AB",
  kortnamn: "Zanea",
  ort: "Bromma",
  omrade: "Stockholm & Bromma",
  startar: 2024,
  anstallda: "ca 4",
  orgnr: "559471-7901",
  gata: "Stenhammarsvägen 2A",
  postnummer: "168 58",
  adress: "Stenhammarsvägen 2A, 168 58 Bromma",
  telefon: "",
  telefonLank: "",
  epost: "",
  oppettider: [],
  personer: ["Anna Katarzyna Vikström", "Elzbieta Irena Gorecki"],
  timpris: 520,
};
