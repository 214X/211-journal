'use client';

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import styles from "./LanguageButton.module.css"

export default function LanguageButton() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const toggleLocale = () => {
        const newLocale = locale === 'tr' ? 'en' : 'tr';
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className={styles.externalContainer
        }>
            <button 
                className={styles.buttonContainer}
                onClick={toggleLocale}
            >
                {locale === 'tr' ? 'EN' : 'TR'}
            </button>
        </div>
    )
}