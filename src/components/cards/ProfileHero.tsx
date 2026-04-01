"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";

type IconName = keyof typeof LucideIcons;

function getSocialIcon(name: string) {
  const Icon = LucideIcons[name as IconName] as React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  if (!Icon || typeof Icon !== "function") return null;
  return <Icon size={18} />;
}

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative">
      {/* Cover image with gradient */}
      <div className="relative h-[280px] sm:h-[320px] w-full overflow-hidden">
        {member.coverPhoto ? (
          <Image
            src={member.coverPhoto}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-bg-subtle via-bg-primary to-bg-elevated" />
        )}
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-transparent" />
        <div className="absolute inset-0 bg-bg-primary/30" />
      </div>

      {/* Profile content — overlaps the cover */}
      <div className="relative -mt-24 flex flex-col items-center text-center px-6 pb-6">
        {/* Photo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-5"
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] bg-gradient-to-br from-accent-gold/60 via-accent-gold/20 to-accent-gold/60">
            <div className="w-full h-full rounded-full overflow-hidden bg-bg-primary p-[2px]">
              <Image
                src={member.photo}
                alt={`${member.name}, ${member.title} at ${member.company}`}
                width={128}
                height={128}
                priority
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-display)] text-[2rem] sm:text-4xl text-text-primary tracking-tight leading-none"
        >
          {member.name}
        </motion.h1>

        {/* Title & Company */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 flex items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.12em] text-text-secondary font-medium">
            {member.title}
          </span>
          <span className="text-text-tertiary text-xs">at</span>
          <span className="text-sm text-text-accent font-medium">
            {member.company}
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-sm text-text-secondary max-w-[280px] leading-relaxed"
        >
          {member.bio}
        </motion.p>

        {/* Social icons row */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 flex items-center gap-1"
        >
          {member.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="w-10 h-10 flex items-center justify-center rounded-full text-text-secondary hover:text-accent-gold hover:bg-accent-gold-muted transition-all duration-200"
            >
              {getSocialIcon(social.icon)}
            </a>
          ))}
        </motion.div>

        {/* Status badge */}
        {member.status && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/20 bg-accent-gold-muted backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
              <span className="text-xs text-text-accent font-medium tracking-wide">
                {member.status}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
