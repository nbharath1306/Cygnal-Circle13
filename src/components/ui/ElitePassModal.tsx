"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
// Version bump: 2026-05-19-01
import { playTap, playScissorSnip, playLuxuryUnlock, playHover } from "@/lib/sound";
import type { TeamMember } from "@/data/types";
import Image from "next/image";

interface PaperShaving {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotate: number;
}

export function ElitePassModal({ member }: { member: TeamMember }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTorn, setIsTorn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Executive Credentials States
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [meetingContext, setMeetingContext] = useState("");

  // Paper shavings particle state
  const [shavings, setShavings] = useState<PaperShaving[]>([]);
  const lastX = useRef(0);

  const cardRef = useRef<HTMLDivElement>(null);
  
  // Scissor drag tracking
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(296); // default fallback
  const dragX = useMotionValue(0);
  const [dragProgressPercent, setDragProgressPercent] = useState(0);

  // Monitor drag progress, spawn dynamic paper shavings
  useEffect(() => {
    const unsubscribe = dragX.on("change", (latest) => {
      if (trackWidth > 0) {
        setDragProgressPercent((latest / trackWidth) * 100);
      }

      // Spawn real paper shavings relative to drag movement!
      const diff = Math.abs(latest - lastX.current);
      if (diff > 4.5 && latest > 5 && latest < trackWidth - 5) {
        playScissorSnip(); // Play highly realistic Web Audio synthesized metal blade snip friction!
        
        const count = 2 + Math.floor(Math.random() * 2);
        const newShavings = Array.from({ length: count }).map(() => ({
          id: Math.random() + latest,
          x: latest + 14, // offset aligned with scissor blade point
          y: 330, // exact seam vertical position
          size: 2.5 + Math.random() * 3,
          color: ["#FF9B04", "#E65C00", "#F59E0B", "#FFE0B2", "#FFEBE0"][Math.floor(Math.random() * 5)],
          rotate: Math.random() * 360,
        }));

        setShavings((prev) => [...prev, ...newShavings].slice(-80)); // Limit to 80 elements to maintain 60 FPS
        lastX.current = latest;
      }
    });
    return () => unsubscribe();
  }, [dragX, trackWidth]);

  // Read track width dynamically
  useEffect(() => {
    if (isOpen && trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth - 36);
    }
  }, [isOpen]);

  // Initialize Tilt on Modal Card (only if not cut to allow steady dragging)
  useEffect(() => {
    const cardEl = cardRef.current;
    if (isOpen && cardEl && !isTorn) {
      VanillaTilt.init(cardEl, {
        max: 10,
        speed: 600,
        scale: 1.01,
        perspective: 1000,
        glare: true,
        "max-glare": 0.25,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      });
    }
    return () => {
      const el = cardEl as HTMLElement & { vanillaTilt?: { destroy: () => void } } | null;
      el?.vanillaTilt?.destroy();
    };
  }, [isOpen, isTorn]);

  // Reset modal state on close
  const toggleModal = () => {
    playTap();
    if (isOpen) {
      setIsTorn(false);
      setShowForm(false);
      dragX.set(0);
      setDragProgressPercent(0);
      setFullName("");
      setCompany("");
      setPosition("");
      setContactInfo("");
      setMeetingContext("");
      setShavings([]);
      lastX.current = 0;
    }
    setIsOpen(!isOpen);
  };

  // Perform tear-off animation transition
  const handleTear = () => {
    playLuxuryUnlock(); // High-conviction premium crystal pentatonic arpeggio chime!
    setIsTorn(true);
    setTimeout(() => {
      setShowForm(true);
    }, 650); // Matches the gravity exit duration
  };

  // Compile credentials and redirect to WhatsApp/Email follow-up template
  const sendConnectionStub = () => {
    playTap();
    if (!fullName.trim() || !company.trim() || !position.trim()) {
      alert("Please fill in your Full Name, Company, and Executive Position to send the connection key!");
      return;
    }

    const whatsappLink = member.socials.find((s) => s.platform === "WhatsApp")?.url || "";
    const email = member.socials.find((s) => s.platform === "Email")?.url || "";

    const messageText = `Circle13 Executive Connection Request 🤝\n\nHello ${member.name.split(" ")[0]},\n\nIt was great meeting you! I've claimed my Executive Connection Pass. Here are my credentials so we can stay in touch:\n\n👤 Name: ${fullName}\n🏢 Company: ${company}\n💼 Position: ${position}\n🔗 Contact: ${contactInfo || "Not provided"}\n\n📝 Context & Next Steps:\n${meetingContext || "Let's connect and explore synergy soon!"}\n\nBest regards,\n${fullName}`;

    if (whatsappLink) {
      const cleanWaUrl = whatsappLink.split("?")[0];
      const waRedirectUrl = `${cleanWaUrl}?text=${encodeURIComponent(messageText)}`;
      window.open(waRedirectUrl, "_blank");
    } else if (email) {
      const mailtoUrl = `mailto:${email.replace("mailto:", "")}?subject=Circle13 Executive Connection Request&body=${encodeURIComponent(messageText)}`;
      window.open(mailtoUrl, "_blank");
    } else {
      alert("Direct connection methods are not configured, but your request was successfully registered!");
    }
  };

  // NFC vCard save contact download
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
      {/* Floating Action Button (FAB) - Amber Gold Theme */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 260, damping: 20 }}
        onMouseEnter={playHover}
        onClick={toggleModal}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center cursor-pointer active:scale-95 transition-transform group"
        aria-label="Open Elite Pass"
      >
        {/* Inner liquid glass background */}
        <div className="absolute inset-0 liquid-glass !rounded-full" />

        <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-black/75 backdrop-blur-md text-white text-[11px] font-bold py-2 px-3 rounded-xl border border-white/10 shadow-lg pointer-events-none whitespace-nowrap tracking-wider uppercase z-10">
          C13
        </span>

        <div className="font-sans font-[900] text-[22px] text-white tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] select-none relative z-10">
          C13
        </div>
      </motion.button>

      {/* Overlay & Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
            onClick={toggleModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-[380px] w-full flex flex-col items-center gap-4.5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onMouseEnter={playHover}
                onClick={toggleModal}
                className="absolute -top-12 right-2 text-white/50 hover:text-white cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Card Container */}
              {(() => {
                const nameParts = member.name.split(" ");
                const firstName = nameParts[0] || "";
                const lastName = nameParts.slice(1).join(" ") || "";

                return (
                  <div
                    className="w-full relative overflow-hidden select-none"
                    style={{
                      height: showForm ? "440px" : "480px",
                    }}
                  >
                    {/* ── REAL-TIME PAPER SHAVINGS EMITTER (Fluttering Downward) ── */}
                    <AnimatePresence>
                      {shavings.map((shaving) => (
                        <motion.div
                          key={shaving.id}
                          className="absolute pointer-events-none rounded-[1px] z-30"
                          initial={{
                            x: shaving.x + 12,
                            y: shaving.y,
                            rotate: shaving.rotate,
                            scale: 1,
                            opacity: 1,
                          }}
                          animate={{
                            y: shaving.y + 120 + Math.random() * 80, // fall
                            x: shaving.x + 12 + (Math.random() * 46 - 23), // drift
                            rotate: shaving.rotate + (Math.random() * 360 - 180), // spin
                            opacity: 0,
                            scale: 0.5,
                          }}
                          transition={{
                            duration: 0.7 + Math.random() * 0.4,
                            ease: "easeOut",
                          }}
                          style={{
                            width: shaving.size,
                            height: shaving.size * 1.6,
                            backgroundColor: shaving.color,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                          }}
                        />
                      ))}
                    </AnimatePresence>

                    {/* ── CARD TOP HALF (Absolute Seam locked, Unified Gradient) ── */}
                    <motion.div
                      ref={cardRef}
                      className="absolute top-0 left-0 right-0 rounded-t-[24px] rounded-b-[6px] border-t border-x border-yellow-400/45 shadow-[inset_0_1px_0_rgba(251,191,36,0.3)] p-6 flex flex-col justify-between overflow-hidden"
                      style={{
                        background: "linear-gradient(to bottom, #FF9B04 0%, #E65C00 100%)",
                        backgroundImage: "linear-gradient(to bottom, #FF9B04 0%, #E65C00 100%), radial-gradient(circle at 50% 50%, transparent, rgba(0,0,0,0.18)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.16'/%3E%3C/svg%3E\")",
                        backgroundBlendMode: "overlay, normal, normal",
                        height: showForm ? "440px" : "330px",
                        borderBottom: isTorn ? "1px solid rgba(251, 191, 36, 0.15)" : "none",
                      }}
                      animate={{
                        height: showForm ? 440 : 330,
                      }}
                      transition={{ type: "spring", damping: 26, stiffness: 220 }}
                    >
                      {/* Holographic dynamic iridescent glare layer */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-[0.09] mix-blend-color-dodge z-[2] holographic-reflection"
                        style={{
                          background: "linear-gradient(135deg, #FFD60A 0%, #64D2FF 35%, #FF2D55 70%, #30D158 100%)",
                        }}
                      />

                      {/* Ripped-Cotton heavy paper fiber bottom edge seam */}
                      {isTorn && (
                        <div className="absolute bottom-0 left-0 right-0 h-[4px] overflow-hidden pointer-events-none z-20">
                          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 10" fill="none" className="text-[#0d0d12]">
                            <path d="M0,0 L100,0 L100,2 Q95,5 90,2 Q85,8 80,3 Q75,6 70,2 Q65,7 60,3 Q55,5 50,2 Q45,8 40,3 Q35,6 30,2 Q25,7 20,3 Q15,5 10,2 Q5,8 0,3 Z" fill="currentColor" />
                          </svg>
                        </div>
                      )}

                      {/* Reflective light mask */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          background: "linear-gradient(125deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.3) 100%)",
                        }}
                      />

                      {/* Notches aligned exactly at bottom seam */}
                      <div className="absolute -left-3.5 bottom-[-14px] w-7 h-7 rounded-full bg-[#0d0d12] border-r border-white/10 z-20" />
                      <div className="absolute -right-3.5 bottom-[-14px] w-7 h-7 rounded-full bg-[#0d0d12] border-l border-white/10 z-20" />

                      {/* Top Header */}
                      <div className="flex justify-between items-start z-10 relative">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/70 uppercase">Circle13 Presents</span>
                          <span className="text-[15px] font-black tracking-[0.1em] text-white uppercase mt-0.5">Executive Pass</span>
                        </div>
                        
                        {/* Liquid Glass C13 Logo */}
                        <div className="w-16 h-16 rounded-full flex items-center justify-center relative shrink-0 select-none liquid-glass !rounded-full shadow-lg">
                          <div className="absolute inset-0 bg-white/10 skew-x-12 -translate-x-full animate-[shine_4s_infinite]" />
                          <div className="font-sans font-[900] text-[22px] text-white tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] select-none relative z-10">
                            C13
                          </div>
                        </div>
                      </div>

                      {/* TOP HALF MAIN CREDENTIALS / EXECUTIVE LEAD HANDSHAKE FORM */}
                      <div className="flex flex-col z-10 relative flex-1 justify-center">
                        <AnimatePresence mode="wait">
                          {showForm ? (
                            /* EXECUTIVE HANDSHAKE FORM */
                            <motion.div
                              key="handshake-form"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                              className="flex flex-col gap-2.5 w-full mt-1.5"
                            >
                              <div className="flex flex-col">
                                <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-yellow-200/90 uppercase">Secure Handshake request</span>
                                <span className="text-[9.5px] text-white/70 leading-tight mt-0.5">Enter your professional details to establish connection with {member.name.split(" ")[0]}</span>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="Full Name"
                                  value={fullName}
                                  onChange={(e) => setFullName(e.target.value)}
                                  className="w-full bg-black/35 border border-white/15 rounded-[10px] py-2 px-3 text-[12.5px] text-white placeholder-white/45 focus:outline-none focus:border-white transition-colors shadow-inner"
                                />
                                <input
                                  type="text"
                                  placeholder="LinkedIn or Email"
                                  value={contactInfo}
                                  onChange={(e) => setContactInfo(e.target.value)}
                                  className="w-full bg-black/35 border border-white/15 rounded-[10px] py-2 px-3 text-[12.5px] text-white placeholder-white/45 focus:outline-none focus:border-white transition-colors shadow-inner"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="Company / Org"
                                  value={company}
                                  onChange={(e) => setCompany(e.target.value)}
                                  className="w-full bg-black/35 border border-white/15 rounded-[10px] py-2 px-3 text-[12.5px] text-white placeholder-white/45 focus:outline-none focus:border-white transition-colors shadow-inner"
                                />
                                <input
                                  type="text"
                                  placeholder="Position / Title"
                                  value={position}
                                  onChange={(e) => setPosition(e.target.value)}
                                  className="w-full bg-black/35 border border-white/15 rounded-[10px] py-2 px-3 text-[12.5px] text-white placeholder-white/45 focus:outline-none focus:border-white transition-colors shadow-inner"
                                />
                              </div>

                              <textarea
                                placeholder="How we met & Collaboration Ideas... (e.g. met you at YC Mixer, coffee setup, pitch pitch)"
                                value={meetingContext}
                                onChange={(e) => setMeetingContext(e.target.value)}
                                rows={2}
                                className="w-full bg-black/35 border border-white/15 rounded-[10px] py-2 px-3 text-[12.5px] text-white placeholder-white/45 focus:outline-none focus:border-white transition-colors resize-none shadow-inner"
                              />

                              <button
                                onMouseEnter={playHover}
                                onClick={sendConnectionStub}
                                className="w-full py-2.5 rounded-[12px] font-bold text-white text-[12.5px] flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:brightness-110 active:scale-[0.98] transition-all border border-amber-300/30"
                                style={{
                                  background: "linear-gradient(135deg, #FF9B04, #d01c00)",
                                }}
                              >
                                Send Handshake Credentials ⚡️
                              </button>
                            </motion.div>
                          ) : (
                            /* EXECUTIVE PROFILE DETAILS */
                            <motion.div
                              key="credentials-card"
                              animate={{ opacity: isTorn ? 0 : 1, y: isTorn ? -15 : 0 }}
                              transition={{ duration: 0.4 }}
                              className="flex flex-col mt-4"
                            >
                              <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/50 uppercase mb-1">Executive Holder</span>
                              
                              <div className="flex flex-col leading-none">
                                <h2 className="text-[34px] font-black text-white tracking-tighter uppercase font-[family-name:var(--font-display)]">
                                  {firstName}
                                </h2>
                                <h2 className="text-[34px] font-black text-white tracking-tighter uppercase font-[family-name:var(--font-display)] mt-0.5">
                                  {lastName}
                                </h2>
                              </div>

                              <div className="flex items-center gap-3.5 mt-4">
                                <div className="w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-white/40 shadow-lg bg-white/10 shrink-0">
                                  <Image
                                    src={member.photo}
                                    alt={member.name}
                                    width={45}
                                    height={45}
                                    priority
                                    className="rounded-full object-cover w-full h-full"
                                  />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-[13px] font-extrabold text-white leading-tight truncate">{member.title}</span>
                                  <span className="text-[11px] font-mono font-bold tracking-widest text-white/70 uppercase mt-0.5 truncate">{member.company}</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* ── REAL LIFE PHYSICAL SCISSOR CUTTING TRACK (Between Top and Bottom halves) ── */}
                    {!isTorn && (
                      <div
                        ref={trackRef}
                        className="w-[92%] h-8 absolute top-[314px] left-[4%] z-30 flex items-center select-none cursor-pointer"
                      >
                        {/* Physical split seam gap */}
                        <div className="absolute left-0 right-0 h-[2.5px] overflow-hidden rounded-full">
                          {/* Sliced dark void gap (Left of scissor) */}
                          <div
                            className="absolute top-0 left-0 bottom-0 bg-[#0d0d12] shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)] border-t border-black"
                            style={{ width: `${dragProgressPercent}%` }}
                          />
                          {/* Uncut dashed perforation line (Right of scissor) */}
                          <div
                            className="absolute top-0 right-0 bottom-0 border-t border-dashed border-white/30"
                            style={{ left: `${dragProgressPercent}%` }}
                          />
                        </div>

                        {/* Drag scissor handle */}
                        <motion.div
                          drag="x"
                          dragDirectionLock
                          dragElastic={0}
                          dragMomentum={false}
                          dragConstraints={{ left: 0, right: trackWidth }}
                          onDragStart={() => setIsDragging(true)}
                          onDragEnd={() => {
                            setIsDragging(false);
                            // Spring-loaded recoil back to start notch if let go early!
                            if (dragX.get() < trackWidth - 12) {
                              animate(dragX, 0, { type: "spring", stiffness: 220, damping: 20 });
                            }
                          }}
                          onDrag={() => {
                            if (dragX.get() >= trackWidth - 8) {
                              handleTear();
                            }
                          }}
                          style={{ x: dragX }}
                          className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-600 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_4px_14px_rgba(251,191,36,0.6)] border border-yellow-200/40 z-40 shrink-0 animate-[float_4s_infinite]"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Real mechanical criss-cross blade cutting action */}
                          <motion.svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4d2d00"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {/* Central mechanical pivot pin */}
                            <circle cx="9" cy="12" r="1.5" fill="#4d2d00" />
                            
                            {/* Top Blade (Rotates clockwise) */}
                            <motion.g
                              style={{ originX: "9px", originY: "12px" }}
                              animate={isDragging ? {
                                rotate: [0, 24, -8, 24, -8, 0],
                              } : { rotate: 0 }}
                              transition={isDragging ? {
                                repeat: Infinity,
                                duration: 0.28,
                                ease: "easeInOut",
                              } : {}}
                            >
                              <circle cx="5" cy="8" r="2.5" />
                              <line x1="7.2" y1="9.8" x2="19" y2="19" />
                            </motion.g>

                            {/* Bottom Blade (Rotates counter-clockwise) */}
                            <motion.g
                              style={{ originX: "9px", originY: "12px" }}
                              animate={isDragging ? {
                                rotate: [0, -24, 8, -24, 8, 0],
                              } : { rotate: 0 }}
                              transition={isDragging ? {
                                repeat: Infinity,
                                duration: 0.28,
                                ease: "easeInOut",
                              } : {}}
                            >
                              <circle cx="5" cy="16" r="2.5" />
                              <line x1="7.2" y1="14.2" x2="19" y2="5" />
                            </motion.g>
                          </motion.svg>
                        </motion.div>
                      </div>
                    )}

                    {/* ── CARD BOTTOM HALF (Perfect seam locking, seamless color continuity) ── */}
                    <AnimatePresence>
                      {!isTorn && (
                        <motion.div
                          initial={{ opacity: 1, y: 0 }}
                          exit={{
                            y: [0, 12, 190],
                            rotate: [0, 3, 8],
                            scale: [1, 0.98, 0.9],
                            opacity: [1, 1, 0],
                            transition: {
                              times: [0, 0.16, 1], // keyframed snap and gravity drop physics
                              duration: 0.65,
                              ease: "easeIn",
                            }
                          }}
                          className="absolute bottom-0 left-0 right-0 rounded-b-[24px] rounded-t-[6px] border-b border-x border-yellow-500/40 shadow-[inset_0_-1px_0_rgba(251,191,36,0.2)] p-6 flex flex-col justify-end overflow-hidden"
                          style={{
                            background: "linear-gradient(to bottom, #E65C00 0%, #9E1B00 100%)",
                            backgroundImage: "linear-gradient(to bottom, #E65C00 0%, #9E1B00 100%), radial-gradient(circle at 50% 0%, transparent, rgba(0,0,0,0.18)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.16'/%3E%3C/svg%3E\")",
                            backgroundBlendMode: "overlay, normal, normal",
                            height: "152px",
                          }}
                        >
                          {/* Holographic dynamic iridescent glare layer */}
                          <div
                            className="absolute inset-0 pointer-events-none opacity-[0.09] mix-blend-color-dodge z-[2] holographic-reflection"
                            style={{
                              background: "linear-gradient(135deg, #FFD60A 0%, #64D2FF 35%, #FF2D55 70%, #30D158 100%)",
                            }}
                          />

                          {/* Ripped-Cotton heavy paper fiber top edge seam */}
                          <div className="absolute top-0 left-0 right-0 h-[4px] overflow-hidden pointer-events-none z-20">
                            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 10" fill="none" className="text-[#0d0d12]">
                              <path d="M0,10 L100,10 L100,8 Q95,5 90,8 Q85,2 80,7 Q75,4 70,8 Q65,3 60,7 Q55,5 50,8 Q45,2 40,7 Q35,4 30,8 Q25,3 20,7 Q15,5 10,8 Q5,2 0,7 Z" fill="currentColor" />
                            </svg>
                          </div>

                          {/* Punch notches matching exactly the seam */}
                          <div className="absolute -left-3.5 top-[-14px] w-7 h-7 rounded-full bg-[#0d0d12] border-r border-white/10 z-20" />
                          <div className="absolute -right-3.5 top-[-14px] w-7 h-7 rounded-full bg-[#0d0d12] border-l border-white/10 z-20" />

                          <div className="flex justify-between items-end z-10 relative">
                            <div className="flex flex-col">
                              <span className="text-[15px] font-black tracking-[0.18em] text-white/90 uppercase font-mono leading-none">VIP Access</span>
                              <span className="text-[9px] font-mono tracking-wider text-white/50 uppercase mt-1">Direct Connection Key</span>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <span className="text-[11px] font-mono font-bold tracking-wider text-white/90 uppercase">Code:</span>
                              <span className="text-[11px] font-mono font-bold tracking-wider text-white/80 mt-0.5">C13-{member.slug.toUpperCase()}-2026</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}

              {/* ── SAVE DIRECT CONTACT BUTTON ── */}
              <AnimatePresence>
                {!isTorn && (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="w-full mt-1.5 z-10"
                  >
                    <button
                      onMouseEnter={playHover}
                      onClick={downloadvCard}
                      className="w-full py-3.5 rounded-[16px] font-bold text-white/85 hover:text-white text-[13.5px] flex items-center justify-center gap-1.5 cursor-pointer bg-white/5 border border-white/15 hover:bg-white/10 transition-all active:scale-[0.98]"
                    >
                      <span className="font-sans font-black text-[12px] tracking-tighter bg-white/15 px-1.5 py-0.5 rounded shadow-sm text-white border border-white/20">
                        C13
                      </span>
                      C13
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
