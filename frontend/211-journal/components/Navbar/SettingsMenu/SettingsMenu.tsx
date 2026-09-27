'use client';

import { useState, useEffect, useRef } from "react";
import styles from "./SettingsMenu.module.css";
import { useLocale } from "next-intl";
import settingsMenuContent from "./settingsMenuContent.json";
import { getContent, Locale} from "@/i18n/getContent";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";
import LanguageSwitch from "./LanguageSwitch/LanguageSwitch";
import { SettingsIcon } from "./icons";

export default function SettingsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const locale = useLocale();
    const t = getContent(settingsMenuContent, locale as Locale);

    useEffect(() => {
        if (!isOpen) return;

        // clicked on somewhere except menu or settings button
        const handlePointerDown = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // clicked on escape key
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);


    return (
        <div ref={containerRef} className={styles.container}>
            <button
                className={styles.settingsButton}
                onClick={() => setIsOpen(open => !open)}
                title={t.settings}
                aria-label={t.settings}
            >
                <SettingsIcon className={styles.settingsIcon} />
            </button>

            {isOpen && (
                <div className={styles.menu}>
                    <div className={styles.group}>
                        <p className={styles.groupTitle}>{t.language}</p>
                        <LanguageSwitch />
                    </div>
                    <div className={styles.group}>
                        <p className={styles.groupTitle}>{t.theme}</p>
                        <ThemeSwitch lightLabel={t.light} darkLabel={t.dark} />
                    </div>
                </div>
            )}
        </div>
    )
}
