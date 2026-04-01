"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

const materialize = {
  hidden: { opacity: 0, scale: 0.96, y: 8, filter: "brightness(1.6) blur(6px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "brightness(1) blur(0px)" },
};

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center">
      {/* Hero glass panel — materializes on load */}
      <motion.div
        variants={materialize}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease }}
        className="liquid-glass-panel w-full px-7 pt-9 pb-7 flex flex-col items-center text-center"
      >
        {/* Photo — glass ring effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          <div className="relative">
            {/* Glass ring around photo */}
            <div className="absolute -inset-[3px] rounded-full bg-white/20 backdrop-blur-sm" />
            <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden ring-[1.5px] ring-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <Image
                src={member.photo}
                alt={member.name}
                width={80}
                height={80}
                priority
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Name — light weight, generous spacing */}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-5 text-[30px] sm:text-[36px] font-light text-white/92 leading-[1.05] tracking-[0.04em]"
        >
          {member.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease }}
          className="mt-1.5 text-[14px] font-light text-white/55"
        >
          {member.title} · {member.company}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.38, ease }}
          className="mt-3 text-[13px] font-light text-white/40 max-w-[280px] leading-[1.55]"
        >
          {member.bio}
        </motion.p>

        {/* Divider — glass edge */}
        <div className="w-full h-[0.5px] bg-white/12 mt-6 mb-5" />

        {/* Social icons — small glass circles */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45, ease }}
          className="flex items-center gap-3"
        >
          {member.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target={social.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="
                w-[40px] h-[40px] flex items-center justify-center
                rounded-full
                bg-white/[0.08] border border-white/[0.15]
                backdrop-blur-[1px]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]
                text-white/50
                hover:text-white/90 hover:bg-white/[0.16] hover:border-white/[0.3]
                hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_16px_rgba(0,0,0,0.15)]
                active:scale-90 active:bg-white/[0.06]
                transition-all duration-250
              "
            >
              {renderIcon(social.icon, { size: 16 })}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Status */}
      {member.status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
          className="mt-5 flex items-center gap-2"
        >
          <span className="w-[6px] h-[6px] rounded-full bg-[#30D158] pulse-alive" />
          <span className="text-[12px] text-white/40 font-light">{member.status}</span>
        </motion.div>
      )}
    </div>
  );
}
