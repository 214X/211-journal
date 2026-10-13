import { getLocale } from "next-intl/server";
import { getContent, Locale } from "@/i18n/getContent";

import footerContent from "./footerContent.json";
import styles from "./Footer.module.css";
import RecentlyListened from "./RecentlyListened/RecentlyListened";

const links = [
    { key: 'github',   href: 'https://github.com/214X',          value: '214X',                      external: true },
    { key: 'linkedin', href: 'https://www.linkedin.com/in/burak-kuru%C3%A7ay-877a232a7/', value: 'burak-kuruçay', external: true },
    { key: 'email',    href: 'mailto:burakkurucaycse@gmail.com', value: 'burakkurucaycse@gmail.com', external: false },
] as const;

export default async function Footer() {
    const locale = await getLocale();
    const t = getContent(footerContent, locale as Locale);

    return (
        <footer className={styles.footer}>
            <div className={styles.columns}>

                {/* Links Section */}
                <div>
                    <p className={styles.heading}>{t.heading}</p>
                    <ul className={styles.linkList}>
                        {links.map((link) => (
                            <li key={link.key} className={styles.linkItem}>
                                <span className={styles.linkLabel}>
                                    {t.labels[link.key]}
                                </span>
                                <a
                                    href={link.href}
                                    className={styles.linkValue}
                                    target={link.external ? '_blank' : undefined}
                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                >
                                    {link.value} <span aria-hidden="true">↗</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <RecentlyListened />

            </div>

            <p className={styles.copyright}>
                © {new Date().getFullYear()} Burak Kuruçay
            </p>
        </footer>
    );
}
