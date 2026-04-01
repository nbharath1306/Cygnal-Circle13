"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative overflow-hidden">
      {/* ── Background layers ── */}
      <div className="relative h-[400px] sm:h-[460px] w-full overflow-hidden">
        {member.coverPhoto ? (
          <>
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover scale-[1.6] blur-[50px] brightness-[0.3] saturate-75"
            />
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover object-center brightness-[0.6] contrast-[1.05]"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-[#030303]" />
        )}

        {/* Color gradient overlay — the energy */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#030303_100%)]" />

        {/* Ambient color glow — alive, breathing */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-violet-500/[0.07] blur-[100px] ambient-glow" />
        <div className="absolute bottom-[25%] left-[40%] w-[200px] h-[200px] rounded-full bg-pink-500/[0.05] blur-[80px] ambient-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[15%] right-[35%] w-[180px] h-[180px] rounded-full bg-cyan-400/[0.04] blur-[80px] ambient-glow" style={{ animationDelay: "4s" }} />
      </div>

      {/* ── Content ── */}
      <div className="relative -mt-44 flex flex-col items-center text-center px-6 pb-10">
        {/* Photo with animated gradient ring */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className="relative mb-8"
        >
          {/* Soft color glow behind photo */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-violet-500/10 via-pink-500/5 to-cyan-400/10 blur-2xl" />

          {/* Animated gradient ring */}
          <div
            className="relative w-[124px] h-[124px] sm:w-[144px] sm:h-[144px] rounded-full"
            style={{
              padding: "2.5px",
              background: "conic-gradient(from var(--gradient-angle, 0deg), #8B5CF6, #EC4899, #06B6D4, #8B5CF6)",
              animation: "rotate-gradient 3s linear infinite",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[#030303]">
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

        {/* Name — gradient, alive */}
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-[family-name:var(--font-display)] text-[2.75rem] sm:text-[3.75rem] gradient-text tracking-[-0.03em] leading-[0.9]"
        >
          {member.name}
        </motion.h1>

        {/* Title — clean, spaced */}
        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mt-4 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-text-secondary font-medium"
        >
          {member.title} &nbsp;&bull;&nbsp; {member.company}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-5 text-[13px] sm:text-[14px] text-text-secondary/70 max-w-[300px] leading-[1.8]"
        >
          {member.bio}
        </motion.p>

        {/* Social icons — glow on hover */}
        <motion.div
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="mt-7 flex items-center gap-1"
        >
          {member.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target={social.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="
                w-10 h-10 flex items-center justify-center rounded-full
                text-white/25
                hover:text-white
                hover:bg-white/[0.06]
                hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.3)]
                transition-all duration-400 ease-out
              "
            >
              {renderIcon(social.icon, { size: 16 })}
            </a>
          ))}
        </motion.div>

        {/* Status badge — gradient dot */}
        {member.status && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-7"
          >
            <div className="glass inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 breathe" />
              <span className="text-[10px] text-text-secondary tracking-[0.12em] font-medium">
                {member.status}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
