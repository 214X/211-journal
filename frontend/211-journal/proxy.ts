import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// BLACK LIST
// If somthing do not need to [locale] prefix add it to blacklist
const excludedPrefixes = [
    'api',
    '_next',
    '_vercel',
];

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isExcluded = excludedPrefixes.some(
        (prefix) => pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`)
    );

    if (isExcluded) {
        return NextResponse.next();
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        // ".*\\..*" part is for files (exp: asd.jpeg)
        '/((?!.*\\..*).*)'
    ]
};
