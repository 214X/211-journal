import { getLocale } from 'next-intl/server';
import { getContent, Locale } from '@/i18n/getContent';

import homePageContent from './homePageContent.json';
import styles from "./HomePage.module.css"
import Image from "next/image"
import { Link } from "@/i18n/navigation";
import HomeHero from "./HomeHero/HomeHero";
import Typewriter from "@/components/Typewriter/Typewriter";
import LiveAge from "@/components/LiveAge/LiveAge";

// how a marked piece of about text is drawn ("mark" in homePageContent.json)
const MARKS = {
    red:       styles.markRed,
    underline: styles.markUnderline,
};

const BIRTH = "2003-02-03T00:00:00+03:00";   // 03.02.2003, Istanbul time

type AboutPart = { text?: string; mark?: string; href?: string; age?: boolean; divider?: boolean };

// one piece of an about paragraph: plain text, marked text, a link, or the live age
function renderPart(part: AboutPart, i: number) {
    if (part.age) return <LiveAge key={i} birth={BIRTH} decimals={9} className={styles.age}/>;
    // a path inside the site goes through Link so the visitor stays in their language
    if (part.href?.startsWith('/')) return <Link key={i} href={part.href} className={styles.link}>{part.text}</Link>;
    if (part.href) return <a key={i} href={part.href} className={styles.link}>{part.text}</a>;
    if (part.mark) return <span key={i} className={MARKS[part.mark as keyof typeof MARKS]}>{part.text}</span>;
    return part.text;
}

export default async function HomePage() {
    const locale = await getLocale();
    const t = getContent(homePageContent, locale as Locale);

    return (
        <div>
            <HomeHero/>
            <section id="about" className={styles.homePageWrapper}>
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
                                <Typewriter text={t.name}/>
                            </h1>
                            <h2 className={styles.profileJobTitle}>
                                {t.jobTitle}
                            </h2>
                        </div>
                    </div>

                    {/* About Me Section */}
                    <section className={styles.aboutMeSection}>
                        <h1 className={styles.introductoryLine}>
                            {t.greetingBefore}
                            <em className={styles.greetingEmphasis}>{t.greetingEmphasis}</em>
                            {" "}{t.greetingAfter}
                        </h1>
                        {(t.aboutParagraphs as AboutPart[][]).map((paragraph, i) =>
                            // a paragraph that is just { "divider": true } becomes a * * * break
                            paragraph[0]?.divider
                                ? <hr key={i} className={styles.divider}/>
                                : <p key={i} className={styles.aboutMeText}>
                                    {paragraph.map(renderPart)}
                                  </p>
                        )}
                    </section>

                </section>
            </section>
        </div>
    )
}