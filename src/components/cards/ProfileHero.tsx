"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative overflow-hidden">
      {/* Full-viewport hero */}
      <div className="relative min-h-[85dvh] w-full overflow-hidden flex flex-col justify-end">
        {member.coverPhoto ? (
          <>
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover scale-125 blur-[25px] brightness-[0.12]"
            />
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover object-center brightness-50"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,transparent,black)]" />

        {/* Subtle blue ambient */}
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[300px] rounded-full bg-[#2997FF]/[0.015] blur-[100px] ambient" />

        {/* Content */}
        <div className="relative z-10 px-6 pb-14 flex flex-col items-center text-center">
          {/* Photo */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6"
          >
            <div className="w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden ring-[3px] ring-white/15 ring-offset-2 ring-offset-black shadow-[0_0_40px_-10px_rgba(0,0,0,0.8)]">
              <Image
                src={member.photo}
                alt={member.name}
                width={100}
                height={100}
                priority
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </motion.div>

          {/* Name — Apple style: semibold, tight, large */}
          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight leading-tight"
          >
            {member.name}
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.16, ease }}
            className="mt-1.5 text-[15px] text-[#86868B] font-normal"
          >
            {member.title} · {member.company}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.24, ease }}
            className="mt-3 text-[14px] text-[#86868B] max-w-[320px] leading-[1.5]"
          >
            {member.bio}
          </motion.p>

          {/* Social icons — Apple style: rounded rect bg, clean */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32, ease }}
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
                  w-[38px] h-[38px] flex items-center justify-center
                  rounded-[10px] bg-[#1C1C1E]
                  text-[#86868B] hover:text-white hover:bg-[#2C2C2E]
                  transition-all duration-200
                  active:scale-90
                "
              >
                {renderIcon(social.icon, { size: 16 })}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Status — Apple style: just text */}
      {member.status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4, ease }}
          className="flex justify-center py-4"
        >
          <div className="flex items-center gap-2">
            <span className="w-[6px] h-[6px] rounded-full bg-[#30D158] pulse-blue" />
            <span className="text-[13px] text-[#86868B]">
              {member.status}
            </span>
          </div>
        </motion.div>
      )}
    </section>
  );
}
