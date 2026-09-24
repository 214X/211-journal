'use client';

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { getContent, Locale } from "@/i18n/getContent";
import navbarContent from "./navbarContent.json";
import styles from "./Navbar.module.css";
import ThemeButton from "./ThemeButton/ThemeButton";

export default function Navbar() {
    const pathname = usePathname();

    const locale = useLocale();
    const t = getContent(navbarContent, locale as Locale);

    return (
        <nav className={styles.navbar}>
            <Link
                href="/"
                className={pathname === '/' ? styles.active : undefined}
            >
                {t.home}
            </Link>
            <Link
                href="/contact"
                className={pathname === '/contact' ? styles.active : undefined}
            >
                {t.contact}
            </Link>

            <ThemeButton></ThemeButton>
        </nav>
    );
}