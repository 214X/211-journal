import Image from "next/image";
import { getLocale } from "next-intl/server";
import { getContent, Locale } from "@/i18n/getContent";
import { getLastPlayedTrack } from "@/lib/spotify";

import recentlyListenedContent from "./recentlyListenedContent.json";
import styles from "./RecentlyListened.module.css";
import { SpotifyIcon } from "./icons";

export default async function RecentlyListened() {
    const track = await getLastPlayedTrack();
    if (!track) return null;

    const locale = await getLocale();
    const t = getContent(recentlyListenedContent, locale as Locale);

    return (
        <div className={styles.wrapper}>
            <p className={styles.heading}>
                <SpotifyIcon className={styles.spotifyIcon} />
                {t.heading}
            </p>

            <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.track}
            >
                <Image
                    src={track.coverUrl}
                    alt=""
                    width={72}
                    height={72}
                    className={styles.cover}
                />
                <span className={styles.trackText}>
                    <span className={styles.title}>{track.title}</span>
                    <span className={styles.artist}>{track.artist}</span>
                </span>
            </a>
        </div>
    );
}
