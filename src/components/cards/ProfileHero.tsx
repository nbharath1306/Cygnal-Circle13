"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative">
      {/* Cover — cinematic backdrop */}
      <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden">
        {member.coverPhoto ? (
          <>
            {/* Blurred ambient layer */}
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover scale-[1.8] blur-[60px] brightness-[0.25] saturate-50"
            />
            {/* Sharp layer */}
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover object-center brightness-75 contrast-[1.1]"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-[#050505]" />
        )}
        {/* Vignette — photograph fades into nothingness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_100%)]" />
      </div>

      {/* Content */}
      <div className="relative -mt-40 flex flex-col items-center text-center px-8 pb-12">
        {/* Photo — floating, clean */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className="relative mb-8"
        >
          <div className="absolute -inset-6 rounded-full bg-white/[0.02] blur-2xl" />
          <div className="relative w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-full p-[1.5px] bg-gradient-to-b from-white/20 to-white/[0.03]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#050505]">
              <Image
                src={member.photo}
                alt={`${member.name}, ${member.title} at ${member.company}`}
                width={130}
                height={130}
                priority
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Name — editorial, serif, large */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-[family-name:var(--font-display)] text-[2.75rem] sm:text-[3.5rem] text-white tracking-[-0.04em] leading-[0.9]"
        >
          {member.name}
        </motion.h1>

        {/* Title — quiet, separated */}
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mt-5 text-[10px] uppercase tracking-[0.35em] text-white/30 font-medium"
        >
          {member.title} &nbsp;&middot;&nbsp; {member.company}
        </motion.p>

        {/* Bio — serif, italic, editorial */}
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-6 font-[family-name:var(--font-display)] text-[15px] sm:text-[16px] text-white/40 max-w-[300px] leading-[1.7] italic"
        >
          {member.bio}
        </motion.p>

        {/* Social icons — whisper-thin */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="mt-8 flex items-center gap-4"
        >
          {member.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target={social.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="
                text-white/20 hover:text-white/80
                transition-all duration-500 ease-out
                hover:scale-110
              "
            >
              {renderIcon(social.icon, { size: 17 })}
            </a>
          ))}
        </motion.div>

        {/* Status — barely there */}
        {member.status && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2">
              <span className="w-1 h-1 rounded-full bg-white/40 glow-pulse" />
              <span className="text-[10px] text-white/25 tracking-[0.15em] font-medium">
                {member.status}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
