"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";
import { useSpecular } from "@/lib/useSpecular";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

const materialize = {
  hidden: { opacity: 0, scale: 0.96, y: 8, filter: "brightness(1.6) blur(6px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "brightness(1) blur(0px)" },
};

export function ProfileHero({ member }: { member: TeamMember }) {
  const { ref, onPointerMove, onPointerLeave } = useSpecular();

  return (
    <div className="flex flex-col items-center">
      {/* Hero glass panel — with cursor-tracking specular */}
      <motion.div
        variants={materialize}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease }}
        className="w-full"
      >
        <div
          ref={ref}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="liquid-glass-panel w-full px-7 pt-9 pb-7 flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Specular highlight on hero card */}
          <div className="liquid-glass-specular" />

          {/* All content above the specular */}
          <div className="relative z-[1] flex flex-col items-center w-full">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <div className="relative">
                <div className="absolute -inset-[3px] rounded-full bg-white/15 backdrop-blur-sm" />
                <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden ring-[1.5px] ring-white/25 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
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

            {/* Name */}
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

            {/* Divider */}
            <div className="w-full h-[0.5px] bg-white/10 mt-6 mb-5" />

            {/* Social icons */}
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
                    bg-white/[0.06] border border-white/[0.12]
                    text-white/50
                    hover:text-white/90 hover:bg-white/[0.14] hover:border-white/[0.25]
                    active:scale-90 active:bg-white/[0.04]
                    transition-all duration-200
                  "
                >
                  {renderIcon(social.icon, { size: 16 })}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
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
