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
    <main className="min-h-dvh max-w-[480px] mx-auto pb-24" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)" }}>
      {/* Hero — full viewport immersive */}
      <ProfileHero member={member} />

      {/* Link sections */}
      <div className="flex flex-col gap-12 mt-6">
        {member.sections.map((section, i) => (
          <AnimateIn key={section.id} delay={0.4 + i * 0.1}>
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
          <AnimateIn delay={0.4 + member.sections.length * 0.1}>
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
      <AnimateIn delay={0.7 + member.sections.length * 0.1}>
        <footer className="mt-16 flex justify-center px-6 pb-4">
          <a
            href="https://circle13.space"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#48484A] hover:text-[#86868B] transition-colors duration-300"
          >
            circle13.space
          </a>
        </footer>
      </AnimateIn>
    </main>
    </ThemeProvider>
  );
}
