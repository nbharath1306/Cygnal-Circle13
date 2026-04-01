"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative overflow-hidden">
      {/* ── FULL-BLEED IMMERSIVE HERO ── */}
      <div className="relative min-h-[85dvh] w-full overflow-hidden flex flex-col justify-end">
        {/* Cover image — THE star */}
        {member.coverPhoto ? (
          <>
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover scale-[1.3] blur-[30px] brightness-[0.15]"
            />
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover object-center brightness-[0.5] contrast-110 saturate-[0.9]"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A10] via-[#030304] to-[#0A0808]" />
        )}

        {/* Heavy cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030304]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,transparent,#030304)]" />

        {/* Warm ambient light */}
        <div className="absolute bottom-[10%] left-1/2 w-[500px] h-[500px] rounded-full bg-[#D4B87A]/[0.03] blur-[120px] ambient" />
        <div className="absolute bottom-[15%] left-[40%] w-[250px] h-[300px] rounded-full bg-[#D4A060]/[0.025] blur-[90px] ambient" style={{ animationDelay: "4s" }} />

        {/* ── Content positioned at bottom of hero ── */}
        <div className="relative z-10 px-7 pb-10 flex flex-col items-center text-center">

          {/* Photo — substantial, sharp */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="relative mb-7"
          >
            <div className="absolute -inset-4 rounded-full bg-[#D4B87A]/[0.06] blur-2xl" />
            <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full p-[2px] bg-gradient-to-b from-[#D4B87A]/50 via-[#D4B87A]/15 to-transparent shadow-[0_0_40px_-10px_rgba(212,184,122,0.15)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#030304]">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={120}
                  height={120}
                  priority
                  className="rounded-full object-cover w-full h-full contrast-[1.05]"
                />
              </div>
            </div>
          </motion.div>

          {/* Name — HUGE */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="font-[family-name:var(--font-display)] text-[3rem] sm:text-[4.5rem] text-white tracking-[-0.04em] leading-[0.85]"
          >
            {member.name}
          </motion.h1>

          {/* Title bar */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-4 flex items-center gap-4"
          >
            <div className="h-[0.5px] w-8 bg-gradient-to-r from-transparent to-[#D4B87A]/30" />
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#D4B87A]/80 font-bold">
              {member.title}
            </p>
            <span className="text-[#D4B87A]/30 text-[10px]">/</span>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold">
              {member.company}
            </p>
            <div className="h-[0.5px] w-8 bg-gradient-to-l from-transparent to-[#D4B87A]/30" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            className="mt-6 text-[13px] text-white/35 max-w-[300px] leading-[1.9] tracking-[0.01em]"
          >
            {member.bio}
          </motion.p>

          {/* Social row — visible, substantial */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="mt-7 flex items-center gap-1.5"
          >
            {member.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="
                  w-11 h-11 flex items-center justify-center rounded-xl
                  bg-white/[0.04] border border-white/[0.04]
                  text-white/30
                  hover:text-[#D4B87A] hover:bg-[#D4B87A]/[0.08] hover:border-[#D4B87A]/20
                  hover:shadow-[0_4px_20px_-6px_rgba(212,184,122,0.15)]
                  transition-all duration-500 ease-out
                "
              >
                {renderIcon(social.icon, { size: 15 })}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Status badge — floating below hero */}
      {member.status && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          className="flex justify-center -mt-1 mb-4"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4B87A] pulse-glow" />
            <span className="text-[9px] text-white/30 tracking-[0.25em] uppercase font-bold">
              {member.status}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
