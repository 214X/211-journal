import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from 'next/navigation';
import Providers from "@/app/providers";
import ThemeScript from "@/app/theme-script";
import "../globals.css";

// COMPONENTS
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import { 
    Geist,
    Geist_Mono,
    Inter,
    Bricolage_Grotesque
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

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin", "latin-ext"],
    display: "swap",
});

const bricolage = Bricolage_Grotesque({
    variable: "--font-bricolage",
    subsets: ["latin", "latin-ext"],
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
            // Next 16: turn smooth scrolling off during page changes, keep it for #anchors
            data-scroll-behavior="smooth"
            suppressHydrationWarning
            className={`${inter.variable} ${bricolage.variable} ${geistMono.variable}`}
        >
            <head>
                <ThemeScript/>
            </head>
            <body>
                <Providers>
                    <NextIntlClientProvider locale={locale} messages={{}}>
                        <Navbar/>
                        {children}
                        <Footer/>
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}