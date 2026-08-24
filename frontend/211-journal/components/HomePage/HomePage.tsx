import { getLocale } from 'next-intl/server';
import { getContent, Locale } from '@/i18n/getContent';

import homePageContent from './homePageContent.json';
import styles from "./HomePage.module.css"
import Image from "next/image"

import LanguageButton from './HomeComponents/LanguageButton/LanguageButton';

export default async function HomePage() {
    const locale = await getLocale();
    const t = getContent(homePageContent, locale as Locale);

    return (
        <div>
            <section className={styles.homePageWrapper}>
                <section className={styles.mainContainer}>

                    {/* Profile Section */}
                    <div className={styles.profile}>
                        <Image
                            src="/me.jpeg"
                            alt={t.name}
                            width={128}
                            height={128}
                            className={styles.profileAvatar}
                        />
                        <div className={styles.profileTextContainer}>
                            <h1 className={styles.profileName}>
                                {t.name}
                            </h1>
                            <h2 className={styles.profileJobTitle}>
                                {t.jobTitle}
                            </h2>
                        </div>
                    </div>

                    {/* About Me Section */}
                    <section className={styles.aboutMeSection}>
                        <h1 className={styles.introductoryLine}>
                            {t.introductoyLine}
                        </h1>
                        <p className={styles.aboutMeText}>
                            {t.aboutParagraph1}<br/><br/>
                            {t.aboutParagraph2}<br/><br/>
                            {t.aboutParagraph3}
                        </p>
                    </section>

                    {/* Language Button */}
                    <LanguageButton/>

                </section>
            </section>
        </div>
    )
}