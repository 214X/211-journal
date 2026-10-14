'use client';

// Runs in <head>, before <body> exists, so the first paint already has the right theme.
// Must stay in sync with the ThemeProvider settings in providers.tsx (storageKey, attribute).
const script = `
try {
    var theme = localStorage.getItem('theme') || 'system';
    if (theme === 'system') {
        theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'light' || theme === 'dark') {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.colorScheme = theme;
    }
} catch (e) {}
`;

export default function ThemeScript() {
    return (
        <script
            // Same trick as providers.tsx: executable only in SSR HTML
            type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
            // The type differs between server and client on purpose
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: script }}
        />
    );
}
