'use client';

import { useEffect, useState } from "react";

/*
 * How long the site has existed, counting up every second, e.g. "82 days 4 hours 23 minutes 7 seconds".
 * Units that are zero are left out (seconds always stay). Unit names come from the caller
 * as [singular, plural] so each language can use its own.
 */

type Unit = string[];   // [singular, plural]
type Units = { year: Unit; day: Unit; hour: Unit; minute: Unit; second: Unit };

type SiteAgeProps = {
    /** Start moment, any Date-parsable string. */
    since: string;
    units: Units;
    className?: string;
};

const YEAR_S = 365.2425 * 24 * 60 * 60;   // average Gregorian year
const DAY_S = 24 * 60 * 60;

// a no-break space keeps each number on the same line as its unit
const part = (n: number, [one, many]: Unit) => `${n}\u00a0${n === 1 ? one : many}`;

function format(sinceMs: number, u: Units) {
    let s = Math.floor((Date.now() - sinceMs) / 1000);
    const years = Math.floor(s / YEAR_S);   s -= Math.floor(years * YEAR_S);
    const days = Math.floor(s / DAY_S);     s -= days * DAY_S;
    const hours = Math.floor(s / 3600);     s -= hours * 3600;
    const minutes = Math.floor(s / 60);     s -= minutes * 60;
    return [
        years && part(years, u.year),
        days && part(days, u.day),
        hours && part(hours, u.hour),
        minutes && part(minutes, u.minute),
        part(s, u.second),
    ].filter(Boolean).join(" ");
}

export default function SiteAge({ since, units, className }: SiteAgeProps) {
    const sinceMs = new Date(since).getTime();
    const [text, setText] = useState(() => format(sinceMs, units));

    useEffect(() => {
        const id = window.setInterval(() => setText(format(sinceMs, units)), 1000);
        return () => clearInterval(id);
    }, [sinceMs, units]);

    // the server and the browser render a moment apart, so the seconds may not match
    return <span className={className} suppressHydrationWarning>{text}</span>;
}
