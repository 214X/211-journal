// preserveAspectRatio="slice": fill the whole track (like CSS object-fit: cover)

export function UkFlag() {
    return (
        <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
            {/* Clip used to draw the thin red diagonals only on one side
                of each white diagonal, as on the real Union Jack */}
            <clipPath id="uk-flag-diagonal-clip">
                <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
            <rect width="60" height="30" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-flag-diagonal-clip)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
    );
}

export function TrFlag() {
    return (
        <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice">
            <rect width="30" height="20" fill="#E30A17" />
            {/* Crescent = white circle minus an offset red circle */}
            <circle cx="10" cy="10" r="5" fill="#fff" />
            <circle cx="11.25" cy="10" r="4" fill="#E30A17" />
            {/* Five-pointed star, one tip pointing at the crescent */}
            <polygon
                fill="#fff"
                points="16.67,10 18.4,9.44 18.4,7.62 19.47,9.09 21.19,8.53 20.13,10 21.19,11.47 19.47,10.91 18.4,12.38 18.4,10.56"
            />
        </svg>
    );
}
