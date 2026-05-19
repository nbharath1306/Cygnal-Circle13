"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import { playTap } from "@/lib/sound";
import type { TeamMember } from "@/data/types";
import Image from "next/image";

export function ElitePassModal({ member }: { member: TeamMember }) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize Tilt on Modal Card
  useEffect(() => {
    const cardEl = cardRef.current;
    if (isOpen && cardEl) {
      VanillaTilt.init(cardEl, {
        max: 15,
        speed: 600,
        scale: 1.03,
        perspective: 1000,
        glare: true,
        "max-glare": 0.4,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      });
    }
    return () => {
      const el = cardEl as HTMLElement & { vanillaTilt?: { destroy: () => void } } | null;
      el?.vanillaTilt?.destroy();
    };
  }, [isOpen]);

  const toggleModal = () => {
    playTap();
    setIsOpen(!isOpen);
  };

  // NFC vCard client-side download generator
  const downloadvCard = () => {
    playTap();
    const email = member.socials.find((s) => s.platform === "Email")?.url.replace("mailto:", "") || "";
    const phone = member.socials.find((s) => s.platform === "WhatsApp")?.url.replace("https://wa.me/", "+") || "";
    const linkedin = member.socials.find((s) => s.platform === "LinkedIn")?.url || "";

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${member.name}
ORG:${member.company}
TITLE:${member.title}
EMAIL;TYPE=PREFER,INTERNET:${email}
TEL;TYPE=CELL:${phone}
URL:${window.location.href}
X-SOCIALPROFILE;TYPE=linkedin:${linkedin}
NOTE:${member.bio}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${member.name.replace(/\s+/g, "_")}_Circle13.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 260, damping: 20 }}
        onClick={toggleModal}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_6px_20px_rgba(10,132,255,0.3)] border border-white/20 active:scale-95 transition-transform"
        style={{
          background: "linear-gradient(135deg, rgba(10, 132, 255, 0.8), rgba(64, 156, 255, 0.8))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        aria-label="Open Elite Pass"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
          <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 11V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 11V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 11V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* Fullscreen Overlay & Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={toggleModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-[380px] w-full flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={toggleModal}
                className="absolute -top-12 right-2 text-white/50 hover:text-white cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 3D Elite Pass card */}
              <div
                ref={cardRef}
                className="w-full h-[480px] rounded-[24px] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 p-6 flex flex-col justify-between"
                style={{
                  background: "linear-gradient(135deg, rgba(25, 25, 30, 0.75), rgba(15, 15, 18, 0.85))",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                {/* Holographic chrome light leak layer */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background: "linear-gradient(125deg, rgba(255,214,10,0.2) 0%, rgba(10,132,255,0.2) 50%, rgba(48,209,88,0.2) 100%)",
                  }}
                />

                {/* Top Section */}
                <div className="flex justify-between items-start z-10">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-[0.15em] text-white/40 uppercase">Circle13 Member Pass</span>
                    <span className="text-[18px] font-black tracking-tight text-white mt-0.5">ELITE PARTNER</span>
                  </div>
                  {/* Executive Smart Chip representation */}
                  <div className="w-[38px] h-[30px] rounded-[6px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 border border-amber-600/30 flex flex-col justify-between p-1 shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 skew-x-12" />
                    <div className="w-full h-[0.5px] bg-black/20" />
                    <div className="w-full h-[0.5px] bg-black/20" />
                    <div className="w-full h-[0.5px] bg-black/20" />
                  </div>
                </div>

                {/* Mid Section — Member Details */}
                <div className="flex items-center gap-4 z-10">
                  <div className="w-[68px] h-[68px] rounded-full overflow-hidden border border-white/20 p-1 bg-white/5 shrink-0 shadow-md">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={68}
                      height={68}
                      priority
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-[20px] font-extrabold text-white leading-tight truncate">{member.name}</h2>
                    <p className="text-[13px] font-semibold text-white/70 truncate mt-0.5">{member.title}</p>
                    <p className="text-[12px] font-semibold text-[#0A84FF] tracking-wider truncate mt-0.5 uppercase">{member.company}</p>
                  </div>
                </div>

                {/* Bottom Section — Custom QR Grid & Network Pass details */}
                <div className="flex items-end justify-between z-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold tracking-[0.1em] text-white/30 uppercase">Verification Code</span>
                    <span className="text-[13px] font-mono tracking-wider text-white/80">C13-{member.slug.toUpperCase()}-2026</span>
                  </div>

                  {/* Elegant High-End Custom SVG QR */}
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[12px] flex items-center justify-center p-2 backdrop-blur-md">
                    <svg viewBox="0 0 24 24" className="w-full h-full text-white/90" fill="currentColor">
                      <path d="M0 0h6v6H0zm2 2h2v2H0zm0 8h2v2H0zm8-10h6v6h-6zm2 2h2v2h-2zm-12 14h6v6H0zm2 2h2v2H0zm8 0h2v2h-2zm4-6h2v2h-2zm2-2h4v2h-4zm0 6h4v2h-4zm-4-4h2v2h-2zm6-4h2v2h-2zm2-2h2v2h-2zm-6-2h2v2h-2zm8 8v4h-2v-4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* NFC Direct Connect Save Contact Trigger Button */}
              <button
                onClick={downloadvCard}
                className="w-full py-4 rounded-[16px] font-bold text-white text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_16px_rgba(10,132,255,0.25)] hover:brightness-110 active:scale-[0.98] transition-all"
                style={{
                  background: "linear-gradient(135deg, #0A84FF, #409CFF)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save Contact Pass (vCard)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
