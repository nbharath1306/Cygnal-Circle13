import { notFound } from "next/navigation";
import { getMember } from "@/lib/data";
import { ProfileHero } from "@/components/cards/ProfileHero";
import { LinkCard } from "@/components/cards/LinkCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { Section } from "@/components/layout/Section";
import { LiquidGlassFilter } from "@/components/ui/LiquidGlassFilter";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMember(slug);
  if (!member) return {};
  return {
    title: `${member.name} — ${member.title}, ${member.company}`,
    description: `Connect with ${member.name}. ${member.bio}`,
    openGraph: { title: `${member.name} — ${member.company}`, description: member.bio, type: "profile" },
  };
}

export default async function MemberPage({ params }: { params: Params }) {
  const { slug } = await params;
  const member = await getMember(slug);
  if (!member) notFound();

  return (
    <>
    {/* SVG filters for liquid glass refraction */}
    <LiquidGlassFilter />

    <main className="relative min-h-dvh max-w-[480px] mx-auto overflow-hidden">
      {/* Background — glass refracts this */}
      {/* Background — bright enough for glass to frost over visibly */}
      <div className="fixed inset-0 -z-10">
        {member.coverPhoto ? (
          <img
            src={member.coverPhoto}
            alt=""
            className="w-full h-full object-cover brightness-[0.6] saturate-[0.9] scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2a2a4e] via-[#1e3050] to-[#1a4070]" />
        )}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 pt-14 sm:pt-20 pb-16">
        <ProfileHero member={member} />

        <div className="flex flex-col gap-8 mt-8">
          {member.sections.map((section, si) => (
            <Section key={section.id} title={section.title}>
              {section.links.map((link, li) => (
                <div
                  key={link.label}
                  className="animate-[materialize_0.5s_cubic-bezier(0.4,0,0.2,1)_forwards]"
                  style={{ animationDelay: `${0.4 + si * 0.12 + li * 0.08}s`, opacity: 0 }}
                >
                  <LinkCard link={link} />
                </div>
              ))}
            </Section>
          ))}

          {member.products && member.products.length > 0 && (
            <Section title="Products">
              {member.products.map((product, pi) => (
                <div
                  key={product.name}
                  className="animate-[materialize_0.5s_cubic-bezier(0.4,0,0.2,1)_forwards]"
                  style={{ animationDelay: `${0.7 + pi * 0.08}s`, opacity: 0 }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </Section>
          )}
        </div>

        <footer className="mt-14 flex justify-center">
          <a
            href="https://circle13.space"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-white/25 hover:text-white/50 transition-colors duration-300 font-light"
          >
            circle13.space
          </a>
        </footer>
      </div>

    </main>
    </>
  );
}
