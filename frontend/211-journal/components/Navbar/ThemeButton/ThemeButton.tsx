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
        <button
            className={styles.themeButton}
            onClick={toggleTheme}
            aria-label={t.toggleLabel}
            title={t.toggleLabel}
        >
            {/* Tabler Icons "sun" and "moon" (MIT) — https://tabler.io/icons */}
            <svg
                className={styles.lightIcon}
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
            </svg>
            <svg
                className={styles.darkIcon}
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" />
            </svg>
        </button>
    );
}
