"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import { useTranslations } from "next-intl";
import { type Locale, locales } from "@/i18n/config";
import { useRouter } from "next/navigation";

const localeLabels: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
};

const Header = ({ locale }: { locale: Locale }) => {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  // Language switcher
  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split("/");
    // pathname starts with /locale/...
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/"));
  };

  const menuData = [
    {
      id: "home",
      title: t("home"),
      path: `/${locale}`,
      newTab: false,
    },
    {
      id: "imageCompress",
      title: t("imageCompress"),
      path: `/${locale}/image-compress`,
      newTab: false,
    },
    {
      id: "baizeToolbox",
      title: t("baizeToolbox"),
      path: `/${locale}/baize-toolbox`,
      newTab: false,
    },
    {
      id: "more",
      title: t("more"),
      newTab: false,
      submenu: [
        {
          id: "vite-cdn",
          title: t("viteCdn"),
          path: `/${locale}/vite-cdn`,
          newTab: false,
        },
        {
          id: "webpack-cdn",
          title: t("webpackCdn"),
          path: `/${locale}/webpack-cdn`,
          newTab: false,
        },
        {
          id: "quick-study",
          title: t("quickStudy"),
          path: `/${locale}/quick-study`,
          newTab: false,
        },
        {
          id: "about",
          title: t("about"),
          path: `/${locale}/about`,
          newTab: false,
        },
      ],
    },
  ];

  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark shadow-sticky fixed z-9999 bg-white/80 backdrop-blur-xs transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="max-w-full px-4 xl:mr-12">
              <Link
                href={`/${locale}`}
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo/icon.png"
                  alt="logo"
                  width={64}
                  height={64}
                  priority
                  fetchPriority="high"
                  className="rounded-lg"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="ring-primary absolute top-1/2 right-4 block translate-y-[-50%] rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar border-body-color/50 dark:border-body-color/20 dark:bg-dark absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-white px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={menuItem.id} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              pathname === menuItem.path
                                ? "text-primary dark:text-white"
                                : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="text-dark group-hover:text-primary flex cursor-pointer items-center justify-between py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 dark:text-white/70 dark:group-hover:text-white"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            <div
                              className={`submenu dark:bg-dark relative top-full left-0 rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem, subIndex) => (
                                <Link
                                  href={submenuItem.path}
                                  key={subIndex}
                                  className="text-dark hover:text-primary block rounded-sm py-2.5 text-sm lg:px-3 dark:text-white/70 dark:hover:text-white"
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end gap-3 pr-16 lg:pr-0">
                {/* Language Switcher */}
                <div className="flex items-center rounded-full bg-gray-100 p-1 dark:bg-gray-800">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 ${
                        locale === loc
                          ? "bg-primary text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      }`}
                    >
                      {localeLabels[loc]}
                    </button>
                  ))}
                </div>
                <ThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
