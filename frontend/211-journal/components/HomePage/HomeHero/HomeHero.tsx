import { Fragment } from "react";
import { getLocale } from "next-intl/server";
import { getContent, Locale } from "@/i18n/getContent";
import { Link } from "@/i18n/navigation";
import PhotoDeck from "@/components/PhotoDeck/PhotoDeck";

import homeHeroContent from "./homeHeroContent.json";
import { HeadphonesIcon, CodeIcon, BookIcon } from "./icons";
import styles from "./HomeHero.module.css";

// one icon per word in "words", in the same order
const wordIcons = [HeadphonesIcon, CodeIcon, BookIcon];

export default async function HomeHero() {
    const locale = await getLocale();
    const t = getContent(homeHeroContent, locale as Locale);

    return (
        <section className={styles.hero}>
            <div className={styles.container}>

                <div className={styles.deckColumn}>
                    <PhotoDeck
                        photos={t.photos}
                        aspectRatio={2000 / 1403}   // all three portraits are 2000×1403
                        width="var(--hero-deck-width, 100%)"   // set on mobile in HomeHero.module.css
                        sizes="(min-width: 768px) 55vw, 100vw"
                        preloadFirst
                    />
                </div>

                <div className={styles.text}>
                    <p className={styles.owner}><b>{t.owner}</b>{t.ownerSuffix}</p>
                    <h1 className={styles.title}>211 <em>Journal</em></h1>

                    <p className={styles.lead}>
                        {t.words.map((word, i) => {
                            const Icon = wordIcons[i];
                            const separator = i < t.words.length - 1 ? ", " : ". ";
                            return (
                                <Fragment key={word}>
                                    <span className={styles.word}>{word}<Icon/></span>{separator}
                                </Fragment>
                            );
                        })}
                        {t.leadRest}
                    </p>

                    <div className={styles.actions}>
                        <a href="#about" className={styles.primary}>
                            {t.primaryCta} <span className={styles.arrow}>→</span>
                        </a>
                        <p className={styles.ps}>
                            {t.psText} <Link href="/contact">{t.psLink} <span className={styles.arrow}>→</span></Link>
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
