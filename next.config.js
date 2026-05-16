/** @type {import('next').NextConfig} */
import { codeInspectorPlugin } from 'code-inspector-plugin';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  turbopack: {
    rules: codeInspectorPlugin({
      bundler: 'turbopack',
    }),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig); // 用 export default