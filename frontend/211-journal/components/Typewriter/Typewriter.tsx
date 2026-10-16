'use client';

import { useEffect, useState, type CSSProperties } from "react";
import styles from "./Typewriter.module.css";

/*
 * Deletes a text letter by letter and types the next one, like someone at a keyboard, forever.
 * The server renders the first text in full, so the page never starts empty, and screen
 * readers and search engines get plain text. With reduced motion it just stays still.
 *
 * Every style prop is optional: left out, the text inherits it from its parent,
 * so <h1><Typewriter text="..."/></h1> looks exactly like the h1 around it.
 */

type TypewriterProps = {
    /** What to type. One text is deleted and retyped; several are typed one after another. */
    text: string | string[];

    /** Any CSS value: "2.5rem", "clamp(2rem, 5vw, 3rem)" … */
    fontSize?: CSSProperties["fontSize"];
    /** Any CSS value, e.g. "var(--font-display)" or "var(--font-mono)". */
    fontFamily?: CSSProperties["fontFamily"];
    fontWeight?: CSSProperties["fontWeight"];
    color?: CSSProperties["color"];
    /** Colour of the blinking cursor. Defaults to the accent red. */
    cursorColor?: CSSProperties["color"];
    className?: string;

    /** Pause per typed letter in ms, picked at random between the two, so it feels human. */
    typeMs?: [number, number];
    /** Pause per deleted letter in ms. */
    deleteMs?: number;
    /** How long a finished text stays before it is deleted, in ms. */
    holdMs?: number;
    /** Pause on the empty line before typing again, in ms. */
    emptyMs?: number;
};

const SEPARATOR = "\u0000";   // joins the texts into one string, so the effect only restarts when they change

const wait = (ms: number, timers: number[]) =>
    new Promise<void>(resolve => timers.push(window.setTimeout(resolve, ms)));

export default function Typewriter({
    text,
    fontSize,
    fontFamily,
    fontWeight,
    color,
    cursorColor,
    className,
    typeMs = [70, 160],
    deleteMs = 45,
    holdMs = 2400,
    emptyMs = 500,
}: TypewriterProps) {
    const texts = Array.isArray(text) ? text : [text];
    const textsKey = texts.join(SEPARATOR);
    const [typeMin, typeMax] = typeMs;

    const [shown, setShown] = useState(texts[0]);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const list = textsKey.split(SEPARATOR);
        let stopped = false;
        const timers: number[] = [];

        (async () => {
            let i = 0;
            while (!stopped) {
                const current = Array.from(list[i]);
                await wait(holdMs, timers);
                for (let n = current.length - 1; n >= 0 && !stopped; n--) {
                    setShown(current.slice(0, n).join(""));
                    await wait(deleteMs, timers);
                }
                await wait(emptyMs, timers);

                i = (i + 1) % list.length;
                const next = Array.from(list[i]);
                for (let n = 1; n <= next.length && !stopped; n++) {
                    setShown(next.slice(0, n).join(""));
                    await wait(typeMin + Math.random() * (typeMax - typeMin), timers);
                }
            }
        })();

        return () => {
            stopped = true;
            timers.forEach(clearTimeout);
        };
    }, [textsKey, typeMin, typeMax, deleteMs, holdMs, emptyMs]);

    const longest = texts.reduce((a, b) => (b.length > a.length ? b : a));

    const style = {
        fontSize,
        fontFamily,
        fontWeight,
        color,
        "--cursor-color": cursorColor,
    } as CSSProperties;

    return (
        <span className={`${styles.typewriter} ${className ?? ""}`} style={style}>
            {/* invisible full text: holds the space so nothing around it jumps while typing */}
            <span className={styles.ghost} aria-hidden="true">{longest}<span className={styles.cursor}/></span>
            <span className={styles.typed} aria-hidden="true">{shown}<span className={styles.cursor}/></span>
            <span className={styles.srOnly}>{texts[0]}</span>
        </span>
    );
}
