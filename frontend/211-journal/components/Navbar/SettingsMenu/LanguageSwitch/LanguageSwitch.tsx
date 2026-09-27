'use client';

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale } from "@/i18n/getContent";
import Switch from "../Switch/Switch";
import { TrFlag, UkFlag } from "./flags";

// The two locales this switch toggles between (must exist in routing.ts)
const LEFT_LOCALE: Locale = 'en';
const RIGHT_LOCALE: Locale = 'tr';

export default function LanguageSwitch() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const isTurkish = locale === RIGHT_LOCALE;

    // Stay on the same page, swap only the locale prefix (/en/contact -> /tr/contact)
    const changeLocale = (turkish: boolean) => {
        router.replace(pathname, { locale: turkish ? RIGHT_LOCALE : LEFT_LOCALE });
    };

    return (
        <Switch
            leftLabel="English"
            rightLabel="Türkçe"
            checked={isTurkish}
            onChange={changeLocale}
            trackContent={isTurkish ? <TrFlag /> : <UkFlag />}
        />
    );
}
