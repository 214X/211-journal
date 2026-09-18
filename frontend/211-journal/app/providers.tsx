'use client';

import { ThemeProvider } from "next-themes";

export default function Providers({ children } : { children: React.ReactNode}) {
    return (
        <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            themes={['light', 'dark']}
            storageKey="theme"
            enableColorScheme
            disableTransitionOnChange={false}
            // Keep the inline theme script executable only in SSR HTML.
            // On client re-mounts (esp: locale change) mark it as a data block
            scriptProps={{
                type: typeof window === 'undefined' ? 'text/javascript' : 'text/plain',
            }}
        >
            {children}
        </ThemeProvider>
    );
}