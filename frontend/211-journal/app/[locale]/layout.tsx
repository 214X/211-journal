import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from 'next/navigation';
import Providers from "@/app/providers";
import Navbar from "@/components/Navbar/Navbar";
import "../globals.css";

import { 
    Geist,
    Geist_Mono,
    Instrument_Sans 
} from "next/font/google";


// ----- FONTS STARTS ------------------------------------------------
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
    variable: "--font-instrument-sans",
    subsets: ["latin", "latin-ext"],
    style: ["normal", "italic"],   // italik de gelsin
    display: "swap",
});
// ----- FONTS ENDS ------------------------------------------------

export const metadata: Metadata = {
    title: "211-journal",
    description: "Burak Kuruçay's journal",
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    const {locale} = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    return (
        <html
            lang={locale}
            suppressHydrationWarning
            className={`${instrumentSans.variable} ${geistMono.variable}`}
        >
            <body>
                <Providers>
                    <NextIntlClientProvider locale={locale} messages={{}}>
                        <Navbar/>
                        {children}
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}