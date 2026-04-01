"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

/* Apple's cubic-bezier: cubic-bezier(0.25, 0.1, 0.25, 1) */
const appleEase = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[100dvh] w-full overflow-hidden flex items-end justify-center pb-12 px-[22px]">
        {/* Background */}
        {member.coverPhoto ? (
          <>
            <Image src={member.coverPhoto} alt="" fill priority
              className="object-cover scale-[1.15] blur-[18px] brightness-[0.08]" />
            <Image src={member.coverPhoto} alt="" fill priority
              className="object-cover object-center brightness-[0.35]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1f] via-black to-black" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_50%,transparent,black)]" />

        {/* Subtle blue ambient */}
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] rounded-full bg-[#2997FF]/[0.015] blur-[100px] ambient" />

        {/* ═══ Glass hero card — apple.com marketing scale ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: appleEase }}
          className="relative z-10 w-full max-w-[420px]"
        >
          <div className="material-thick rounded-[28px] px-8 pt-10 pb-8 flex flex-col items-center text-center">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: appleEase }}
            >
              <div className="w-[88px] h-[88px] rounded-full overflow-hidden ring-[2px] ring-white/[0.15] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={88}
                  height={88}
                  priority
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </motion.div>

            {/* Name — apple.com hero scale: 48px mobile, bold, tight */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: appleEase }}
              className="mt-6 text-[40px] sm:text-[48px] font-bold text-[#F5F5F7] leading-[1.05]"
              style={{ letterSpacing: "-0.015em" }}
            >
              {member.name}
            </motion.h1>

            {/* Subtitle — apple.com subheadline: 21px, semibold */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: appleEase }}
              className="mt-2 text-[19px] sm:text-[21px] font-semibold text-[#86868B]"
              style={{ letterSpacing: "0.011em" }}
            >
              {member.title}<span className="text-white/15 mx-2">·</span>{member.company}
            </motion.p>

            {/* Bio — apple.com body text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35, ease: appleEase }}
              className="mt-4 text-[17px] text-[#86868B] max-w-[320px] leading-[1.47]"
              style={{ letterSpacing: "-0.022em" }}
            >
              {member.bio}
            </motion.p>

            {/* Divider — Apple separator */}
            <div className="w-full h-[0.33px] bg-[rgba(84,84,88,0.65)] mt-7 mb-6" />

            {/* Social action buttons — Apple Contact Card style */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: appleEase }}
              className="flex items-stretch gap-2.5 w-full"
            >
              {member.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="
                    flex-1 flex flex-col items-center justify-center gap-1.5
                    py-3 rounded-[14px]
                    bg-[rgba(120,120,128,0.12)]
                    hover:bg-[rgba(120,120,128,0.2)]
                    active:bg-[rgba(120,120,128,0.32)]
                    active:scale-[0.96]
                    transition-all duration-150
                  "
                >
                  <span className="text-[#2997FF]">
                    {renderIcon(social.icon, { size: 20 })}
                  </span>
                  <span className="text-[10px] text-[#86868B] font-medium">
                    {social.platform.length > 7 ? social.platform.slice(0, 6) : social.platform}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Status */}
      {member.status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: appleEase }}
          className="flex justify-center py-5"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-[7px] h-[7px] rounded-full bg-[#30D158] pulse-alive" />
            <span className="text-[15px] text-[#86868B]" style={{ letterSpacing: "-0.24px" }}>
              {member.status}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
