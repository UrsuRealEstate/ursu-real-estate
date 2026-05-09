import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { getPropertiesFromDB } from "@/lib/properties.server";
import { PropertyCard } from "@/components/PropertyCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Building, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const properties = await getPropertiesFromDB();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[25vh] flex items-center justify-center overflow-hidden bg-background pt-5 border-b border-border">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808022_1px,transparent_1px),linear-gradient(to_bottom,#80808022_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-2">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center space-x-4 mb-8 uppercase tracking-[0.3em] text-xs text-primary font-medium">
              <span className="w-12 h-[1px] bg-primary/50"></span>
              <span>URSU Real Estate</span>
              <span className="w-12 h-[1px] bg-primary/50"></span>
            </div>
          </ScrollReveal>

          {/*<ScrollReveal delay={150}>
            <h1 className="text-4xl sm:text-5xl font-serif text-foreground leading-[1.1] tracking-tight mb-8">
              {dict.hero.title}
            </h1>
          </ScrollReveal>*/}

          <ScrollReveal delay={300}>
            <p className="text-4xl text-foreground font-semibold mb-12 max-w-2xl mx-auto leading-relaxed">
              {dict.hero.subtitle}
            </p>
          </ScrollReveal>

          {/*<ScrollReveal delay={450} className="mb-10">
            <Link href={`/${lang}#properties`}>
              <Button
                size="lg"
                className="h-14 px-10 uppercase tracking-widest text-sm bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {dict.hero.cta}
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>
          </ScrollReveal>*/}
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/*<ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-serif tracking-tight mb-4">
                {dict.properties.title}
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                {dict.properties.subtitle}
              </p>
              <div className="w-16 h-[2px] bg-primary mx-auto mt-6" />
            </div>
          </ScrollReveal>*/}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {properties.map((property, i) => (
              <ScrollReveal key={property.id} delay={i * 150}>
                <PropertyCard
                  property={property}
                  lang={lang as Locale}
                  dict={dict}
                  priority={i === 0}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why Us Section */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-serif tracking-tight mb-4">
                {dict.about.title}
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                {dict.about.subtitle}
              </p>
              <div className="w-16 h-[2px] bg-primary mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <ScrollReveal delay={0}>
              <div className="text-center p-8 bg-card border border-border">
                <Clock className="h-8 w-8 text-primary mx-auto mb-6" />
                <h3 className="text-lg font-medium mb-3">
                  {dict.about.experience}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {dict.about.experienceDesc}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="text-center p-8 bg-card border border-border">
                <Building className="h-8 w-8 text-primary mx-auto mb-6" />
                <h3 className="text-lg font-medium mb-3">
                  {dict.about.properties}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {dict.about.propertiesDesc}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="text-center p-8 bg-card border border-border">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-6" />
                <h3 className="text-lg font-medium mb-3">
                  {dict.about.service}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {dict.about.serviceDesc}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
