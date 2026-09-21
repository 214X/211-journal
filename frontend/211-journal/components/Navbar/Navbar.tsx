'use client';

import { Link, usePathname } from "@/i18n/navigation";
import styles from "./Navbar.module.css";
import ThemeButton from "./ThemeButton/ThemeButton";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={styles.navbar}>
            <Link
                href="/"
                className={pathname === '/' ? styles.active : undefined}
            >
                Home
            </Link>
            <Link
                href="/contact"
                className={pathname === '/contact' ? styles.active : undefined}
            >
                Contact
            </Link>

            <ThemeButton></ThemeButton>
        </nav>
    );
}