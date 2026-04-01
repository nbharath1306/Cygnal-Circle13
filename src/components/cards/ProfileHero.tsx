"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

/* Apple's spring animation — damping: 20, stiffness: 300 equivalent */
const spring = { type: "spring" as const, damping: 25, stiffness: 200 };
const ease = [0.42, 0, 0.58, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[100dvh] w-full overflow-hidden flex items-end justify-center pb-10 px-5">
        {/* Background image */}
        {member.coverPhoto ? (
          <>
            <Image src={member.coverPhoto} alt="" fill priority
              className="object-cover scale-[1.2] blur-[20px] brightness-[0.1]" />
            <Image src={member.coverPhoto} alt="" fill priority
              className="object-cover object-center brightness-[0.4]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-black to-black" />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_55%,transparent,black)]" />

        {/* Ambient */}
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] rounded-full bg-[#2997FF]/[0.02] blur-[100px] ambient" />

        {/* ═══ Floating glass panel ═══ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={spring}
          className="relative z-10 w-full max-w-[400px]"
        >
          <div className="material-thick rounded-[22px] p-8 flex flex-col items-center text-center">

            {/* Photo — Apple contact card style */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...spring, delay: 0.1 }}
            >
              <div className="w-[76px] h-[76px] rounded-full overflow-hidden ring-[2.5px] ring-white/[0.12] shadow-[0_2px_16px_rgba(0,0,0,0.3)]">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={76}
                  height={76}
                  priority
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </motion.div>

            {/* Name — Apple Large Title: 34pt bold +0.374 tracking */}
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="mt-5 text-[28px] sm:text-[34px] font-bold text-[#F5F5F7] leading-[1.06]"
              style={{ letterSpacing: "0.374px" }}
            >
              {member.name}
            </motion.h1>

            {/* Title — Apple Subheadline: 15pt regular -0.24 tracking */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.22, ease }}
              className="mt-1.5 text-[15px] font-normal text-white/56"
              style={{ letterSpacing: "-0.24px" }}
            >
              {member.title}<span className="text-white/25 mx-1.5">·</span>{member.company}
            </motion.p>

            {/* Bio — Apple Body: 17pt regular -0.408 tracking */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.28, ease }}
              className="mt-4 text-[15px] text-white/40 max-w-[300px] leading-[1.47]"
              style={{ letterSpacing: "-0.24px" }}
            >
              {member.bio}
            </motion.p>

            {/* Divider */}
            <div className="w-full h-[0.33px] bg-[rgba(84,84,88,0.65)] my-5" />

            {/* Social icons — Apple contact card action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35, ease }}
              className="flex items-center gap-3 w-full justify-center"
            >
              {member.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="
                    flex flex-col items-center gap-1.5
                    w-[52px] py-2 rounded-[12px]
                    bg-[rgba(120,120,128,0.12)]
                    hover:bg-[rgba(120,120,128,0.2)]
                    active:bg-[rgba(120,120,128,0.3)]
                    transition-all duration-150
                    active:scale-95
                  "
                >
                  <span className="text-[#2997FF]">
                    {renderIcon(social.icon, { size: 18 })}
                  </span>
                  <span className="text-[9px] text-white/40 font-medium leading-none" style={{ letterSpacing: "0.1px" }}>
                    {social.platform.length > 6 ? social.platform.slice(0, 5) : social.platform}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Status — below the card */}
      {member.status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="flex justify-center py-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-[6px] h-[6px] rounded-full bg-[#30D158] pulse-alive" />
            <span className="text-[13px] text-white/40 font-normal" style={{ letterSpacing: "-0.08px" }}>
              {member.status}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
