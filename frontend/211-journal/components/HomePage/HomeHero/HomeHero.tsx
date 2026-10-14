import Image from "next/image";
import { getLocale } from "next-intl/server";
import { getContent, Locale } from "@/i18n/getContent";
import { Link } from "@/i18n/navigation";

import homeHeroContent from "./homeHeroContent.json";
import styles from "./HomeHero.module.css";

export default async function HomeHero() {
    const locale = await getLocale();
    const t = getContent(homeHeroContent, locale as Locale);

    return (
        <section className={styles.hero}>
            <div className={styles.partSmall}/>   {/* 10% */}
            <div className={styles.partMedium}/>  {/* 30% */}
            <div className={styles.partLarge}>    {/* 60% */}
                <div className={styles.photoFrame}>
                    <Image
                        src="/home-hero-pic.jpg"
                        alt=""
                        fill
                        sizes="(min-width: 768px) 60vw, 100vw"
                        preload
                        className={styles.photo}
                    />
                </div>
            </div>

            <div className={styles.content}>
                <p className={styles.kicker}>{t.kicker}</p>
                <h1 className={styles.title}>
                    211 <em>Journal</em>
                </h1>
                <p className={styles.lead}>{t.lead}</p>
                <div className={styles.actions}>
                    <a href="#about" className={styles.primaryButton}>{t.primaryCta}</a>
                    <Link href="/contact" className={styles.secondaryLink}>{t.secondaryCta}</Link>
                </div>
            </div>
        </section>
    );
}
