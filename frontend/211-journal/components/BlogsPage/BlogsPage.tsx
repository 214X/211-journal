import { getLocale } from 'next-intl/server';
import { getContent, Locale } from '@/i18n/getContent';

import blogsPageContent from './blogsPageContent.json';
import styles from "./BlogsPage.module.css";

// placeholder until the blogs page is built
export default async function BlogsPage() {
    const locale = await getLocale();
    const t = getContent(blogsPageContent, locale as Locale);

    return (
        <section className={styles.blogsPageWrapper}>
            <h1 className={styles.notice}>
                {t.before}
                <em className={styles.promise}>{t.promise}</em>
                {t.after}
            </h1>
        </section>
    )
}
