import { notFound } from "next/navigation";
import { getTeamMember, getAllSlugs } from "@/data/team";
import { ProfileHero } from "@/components/cards/ProfileHero";
import { LinkCard } from "@/components/cards/LinkCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { Section } from "@/components/layout/Section";
import { AnimateIn } from "@/components/layout/AnimateIn";
import { StaggerChildren, StaggerItem } from "@/components/layout/StaggerChildren";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};

  return {
    title: `${member.name} — ${member.title}, ${member.company}`,
    description: `Connect with ${member.name}. ${member.bio}. ${member.title} at ${member.company}.`,
    openGraph: {
      title: `${member.name} — ${member.company}`,
      description: `Connect with ${member.name}`,
      type: "profile",
    },
  };
}

export default async function MemberPage({ params }: { params: Params }) {
  const { slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-dvh max-w-[480px] mx-auto pb-16">
      <AnimateIn delay={0}>
        <ProfileHero member={member} />
      </AnimateIn>

      {/* Link sections */}
      <div className="flex flex-col gap-12 mt-4">
        {member.sections.map((section, sectionIdx) => (
          <AnimateIn key={section.id} delay={0.3 + sectionIdx * 0.15}>
            <Section title={section.title}>
              <StaggerChildren>
                {section.links.map((link) => (
                  <StaggerItem key={link.label}>
                    <LinkCard link={link} />
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </Section>
          </AnimateIn>
        ))}

        {/* Products */}
        {member.products && member.products.length > 0 && (
          <AnimateIn delay={0.3 + member.sections.length * 0.15}>
            <Section title="Products">
              <StaggerChildren>
                {member.products.map((product) => (
                  <StaggerItem key={product.name}>
                    <ProductCard product={product} />
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </Section>
          </AnimateIn>
        )}
      </div>

      {/* Footer */}
      <AnimateIn delay={0.6 + member.sections.length * 0.15}>
        <div className="mt-16 flex flex-col items-center gap-2">
          <div className="text-text-tertiary text-sm tracking-wide">
            &#9670;
          </div>
          <a
            href="https://circle13.space"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
          >
            circle13.space
          </a>
        </div>
      </AnimateIn>
    </main>
  );
}
