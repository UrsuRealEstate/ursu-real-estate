"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useFavorites } from "./FavoritesProvider";
import { Heart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Header({ lang }: { lang: Locale }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dict, setDict] = useState<any>(null);
  const { favoritesCount } = useFavorites();
  const pathname = usePathname();

  useEffect(() => {
    import(`@/app/[lang]/dictionaries/${lang}.json`).then((module) => {
      setDict(module.default);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lang]);

  if (!dict)
    return (
      <header className="h-20 w-full fixed top-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b" />
    );

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/contacts`, label: dict.nav.contacts },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-primary text-primary-foreground ${
        isScrolled ? "shadow-md py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left: Desktop Nav */}
        <nav className="hidden md:flex items-center justify-start gap-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname === `${link.href}/`;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide uppercase transition-colors hover:text-primary-foreground ${
                  isActive
                    ? "text-primary-foreground font-semibold"
                    : "text-primary-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Center: Logo (Left on Mobile) */}
        <div className="flex md:justify-center w-full">
          <Link href={`/${lang}`} className="flex items-center gap-2 z-10">
            <Image
              src="/ursu-logo5.png"
              alt="URSU Logo"
              width={673}
              height={273}
              className="w-auto h-8 sm:h-11.5 object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-2 z-10">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher currentLang={lang} />

            <Link href={`/${lang}/favorites`}>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-white/10 text-primary-foreground"
                aria-label={dict.nav.favorites}
              >
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-foreground text-primary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher currentLang={lang} />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/10 text-primary-foreground"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] flex flex-col pt-16 px-8 border-l border-border/50 shadow-2xl"
              >
                <VisuallyHidden>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigation menu for URSU Real Estate
                  </SheetDescription>
                </VisuallyHidden>

                <nav className="flex flex-col gap-8">
                  {navLinks.map((link) => {
                    const isActive =
                      pathname === link.href || pathname === `${link.href}/`;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg uppercase tracking-wider transition-colors ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-foreground hover:text-primary"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <div className="h-px bg-border w-full my-2" />
                  <Link
                    href={`/${lang}/favorites`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg uppercase tracking-wider hover:text-primary transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${pathname && pathname.includes("/favorites") ? "fill-primary text-primary" : "text-primary"}`}
                    />
                    <span>{dict.nav.favorites}</span>
                    {favoritesCount > 0 && (
                      <span className="bg-primary px-2 py-0.5 text-xs text-primary-foreground rounded-full ml-auto">
                        {favoritesCount}
                      </span>
                    )}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
