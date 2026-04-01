"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative overflow-hidden">
      {/* ── Background ── */}
      <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden">
        {member.coverPhoto ? (
          <>
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover scale-[1.5] blur-[40px] brightness-[0.2] saturate-[0.6] sepia-[0.15]"
            />
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover object-center brightness-[0.55] contrast-[1.1] saturate-[0.85]"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-[#020204]" />
        )}

        {/* Deep vignette — dramatic, cinematic */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204]/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#020204_100%)]" />

        {/* Warm ambient glow — like a single pendant light in a dark room */}
        <div className="absolute bottom-[15%] left-1/2 w-[400px] h-[400px] rounded-full bg-[#BFA97A]/[0.04] blur-[120px] ambient-glow" />
        <div className="absolute bottom-[20%] left-[45%] w-[200px] h-[250px] rounded-full bg-[#D4A06A]/[0.03] blur-[80px] ambient-glow" style={{ animationDelay: "3s" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative -mt-48 flex flex-col items-center text-center px-8 pb-12">

        {/* Photo — clean, heavy border, no gimmicks */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease }}
          className="relative mb-9"
        >
          <div className="absolute -inset-6 rounded-full bg-[#BFA97A]/[0.04] blur-3xl" />
          <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full p-[2px] bg-gradient-to-b from-[#BFA97A]/40 via-[#BFA97A]/10 to-transparent">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#020204] ring-[3px] ring-[#020204]">
              <Image
                src={member.photo}
                alt={`${member.name}, ${member.title} at ${member.company}`}
                width={140}
                height={140}
                priority
                className="rounded-full object-cover w-full h-full grayscale-[0.15] contrast-[1.05]"
              />
            </div>
          </div>
        </motion.div>

        {/* Name — heavy, serif, dominant */}
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-[family-name:var(--font-display)] text-[3rem] sm:text-[4rem] text-white tracking-[-0.04em] leading-[0.85]"
        >
          {member.name}
        </motion.h1>

        {/* Title line — separated, authoritative */}
        <motion.div
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mt-5 flex items-center gap-3"
        >
          <div className="h-px w-6 bg-[#BFA97A]/20" />
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#BFA97A]/70 font-semibold">
            {member.title}
          </p>
          <div className="h-px w-6 bg-[#BFA97A]/20" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/20 font-medium"
        >
          {member.company}
        </motion.p>

        {/* Bio — short, punchy */}
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-7 text-[13px] text-white/35 max-w-[280px] leading-[1.85] tracking-wide"
        >
          {member.bio}
        </motion.p>

        {/* Social icons — minimal, sharp */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="mt-8 flex items-center gap-1"
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
                text-white/20
                hover:text-[#BFA97A] hover:bg-[#BFA97A]/[0.06]
                transition-all duration-500 ease-out
              "
            >
              {renderIcon(social.icon, { size: 16 })}
            </a>
          ))}
        </motion.div>

        {/* Status */}
        {member.status && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65, ease }}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.04] bg-white/[0.015]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BFA97A] breathe" />
              <span className="text-[9px] text-white/30 tracking-[0.2em] uppercase font-semibold">
                {member.status}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
