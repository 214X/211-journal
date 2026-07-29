import { routing } from "./routing";

export type Locale = (typeof routing.locales)[number];

export function getContent<T>(content: Record<Locale, T>, locale: Locale): T {
    return content[locale];
}