import Image from "next/image";
import type { TeamMember } from "@/data/types";

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="flex flex-col items-center text-center pt-16 pb-10 px-6">
      {/* Photo */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-6">
        <div className="absolute inset-0 rounded-full ring-2 ring-accent-gold/30 ring-offset-2 ring-offset-bg-primary" />
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.title} at ${member.company}`}
          width={112}
          height={112}
          priority
          className="rounded-full object-cover w-full h-full"
        />
      </div>

      {/* Name */}
      <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-text-primary tracking-tight leading-tight">
        {member.name}
      </h1>

      {/* Title */}
      <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.1em] text-text-secondary font-medium">
        {member.title}
      </p>

      {/* Company */}
      <p className="mt-1 text-sm text-text-accent font-medium">
        {member.company}
      </p>

      {/* Bio */}
      <p className="mt-4 text-sm sm:text-base text-text-secondary italic max-w-xs leading-relaxed">
        &ldquo;{member.bio}&rdquo;
      </p>

      {/* Status badge */}
      {member.status && (
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-gold/20 bg-accent-gold-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
          <span className="text-xs text-text-accent font-medium tracking-wide">
            {member.status}
          </span>
        </div>
      )}
    </section>
  );
}
