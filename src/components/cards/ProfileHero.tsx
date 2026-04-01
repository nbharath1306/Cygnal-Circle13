"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative">
      {/*
        Cover — atmospheric blur backdrop.
        Works with ANY photo (portrait, landscape, square).
        The image is rendered twice:
        1. Blurred + scaled up → fills the container as ambient color/texture
        2. Sharp + naturally positioned → visible through a soft vignette
        This is the Spotify/Apple Music approach.
      */}
      <div className="relative h-[340px] sm:h-[380px] w-full overflow-hidden">
        {member.coverPhoto ? (
          <>
            {/* Layer 1: Blurred ambient fill — always covers, any aspect ratio */}
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover scale-150 blur-2xl brightness-75 saturate-[1.2]"
            />
            {/* Layer 2: Sharp image, centered, natural positioning */}
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover object-center"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1610] via-bg-primary to-[#0d0c0a]" />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/25 via-transparent to-transparent" />
        {/* Side vignette for cinematic feel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--color-bg-primary)_100%)]" />
        {/* Gold ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-accent-gold/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Profile content — overlaps cover */}
      <div className="relative -mt-32 flex flex-col items-center text-center px-6 pb-8">
        {/* Profile photo with gold ring */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="relative mb-6"
        >
          {/* Outer glow */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent-gold/20 via-transparent to-accent-gold/20 blur-lg" />
          {/* Gold border ring */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[2.5px] bg-gradient-to-br from-accent-gold via-accent-gold-bright to-accent-gold">
            <div className="w-full h-full rounded-full overflow-hidden bg-bg-primary ring-2 ring-bg-primary">
              <Image
                src={member.photo}
                alt={`${member.name}, ${member.title} at ${member.company}`}
                width={144}
                height={144}
                priority
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="font-[family-name:var(--font-display)] text-[2.25rem] sm:text-[2.75rem] text-text-primary tracking-[-0.02em] leading-none"
        >
          {member.name}
        </motion.h1>

        {/* Title pill */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-3"
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.18em] text-text-accent font-semibold px-3 py-1 rounded-full border border-accent-gold/15 bg-accent-gold-muted">
            {member.title} &middot; {member.company}
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="mt-5 text-[14px] sm:text-[15px] text-text-secondary max-w-[300px] leading-[1.6]"
        >
          {member.bio}
        </motion.p>

        {/* Social icons */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="mt-6 flex items-center gap-2"
        >
          {member.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target={social.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="
                w-11 h-11 flex items-center justify-center rounded-full
                bg-bg-elevated/80 border border-border-default
                text-text-secondary
                hover:text-accent-gold-bright hover:border-accent-gold/30
                hover:bg-accent-gold-muted hover:shadow-[0_0_16px_-4px_rgba(212,175,85,0.25)]
                transition-all duration-250 ease-out
              "
            >
              {renderIcon(social.icon, { size: 18 })}
            </a>
          ))}
        </motion.div>

        {/* Status badge */}
        {member.status && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease }}
            className="mt-5"
          >
            <div className="glow-pulse inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-gold/15 bg-accent-gold-muted/60 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent-gold" />
              <span className="text-[12px] text-text-accent font-semibold tracking-wide">
                {member.status}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
