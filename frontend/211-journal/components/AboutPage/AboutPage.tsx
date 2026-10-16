import { getLocale } from 'next-intl/server';
import { getContent, Locale } from '@/i18n/getContent';

import aboutPageContent from './aboutPageContent.json';
import styles from "./AboutPage.module.css";

// placeholder until the about page is built
export default async function AboutPage() {
    const locale = await getLocale();
    const t = getContent(aboutPageContent, locale as Locale);

    return (
        <section className={styles.aboutPageWrapper}>
            <h1 className={styles.notice}>
                {t.before}
                <em className={styles.promise}>{t.promise}</em>
                {t.after}
            </h1>
        </section>
    )
}
