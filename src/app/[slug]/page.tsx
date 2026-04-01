import { notFound } from "next/navigation";
import { getMember } from "@/lib/data";
import { ProfileHero } from "@/components/cards/ProfileHero";
import { LinkCard } from "@/components/cards/LinkCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { Section } from "@/components/layout/Section";
import { AnimateIn } from "@/components/layout/AnimateIn";
import { GradientMesh } from "@/components/ui/GradientMesh";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMember(slug);
  if (!member) return {};

  return {
    title: `${member.name} — ${member.title}, ${member.company}`,
    description: `Connect with ${member.name}. ${member.bio}`,
    openGraph: {
      title: `${member.name} — ${member.company}`,
      description: member.bio,
      type: "profile",
    },
  };
}

export default async function MemberPage({ params }: { params: Params }) {
  const { slug } = await params;
  const member = await getMember(slug);

  if (!member) {
    notFound();
  }

  return (
    <>
      {/* Colorful animated background — Liquid Glass refracts this */}
      <GradientMesh />

      <main className="relative z-10 min-h-dvh max-w-[480px] mx-auto pb-20">
        <ProfileHero member={member} />

        {/* Link cards — each is its own glass pane */}
        <div className="flex flex-col gap-8 mt-4">
          {member.sections.map((section, i) => (
            <AnimateIn key={section.id} delay={0.5 + i * 0.1}>
              <Section title={section.title}>
                {section.links.map((link, li) => (
                  <div
                    key={link.label}
                    className="animate-[materialize_0.5s_cubic-bezier(0.4,0,0.2,1)_forwards]"
                    style={{
                      animationDelay: `${0.6 + i * 0.1 + li * 0.08}s`,
                      opacity: 0,
                    }}
                  >
                    <LinkCard link={link} />
                  </div>
                ))}
              </Section>
            </AnimateIn>
          ))}

          {member.products && member.products.length > 0 && (
            <AnimateIn delay={0.5 + member.sections.length * 0.1}>
              <Section title="Products">
                {member.products.map((product, pi) => (
                  <div
                    key={product.name}
                    className="animate-[materialize_0.5s_cubic-bezier(0.4,0,0.2,1)_forwards]"
                    style={{
                      animationDelay: `${0.8 + member.sections.length * 0.1 + pi * 0.08}s`,
                      opacity: 0,
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </Section>
            </AnimateIn>
          )}
        </div>

        <AnimateIn delay={1 + member.sections.length * 0.1}>
          <footer className="mt-12 flex justify-center pb-6">
            <a
              href="https://circle13.space"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/20 hover:text-white/40 transition-colors duration-300 font-light"
            >
              circle13.space
            </a>
          </footer>
        </AnimateIn>
      </main>
    </>
  );
}
