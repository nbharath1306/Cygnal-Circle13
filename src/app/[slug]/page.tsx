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

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
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
  const member = getTeamMember(slug);

  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-dvh max-w-[480px] mx-auto pb-20">
      {/* Hero — handles its own animations */}
      <ProfileHero member={member} />

      {/* Link sections */}
      <div className="flex flex-col gap-10 mt-2">
        {member.sections.map((section, i) => (
          <AnimateIn key={section.id} delay={0.5 + i * 0.12}>
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
          <AnimateIn delay={0.5 + member.sections.length * 0.12}>
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
      <AnimateIn delay={0.8 + member.sections.length * 0.12}>
        <footer className="mt-20 flex flex-col items-center gap-4 px-6">
          <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-text-tertiary/60 tracking-[0.2em] uppercase">
              Powered by
            </span>
            <a
              href="https://circle13.space"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-text-accent/80 hover:text-text-accent transition-colors font-semibold tracking-wider uppercase"
            >
              Circle13
            </a>
          </div>
        </footer>
      </AnimateIn>
    </main>
  );
}
