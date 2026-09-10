import type { Locale } from "@/content/academy";
import type { Dictionary } from "./types";
import { de } from "./de";import { en } from "./en";import { fr } from "./fr";import { it } from "./it";import { ru } from "./ru";
import { atelier } from "./atelier";
const dictionaries:Record<Locale,Dictionary>={de,ru,en,fr,it};
export function getDictionary(locale:Locale):Dictionary{
 const source=dictionaries[locale]??de;const copy=atelier[locale];
 return {...source,hero:{...source.hero,line:copy.heroLine},pricing:{...source.pricing,lead:copy.pricingLead},contact:{...source.contact,lead:copy.contactLead},legal:{...source.legal,privacyBody:source.legal.privacyBody.map((text,i)=>i===2?copy.privacyContact:text)}};
}
