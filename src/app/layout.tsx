import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Providers } from "./providers";
import "../styles/index.css";
import type { Metadata, Viewport } from "next";
import { baseUrl, gitHubUrl } from "@/utils/textHelper";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "白泽工具箱 | 白泽开源团队",
    template: "%s | 白泽开源团队",
  },
  description:
    "白泽开源团队提供图片压缩、CDN 插件、白泽工具箱等实用工具，助力开发者效率提升。",
  applicationName: "Baize Open Source Team",
  keywords: [
    "白泽开源团队",
    "白泽工具箱",
    "图片压缩",
    "CDN 插件",
    "前端工具",
    "开源",
    "免费",
  ],
  authors: [{ name: "Baize Team", url: gitHubUrl }],
  creator: "Baize Team",
  publisher: "Baize Team",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "白泽开源团队",
    title: "白泽工具箱 | 白泽开源团队",
    description:
      "白泽开源团队提供图片压缩、CDN 插件、白泽工具箱等实用工具，助力开发者效率提升。",
    images: [
      {
        url: "/images/logo/icon.png",
        width: 600,
        height: 600,
        alt: "白泽开源团队",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "白泽工具箱 | 白泽开源团队",
    description:
      "白泽开源团队提供图片压缩、CDN 插件、白泽工具箱等实用工具，助力开发者效率提升。",
    images: ["/images/logo/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <AntdRegistry>
          <Providers>
            <Header />
            <div className="min-h-[calc(100vh-48rem)] md:min-h-[calc(100vh-40rem)] lg:min-h-[calc(100vh-27rem)]">
              {children}
            </div>
            <Footer />
            <ScrollToTop />
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
