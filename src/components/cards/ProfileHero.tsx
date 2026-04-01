"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative overflow-hidden">
      {/* Full-viewport immersive hero */}
      <div className="relative min-h-[88dvh] w-full overflow-hidden flex flex-col justify-end">
        {member.coverPhoto ? (
          <>
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover scale-[1.3] blur-[30px] brightness-[0.12]"
            />
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover object-center brightness-[0.55] contrast-[1.1]"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}

        {/* Clean cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_55%,transparent,black)]" />

        {/* Blue ambient — subtle */}
        <div className="absolute bottom-[5%] left-1/2 w-[500px] h-[400px] rounded-full bg-[#2997FF]/[0.02] blur-[120px] ambient" />

        {/* Content at bottom */}
        <div className="relative z-10 px-7 pb-12 flex flex-col items-center text-center">

          {/* Photo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease }}
            className="relative mb-8"
          >
            <div className="relative w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] rounded-full ring-[2px] ring-white/10 ring-offset-[3px] ring-offset-black">
              <Image
                src={member.photo}
                alt={member.name}
                width={112}
                height={112}
                priority
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-[family-name:var(--font-display)] text-[2.75rem] sm:text-[3.75rem] text-white tracking-[-0.03em] leading-[0.88]"
          >
            {member.name}
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="mt-3 text-[13px] text-[#86868B]"
          >
            {member.title} <span className="text-[#48484A] mx-1">·</span> {member.company}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="mt-4 text-[14px] text-[#86868B] max-w-[320px] leading-[1.6]"
          >
            {member.bio}
          </motion.p>

          {/* Social icons */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45, ease }}
            className="mt-7 flex items-center gap-4"
          >
            {member.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="
                  text-[#86868B] hover:text-white
                  transition-colors duration-300
                "
              >
                {renderIcon(social.icon, { size: 18 })}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Status */}
      {member.status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="flex justify-center py-5"
        >
          <div className="inline-flex items-center gap-2 text-[12px] text-[#86868B]">
            <span className="w-[5px] h-[5px] rounded-full bg-[#2997FF] pulse-glow" />
            {member.status}
          </div>
        </motion.div>
      )}
    </section>
  );
}
