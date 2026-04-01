"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative">
      {/* Cover — atmospheric, immersive */}
      <div className="relative h-[360px] sm:h-[400px] w-full overflow-hidden">
        {member.coverPhoto ? (
          <>
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover scale-150 blur-3xl brightness-[0.4] saturate-[0.8]"
            />
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover object-center opacity-80"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}
        {/* Gradients — deep fade into pure black */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,black_100%)]" />
      </div>

      {/* Profile content */}
      <div className="relative -mt-36 flex flex-col items-center text-center px-6 pb-10">
        {/* Photo — clean, refined ring */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
          className="relative mb-7"
        >
          <div className="absolute -inset-4 rounded-full bg-accent-gold/[0.06] blur-2xl" />
          <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full p-[2px] bg-gradient-to-b from-accent-gold/50 via-accent-gold/20 to-transparent">
            <div className="w-full h-full rounded-full overflow-hidden bg-black ring-[3px] ring-black">
              <Image
                src={member.photo}
                alt={`${member.name}, ${member.title} at ${member.company}`}
                width={140}
                height={140}
                priority
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Name — commanding */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="font-[family-name:var(--font-display)] text-[2.5rem] sm:text-[3.25rem] text-white tracking-[-0.03em] leading-[0.95]"
        >
          {member.name}
        </motion.h1>

        {/* Title — spaced, quiet authority */}
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-4 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-text-secondary font-medium"
        >
          {member.title} &nbsp;&bull;&nbsp; {member.company}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-5 text-[14px] text-text-secondary/80 max-w-[280px] leading-[1.7] font-light"
        >
          {member.bio}
        </motion.p>

        {/* Social icons — minimal, refined */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          className="mt-7 flex items-center gap-3"
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
                border border-white/[0.08]
                text-white/40
                hover:text-white hover:border-white/20
                hover:bg-white/[0.04]
                transition-all duration-300 ease-out
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
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="mt-6"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold glow-pulse" />
              <span className="text-[11px] text-text-secondary tracking-[0.08em] font-medium">
                {member.status}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
