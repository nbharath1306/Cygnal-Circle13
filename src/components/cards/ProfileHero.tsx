"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/data/types";
import { renderIcon } from "@/lib/icons";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function ProfileHero({ member }: { member: TeamMember }) {
  return (
    <section className="relative overflow-hidden">
      {/* Full immersive background */}
      <div className="relative min-h-[100dvh] w-full overflow-hidden flex items-end justify-center">
        {/* Cover image */}
        {member.coverPhoto ? (
          <>
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover scale-125 blur-[20px] brightness-[0.15]"
            />
            <Image
              src={member.coverPhoto}
              alt=""
              fill
              priority
              className="object-cover object-center brightness-[0.45]"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a14] via-black to-[#0a0814]" />
        )}

        {/* Gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

        {/* Ambient color blobs */}
        <div className="absolute bottom-[10%] left-1/2 w-[500px] h-[500px] rounded-full bg-[#0A84FF]/[0.03] blur-[120px] ambient" />
        <div className="absolute bottom-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#5E5CE6]/[0.03] blur-[100px] ambient" style={{ animationDelay: "3s" }} />

        {/* ── Floating glass card — the hero panel ── */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className="relative z-10 w-full max-w-[420px] mx-5 mb-8"
        >
          <div className="glass-bright rounded-[24px] p-7 flex flex-col items-center text-center">
            {/* Photo */}
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden ring-2 ring-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.3)] mb-5">
              <Image
                src={member.photo}
                alt={member.name}
                width={80}
                height={80}
                priority
                className="rounded-full object-cover w-full h-full"
              />
            </div>

            {/* Name */}
            <h1 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight leading-tight">
              {member.name}
            </h1>

            {/* Title */}
            <p className="mt-1 text-[14px] text-white/50 font-normal">
              {member.title} · {member.company}
            </p>

            {/* Bio */}
            <p className="mt-3 text-[13px] text-white/40 max-w-[280px] leading-[1.5]">
              {member.bio}
            </p>

            {/* Social icons — glass pills */}
            <div className="mt-5 flex items-center gap-2">
              {member.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="
                    w-[36px] h-[36px] flex items-center justify-center
                    rounded-full glass-subtle
                    text-white/40 hover:text-white hover:bg-white/10
                    transition-all duration-200
                    active:scale-90
                  "
                >
                  {renderIcon(social.icon, { size: 15 })}
                </a>
              ))}
            </div>

            {/* Status */}
            {member.status && (
              <div className="mt-5 flex items-center gap-2">
                <span className="w-[6px] h-[6px] rounded-full bg-[#30D158] pulse-dot" />
                <span className="text-[12px] text-white/40">
                  {member.status}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
