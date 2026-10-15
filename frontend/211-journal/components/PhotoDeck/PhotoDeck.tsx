'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getContent, Locale } from "@/i18n/getContent";

import photoDeckContent from "./photoDeckContent.json";
import styles from "./PhotoDeck.module.css";

/*
 * A stack of photos you can flip through: click, swipe, arrow buttons or arrow keys.
 *
 * The top card flies past the deck's own edges while it leaves. Wherever the deck
 * is used, a full-width ancestor needs `overflow: clip`, or the page grows wider
 * for a moment and a sideways scrollbar appears (HomeHero's .hero does this).
 */

export type DeckPhoto = {
    src: string;
    caption: string;
    alt: string;
};

type PhotoDeckProps = {
    photos: DeckPhoto[];
    /** Card shape as width / height. Photos with another shape are cropped to it. */
    aspectRatio?: number;
    /** Any CSS width: "100%", "320px", "min(100%, 28rem)". Never wider than its parent. */
    width?: string;
    /** next/image sizes hint: how wide the deck is on screen. */
    sizes?: string;
    /** Load the first photo early. Use when the deck is at the top of the page. */
    preloadFirst?: boolean;
};

const FLY_MS = 320;          // the top card is mostly off screen by then (see PhotoDeck.module.css)
const SWIPE_DISTANCE = 70;   // px a drag must travel to count as a swipe
const CLICK_DISTANCE = 5;    // px below which a press counts as a click

export default function PhotoDeck({
    photos,
    aspectRatio = 4 / 3,
    width = "100%",
    sizes = "100vw",
    preloadFirst = false,
}: PhotoDeckProps) {
    const locale = useLocale();
    const t = getContent(photoDeckContent, locale as Locale);

    // order[0] is the photo on top, the rest are stacked behind it
    const [order, setOrder] = useState(() => photos.map((_, i) => i));
    const [leaving, setLeaving] = useState<number | null>(null);    // card flying off the top
    const [entering, setEntering] = useState<number | null>(null);  // card coming back on top
    const [dragX, setDragX] = useState(0);
    const dragStart = useRef<number | null>(null);
    // A ref, not state: two clicks in the same instant must both see the lock
    const busy = useRef(false);

    const top = order[0];

    const next = () => {
        if (busy.current) return;
        busy.current = true;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        setLeaving(top);   // 1) top card flies off to the right
        setTimeout(() => {
            setOrder(o => [...o.slice(1), o[0]]);   // 2) it goes to the bottom of the deck
            setLeaving(null);                       // 3) and fades back in behind the others
            busy.current = false;
        }, reduceMotion ? 0 : FLY_MS);
    };

    const previous = () => {
        if (busy.current) return;
        busy.current = true;
        const back = order[order.length - 1];
        setOrder(o => [back, ...o.slice(0, -1)]);   // bottom card goes on top...
        setEntering(back);                          // ...starting where "next" sends cards
    };

    // Draw the returning card once at the fly-off position, then let it fly back in
    useEffect(() => {
        if (entering === null) return;
        let inner = 0;
        const outer = requestAnimationFrame(() => {
            inner = requestAnimationFrame(() => {
                setEntering(null);
                busy.current = false;
            });
        });
        return () => {
            cancelAnimationFrame(outer);
            cancelAnimationFrame(inner);
        };
    }, [entering]);

    // ----- drag / swipe the top card -----
    const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
        if (busy.current) return;
        dragStart.current = e.clientX;
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
        if (dragStart.current === null) return;
        setDragX(e.clientX - dragStart.current);
    };

    const onPointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
        if (dragStart.current === null) return;
        const dx = e.clientX - dragStart.current;
        dragStart.current = null;
        setDragX(0);

        if (dx > SWIPE_DISTANCE) next();
        else if (dx < -SWIPE_DISTANCE) previous();
        else if (Math.abs(dx) < CLICK_DISTANCE) next();   // a plain click also flips
    };

    const onPointerCancel = () => {
        dragStart.current = null;
        setDragX(0);
    };

    return (
        <figure
            className={styles.deck}
            // size comes in as CSS variables, so all sizing rules stay in the CSS file
            style={{ "--deck-width": width, "--deck-ratio": aspectRatio } as React.CSSProperties}
        >
            <div
                className={styles.cards}
                tabIndex={0}
                aria-label={t.label}
                onKeyDown={e => {
                    if (e.key === "ArrowRight") next();
                    if (e.key === "ArrowLeft") previous();
                }}
            >
                {photos.map((photo, i) => {
                    const pos = order.indexOf(i);
                    const isTop = pos === 0;
                    const isDragged = isTop && dragX !== 0;

                    return (
                        <Image
                            key={photo.src}
                            src={photo.src}
                            alt={isTop ? photo.alt : ""}
                            aria-hidden={!isTop}
                            fill
                            sizes={sizes}
                            preload={preloadFirst && i === 0}
                            draggable={false}
                            className={styles.card}
                            data-pos={Math.min(pos, 3)}
                            data-state={i === leaving ? "leaving" : i === entering ? "entering" : undefined}
                            data-dragging={isDragged || undefined}
                            style={{
                                zIndex: photos.length - pos,
                                transform: isDragged ? `translateX(${dragX}px) rotate(${dragX / 25}deg)` : undefined,
                            }}
                            {...(isTop && { onPointerDown, onPointerMove, onPointerUp, onPointerCancel })}
                        />
                    );
                })}
            </div>

            <div className={styles.bar}>
                <figcaption className={styles.caption} aria-live="polite">
                    <span className={styles.fig}>{t.figure} {top + 1}</span> {photos[top].caption}
                </figcaption>
                <div className={styles.nav}>
                    <button type="button" onClick={previous} aria-label={t.previous}>←</button>
                    <span>{top + 1} / {photos.length}</span>
                    <button type="button" onClick={next} aria-label={t.next}>→</button>
                </div>
            </div>
        </figure>
    );
}
