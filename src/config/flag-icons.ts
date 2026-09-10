// Flaggen-SVGs statt Emojis: Windows rendert Länderflaggen-Emojis nicht
// (Chrome/Edge zeigen dort nur Buchstabenpaare wie "DE"). Gleiche Assets
// wie im Navbar-Sprach-Switcher — zentral, damit CTA-/Team-/Über-uns-
// Sektionen nicht jeweils eigene Importlisten pflegen.
import DeutschIcon from "@/assets/icons/Deutsch.svg";
import EnglischIcon from "@/assets/icons/Englisch.svg";
import ItalienischIcon from "@/assets/icons/Italienisch.svg";
import PersischIcon from "@/assets/icons/Persisch.svg";
import RussischIcon from "@/assets/icons/Russisch.svg";
import SinghalesischIcon from "@/assets/icons/Singhalesisch.svg";
import PakistanischIcon from "@/assets/icons/Pakistanisch.svg";
import IndischIcon from "@/assets/icons/Indisch.svg";
import PunjabiIcon from "@/assets/icons/Punjabi.svg";

/** Länder-Code → Flaggen-SVG (Codes wie in ueber-uns.json → languages.items[].flag).
 *  pk/in/pa neu: Urdu (pakistanische Flagge), Hindi (indische Flagge),
 *  Punjabi (Punjabi-Flagge) — sitenweit als 7.-9. Sprach-Pille ergaenzt. */
export const FLAG_ICONS: Record<string, string> = {
  de: DeutschIcon,
  gb: EnglischIcon,
  it: ItalienischIcon,
  ir: PersischIcon,
  ru: RussischIcon,
  lk: SinghalesischIcon,
  pk: PakistanischIcon,
  in: IndischIcon,
  pa: PunjabiIcon,
};

/** Bestehende Pill-Reihenfolge der CTA-Sektionen: DE, EN, IT, FA, RU, SI,
 *  plus neu UR, HI, PA am Ende. */
export const FLAG_ICONS_ORDERED = [
  DeutschIcon,
  EnglischIcon,
  ItalienischIcon,
  PersischIcon,
  RussischIcon,
  SinghalesischIcon,
  PakistanischIcon,
  IndischIcon,
  PunjabiIcon,
];
