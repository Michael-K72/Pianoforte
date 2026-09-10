"use client";
import { useEffect } from "react";
import type { Locale } from "@/content/academy";
import type { Dictionary } from "@/i18n/types";
export function LocaleShell({ locale }: { locale: Locale; dict: Dictionary }) {
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  return null;
}
