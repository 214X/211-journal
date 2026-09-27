'use client';

import type { ReactNode } from "react";
import styles from "./Switch.module.css";

type SwitchProps = {
    leftLabel: string;
    rightLabel: string;
    // true = right option selected, false = left option selected
    checked: boolean;
    onChange: (checked: boolean) => void;
    // Optional visuals: what fills the track / what sits inside the thumb
    trackContent?: ReactNode;
    thumbContent?: ReactNode;
};

export default function Switch({
    leftLabel,
    rightLabel,
    checked,
    onChange,
    trackContent,
    thumbContent,
}: SwitchProps) {
    // Clicking the already-selected label should do nothing
    const select = (value: boolean) => {
        if (value !== checked) onChange(value);
    };

    return (
        <div className={styles.row}>
            <button
                type="button"
                // Keyboard users use the switch itself; labels are mouse shortcuts
                tabIndex={-1}
                className={`${styles.option} ${!checked ? styles.selected : ''}`}
                onClick={() => select(false)}
            >
                {leftLabel}
            </button>

            <button
                type="button"
                // role="switch" + aria-checked = native on/off semantics
                role="switch"
                aria-checked={checked}
                // Read as "türkçe, switch, on" -> meaningful to screen readers
                aria-label={rightLabel}
                className={styles.track}
                onClick={() => onChange(!checked)}
            >
                <span className={styles.trackContent} aria-hidden="true">
                    {trackContent}
                </span>
                <span className={styles.thumb} aria-hidden="true">
                    {thumbContent}
                </span>
            </button>

            <button
                type="button"
                tabIndex={-1}
                className={`${styles.option} ${checked ? styles.selected : ''}`}
                onClick={() => select(true)}
            >
                {rightLabel}
            </button>
        </div>
    );
}