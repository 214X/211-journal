import { getLocale } from 'next-intl/server';
import { getContent, Locale } from '@/i18n/getContent';

import contactPageContent from './contactPageContent.json';
import styles from "./ContactPage.module.css";

const contacts = [
    { key: 'email',    href: 'mailto:burakkurucaycse@gmail.com', value: 'burakkurucaycse@gmail.com', external: false },
    { key: 'phone',    href: 'tel:+905354652858',                value: '+90 535 465 28 58',         external: false },
    { key: 'github',   href: 'https://github.com/214X',          value: 'github.com/214X',           external: true },
    { key: 'linkedin', href: 'https://www.linkedin.com/in/burak-kuru%C3%A7ay-877a232a7/', value: 'linkedin.com/in/burak-kuruçay', external: true },
] as const;

export default async function ContactPage() {
    const locale = await getLocale();
    const t = getContent(contactPageContent, locale as Locale);

    return (
        <section className={styles.contactPageWrapper}>
            <section className={styles.mainContainer}>

                <h1 className={styles.title}>{t.title}</h1>
                <p className={styles.intro}>{t.intro}</p>

                <ul className={styles.contactList}>
                    {contacts.map((contact) => (
                        <li key={contact.key} className={styles.contactItem}>
                            <span className={styles.contactLabel}>
                                {t.labels[contact.key]}
                            </span>
                            <a
                                href={contact.href}
                                className={styles.contactValue}
                                target={contact.external ? '_blank' : undefined}
                                rel={contact.external ? 'noopener noreferrer' : undefined}
                            >
                                {contact.value}
                            </a>
                        </li>
                    ))}
                </ul>

            </section>
        </section>
    )
}
