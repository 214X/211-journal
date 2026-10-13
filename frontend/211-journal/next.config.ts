import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://i.scdn.co/image/**")],
  },
};

export default withNextIntl(nextConfig);