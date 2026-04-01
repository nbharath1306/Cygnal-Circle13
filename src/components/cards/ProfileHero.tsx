"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

const materialize = {
  hidden: { opacity: 0, scale: 0.96, y: 8, filter: "brightness(1.5) blur(4px)" },
  visible: { opacity: 1, scale: 1, y: 0, filter: "brightness(1) blur(0px)" },
};

export function ProfileHero({ member }: { member: TeamMember }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    VanillaTilt.init(el, {
      max: 5, speed: 600, scale: 1.01, perspective: 1000,
      glare: true, "max-glare": 0.18,
      gyroscope: true, gyroscopeMinAngleX: -12, gyroscopeMaxAngleX: 12,
      gyroscopeMinAngleY: -12, gyroscopeMaxAngleY: 12,
      reset: true, "reset-to-start": true,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)",
    });
    return () => {
      const tiltEl = el as HTMLElement & { vanillaTilt?: { destroy: () => void } };
      tiltEl.vanillaTilt?.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        variants={materialize}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease }}
        className="w-full"
      >
        <div
          ref={panelRef}
          className="liquid-glass-panel w-full px-7 pt-10 pb-8 flex flex-col items-center text-center"
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            <div className="w-[88px] h-[88px] rounded-full overflow-hidden ring-[2px] ring-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
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

          {/* Name — iOS Large Title: 34pt, bold, +0.374 tracking */}
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="mt-5 text-[34px] font-bold text-white leading-[1.06]"
            style={{ letterSpacing: "0.374px" }}
          >
            {member.name}
          </motion.h1>

          {/* Title — iOS Subheadline: 15pt, regular, -0.24 tracking */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
            className="mt-1 text-[15px] font-normal"
            style={{ letterSpacing: "-0.24px", color: "rgba(235, 235, 245, 0.6)" }}
          >
            {member.title} · {member.company}
          </motion.p>

          {/* Bio — iOS Body: 17pt, regular, -0.408 tracking */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.38, ease }}
            className="mt-4 text-[15px] font-normal max-w-[300px] leading-[1.47]"
            style={{ letterSpacing: "-0.24px", color: "rgba(235, 235, 245, 0.3)" }}
          >
            {member.bio}
          </motion.p>

          {/* Separator — iOS opaqueSeparator */}
          <div className="w-full h-px bg-[#38383A] mt-6 mb-5" />

          {/* Social icons — iOS systemFill buttons */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45, ease }}
            className="flex items-center gap-2.5"
          >
            {member.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="
                  w-[44px] h-[44px] flex items-center justify-center
                  rounded-full
                  text-white/60
                  hover:text-white hover:bg-[rgba(120,120,128,0.36)]
                  active:scale-90 active:bg-[rgba(120,120,128,0.24)]
                  transition-all duration-200
                "
                style={{ background: "rgba(120, 120, 128, 0.18)" }}
              >
                {renderIcon(social.icon, { size: 18 })}
              </a>
            ))}
          </motion.div>
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
          <span className="text-[13px] font-normal" style={{ letterSpacing: "-0.08px", color: "rgba(235, 235, 245, 0.3)" }}>
            {member.status}
          </span>
        </motion.div>
      )}
    </div>
  );
}
