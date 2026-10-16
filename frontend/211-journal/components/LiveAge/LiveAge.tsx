'use client';

import { useEffect, useState } from "react";

/*
 * An age in years that keeps counting up on screen, e.g. "23.703120458".
 * The last digits change every frame, so it feels like time flowing.
 * With reduced motion it shows two decimals and updates once a minute.
 */

type LiveAgeProps = {
    /** Birth moment, any Date-parsable string, e.g. "2003-02-03T00:00:00+03:00". */
    birth: string;
    /** Digits after the decimal point while it is running. */
    decimals?: number;
    className?: string;
};

const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;   // average Gregorian year

const ageInYears = (birthMs: number) => (Date.now() - birthMs) / YEAR_MS;

export default function LiveAge({ birth, decimals = 8, className }: LiveAgeProps) {
    const birthMs = new Date(birth).getTime();
    const [age, setAge] = useState(() => ageInYears(birthMs).toFixed(decimals));

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const update = () => setAge(ageInYears(birthMs).toFixed(2));
            const first = window.setTimeout(update, 0);
            const id = window.setInterval(update, 60_000);
            return () => {
                clearTimeout(first);
                clearInterval(id);
            };
        }

        let frame = 0;
        const tick = () => {
            setAge(ageInYears(birthMs).toFixed(decimals));
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [birthMs, decimals]);

    // the server and the browser render a few ms apart, so the first digits never match exactly
    return <span className={className} suppressHydrationWarning>{age}</span>;
}
