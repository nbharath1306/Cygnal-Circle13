import { notFound } from "next/navigation";
import { getMember } from "@/lib/data";
import { ProfileHero } from "@/components/cards/ProfileHero";
import { LinkCard } from "@/components/cards/LinkCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { Section } from "@/components/layout/Section";
import { AnimateIn } from "@/components/layout/AnimateIn";

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
    <main className="min-h-dvh max-w-[500px] mx-auto pb-20 bg-black text-white">
      <ProfileHero member={member} />

      <div className="flex flex-col gap-7 -mt-2 relative z-20">
        {member.sections.map((section, i) => (
          <AnimateIn key={section.id} delay={0.3 + i * 0.08}>
            <Section title={section.title}>
              {section.links.map((link) => (
                <LinkCard key={link.label} link={link} />
              ))}
            </Section>
          </AnimateIn>
        ))}

        {member.products && member.products.length > 0 && (
          <AnimateIn delay={0.3 + member.sections.length * 0.08}>
            <Section title="Products">
              {member.products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </Section>
          </AnimateIn>
        )}
      </div>

      <AnimateIn delay={0.5 + member.sections.length * 0.08}>
        <footer className="mt-12 flex justify-center pb-6">
          <a
            href="https://circle13.space"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-white/20 hover:text-white/40 transition-colors duration-200"
          >
            circle13.space
          </a>
        </footer>
      </AnimateIn>
    </main>
    </ThemeProvider>
  );
}
