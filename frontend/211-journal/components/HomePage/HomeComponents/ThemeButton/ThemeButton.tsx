'use client';

import { useTheme } from 'next-themes';
import { useLocale } from "next-intl";
import { getContent, Locale } from "@/i18n/getContent";
import themeButtonContent from "./themeButtonContent.json";
import styles from "./ThemeButton.module.css";

export default function ThemeButton() {
    const { resolvedTheme, setTheme } = useTheme();

    const locale = useLocale();
    const t = getContent(themeButtonContent, locale as Locale);

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={styles.externalContainer}>
            <button
                className={styles.buttonContainer}
                onClick={toggleTheme}
                aria-label={t.toggleLabel}
                title={t.toggleLabel}
            >
                <span className={styles.toDark} aria-hidden="true">☾ {t.toDark}</span>
                <span className={styles.toLight} aria-hidden="true">☀ {t.toLight}</span>
            </button>
        </div>
    );
}