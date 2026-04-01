"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const materialize = {
  hidden: { opacity: 0, scale: 0.96, y: 8, filter: "brightness(1.5) blur(4px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "brightness(1) blur(0px)" },
};

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative pt-16 sm:pt-20 pb-6 px-5 flex flex-col items-center">
      {/* ═══ Hero glass panel ═══ */}
      <motion.div
        variants={materialize}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease }}
        className="liquid-glass-panel w-full max-w-[420px] px-7 pt-10 pb-7 flex flex-col items-center text-center"
      >
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          <div className="w-[84px] h-[84px] rounded-full overflow-hidden ring-[2px] ring-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <Image
              src={member.photo}
              alt={member.name}
              width={84}
              height={84}
              priority
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Name — light weight, generous tracking (Liquid Glass typography) */}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-5 text-[32px] sm:text-[38px] font-light text-white/92 leading-[1.05] tracking-[0.02em]"
        >
          {member.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease }}
          className="mt-2 text-[15px] font-light text-white/55"
        >
          {member.title} · {member.company}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.38, ease }}
          className="mt-3.5 text-[14px] font-light text-white/40 max-w-[300px] leading-[1.55]"
        >
          {member.bio}
        </motion.p>

        {/* Divider */}
        <div className="w-full h-[0.5px] bg-white/10 mt-6 mb-5" />

        {/* Social icons — glass pills */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45, ease }}
          className="flex items-stretch gap-2 w-full"
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
                py-2.5 rounded-[14px]
                bg-white/[0.06] border border-white/[0.08]
                hover:bg-white/[0.12] hover:border-white/[0.16]
                active:scale-95 active:bg-white/[0.04]
                transition-all duration-200
              "
            >
              <span className="text-[#2997FF]">
                {renderIcon(social.icon, { size: 18 })}
              </span>
              <span className="text-[9px] text-white/35 font-medium leading-none">
                {social.platform.length > 7 ? social.platform.slice(0, 6) : social.platform}
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Status — below card */}
      {member.status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
          className="mt-5 flex items-center gap-2"
        >
          <span className="w-[6px] h-[6px] rounded-full bg-[#30D158] pulse-alive" />
          <span className="text-[13px] text-white/40 font-light">{member.status}</span>
        </motion.div>
      )}
    </section>
  );
}
