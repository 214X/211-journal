import { getLocale } from "next-intl/server";
import { getContent, Locale } from "@/i18n/getContent";
import { Link } from "@/i18n/navigation";

import footerContent from "./footerContent.json";
import styles from "./Footer.module.css";
import RecentlyListened from "./RecentlyListened/RecentlyListened";
import SiteAge from "./SiteAge/SiteAge";

const SITE_START = "2026-07-27T20:05:51+03:00";   // first commit of the repo
const REPO_URL = "https://github.com/214X/211-journal";

export default async function Footer() {
    const locale = await getLocale();
    const t = getContent(footerContent, locale as Locale);

    // the sentence holds {name} and {age} where each language wants them
    const signature = t.signature.split(/(\{name\}|\{age\})/).map((piece, i) => {
        if (piece === "{name}") return <strong key={i} className={styles.signatureName}>211</strong>;
        if (piece === "{age}") return <SiteAge key={i} since={SITE_START} units={t.units} className={styles.siteAge} />;
        return piece;
    });

    return (
        <footer className={styles.footer}>
            <div className={styles.columns}>

                {/* Signature: who made the site and for how long */}
                <div className={styles.signature}>
                    <p>{signature}</p>
                    <ul className={styles.signatureLinks}>
                        <li>
                            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className={styles.signatureLink}>
                                {t.source} <span aria-hidden="true">↗</span>
                            </a>
                        </li>
                        <li>
                            <Link href="/contact" className={styles.signatureLink}>{t.contact}</Link>
                        </li>
                    </ul>
                </div>

                <RecentlyListened />

            </div>
        </footer>
    );
}
