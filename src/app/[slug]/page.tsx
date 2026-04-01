import { notFound } from "next/navigation";
import { getMember } from "@/lib/data";
import { ProfileHero } from "@/components/cards/ProfileHero";
import { LinkCard } from "@/components/cards/LinkCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { Section } from "@/components/layout/Section";
import { AnimateIn } from "@/components/layout/AnimateIn";
import { StaggerChildren, StaggerItem } from "@/components/layout/StaggerChildren";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import type { Metadata } from "next";

// Dynamic rendering — data can change via admin dashboard
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
    <ThemeProvider themeId={member.theme}>
    <main className="min-h-dvh max-w-[480px] mx-auto pb-20" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}>
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
        <footer className="mt-24 flex flex-col items-center gap-3 px-6">
          <div className="h-px w-10 bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
          <a
            href="https://circle13.space"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] text-white/20 hover:text-violet-300/50 transition-colors duration-400 tracking-[0.3em] uppercase"
          >
            Circle13
          </a>
        </footer>
      </AnimateIn>
    </main>
    </ThemeProvider>
  );
}
