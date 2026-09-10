import type { Metadata } from "next";
import { academy, siteUrl } from "@/content/academy";
import "./globals.css";
export const metadata: Metadata = {
 metadataBase: new URL(siteUrl),
 title:{default:"Pianoforte Akademie · Küssnacht am Rigi",template:"%s · Pianoforte"},
 description:"Persönlicher Klavierunterricht bei Elena Vinogradova in Küssnacht am Rigi. Für Kinder und Erwachsene.",
 openGraph:{type:"website",locale:"de_CH",siteName:academy.brandFull}
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="de" suppressHydrationWarning><body>{children}</body></html>;
}
