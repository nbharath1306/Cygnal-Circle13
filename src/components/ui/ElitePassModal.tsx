"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import { playTap } from "@/lib/sound";
import type { TeamMember } from "@/data/types";
import Image from "next/image";

export function ElitePassModal({ member }: { member: TeamMember }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTorn, setIsTorn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorContact, setVisitorContact] = useState("");
  const [visitorContext, setVisitorContext] = useState("⚡️ Met Just Now");
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Scissor track tracking
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(296); // default fallback
  const dragX = useMotionValue(0);
  const [dragProgressPercent, setDragProgressPercent] = useState(0);

  // Monitor dragX to update visual cut progress percentage
  useEffect(() => {
    const unsubscribe = dragX.on("change", (latest) => {
      if (trackWidth > 0) {
        setDragProgressPercent((latest / trackWidth) * 100);
      }
    });
    return () => unsubscribe();
  }, [dragX, trackWidth]);

  // Track container width dynamically on open
  useEffect(() => {
    if (isOpen && trackRef.current) {
      // Container is roughly 332px inside modal padding, handle is 36px wide
      setTrackWidth(trackRef.current.offsetWidth - 36);
    }
  }, [isOpen]);

  // Initialize Tilt on Modal Card (only if not torn to allow stable dragging/inputs)
  useEffect(() => {
    const cardEl = cardRef.current;
    if (isOpen && cardEl && !isTorn) {
      VanillaTilt.init(cardEl, {
        max: 12,
        speed: 600,
        scale: 1.02,
        perspective: 1000,
        glare: true,
        "max-glare": 0.3,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
      });
    }
    return () => {
      const el = cardEl as HTMLElement & { vanillaTilt?: { destroy: () => void } } | null;
      el?.vanillaTilt?.destroy();
    };
  }, [isOpen, isTorn]);

  // Reset modal state when closed
  const toggleModal = () => {
    playTap();
    if (isOpen) {
      setIsTorn(false);
      setShowForm(false);
      dragX.set(0);
      setDragProgressPercent(0);
      setVisitorName("");
      setVisitorContact("");
      setVisitorContext("⚡️ Met Just Now");
    }
    setIsOpen(!isOpen);
  };

  // Perform tear-off animation transition
  const handleTear = () => {
    playTap();
    setIsTorn(true);
    setTimeout(() => {
      setShowForm(true);
    }, 500); // Delay matches framer-motion exit duration
  };

  // Compile lead inputs and redirect directly to WhatsApp or Email
  const sendConnectionStub = () => {
    playTap();
    if (!visitorName.trim()) {
      alert("Please enter your name to claim the pass!");
      return;
    }

    const whatsappLink = member.socials.find((s) => s.platform === "WhatsApp")?.url || "";
    const email = member.socials.find((s) => s.platform === "Email")?.url || "";

    const messageText = `Hey ${member.name}! Met you just now and claimed your Circle13 Executive Pass. Let's connect! ⚡️\n\n👤 Name: ${visitorName}\n🔗 LinkedIn/Email: ${visitorContact || "Not provided"}\n📍 Context: ${visitorContext}`;

    if (whatsappLink) {
      const cleanWaUrl = whatsappLink.split("?")[0];
      const waRedirectUrl = `${cleanWaUrl}?text=${encodeURIComponent(messageText)}`;
      window.open(waRedirectUrl, "_blank");
    } else if (email) {
      const mailtoUrl = `mailto:${email.replace("mailto:", "")}?subject=Circle13 Connection Stub Claimed&body=${encodeURIComponent(messageText)}`;
      window.open(mailtoUrl, "_blank");
    } else {
      alert("Direct direct connection methods are not configured, but your stub request was triggered!");
    }
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
      {/* Floating Action Button (FAB) - Amber Gold Theme */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 260, damping: 20 }}
        onClick={toggleModal}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_6px_22px_rgba(230,92,0,0.4)] border border-amber-400/30 active:scale-95 transition-transform group"
        style={{
          background: "linear-gradient(135deg, rgba(255, 155, 4, 0.85), rgba(230, 92, 0, 0.85))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        aria-label="Open Elite Pass"
      >
        <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-black/75 backdrop-blur-md text-white text-[11px] font-bold py-2 px-3 rounded-xl border border-white/10 shadow-lg pointer-events-none whitespace-nowrap tracking-wider uppercase">
          Save Contact
        </span>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="10" cy="11" r="2.5" />
          <path d="M6 17c0-2 2-3 4-3s4 1 4 3" />
          <line x1="17" y1="10" x2="17" y2="14" />
          <line x1="15" y1="12" x2="19" y2="12" />
        </svg>
      </motion.button>

      {/* Fullscreen Overlay & Modal */}
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
                onClick={toggleModal}
                className="absolute -top-12 right-2 text-white/50 hover:text-white cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Double-stack name split logic */}
              {(() => {
                const nameParts = member.name.split(" ");
                const firstName = nameParts[0] || "";
                const lastName = nameParts.slice(1).join(" ") || "";

                return (
                  <div className="w-full flex flex-col items-center relative select-none">
                    
                    {/* ── CARD TOP HALF (Unified Gradient, dynamically expands post-cut) ── */}
                    <motion.div
                      ref={cardRef}
                      className="w-full rounded-t-[24px] rounded-b-[8px] relative overflow-hidden shadow-[0_20px_50px_rgba(230,92,0,0.25)] border-t border-x border-amber-300/30 p-6 flex flex-col justify-between"
                      style={{
                        background: "linear-gradient(135deg, #FF9B04 0%, #E65C00 100%)",
                        backgroundImage: "linear-gradient(135deg, #FF9B04 0%, #E65C00 100%), radial-gradient(circle at 50% 50%, transparent, rgba(0,0,0,0.25)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.16'/%3E%3C/svg%3E\")",
                        backgroundBlendMode: "overlay, normal, normal",
                        height: showForm ? "390px" : "330px",
                      }}
                      animate={{
                        height: showForm ? 390 : 330,
                      }}
                      transition={{ type: "spring", damping: 26, stiffness: 220 }}
                    >
                      {/* Holographic light reflect overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          background: "linear-gradient(125deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.3) 100%)",
                        }}
                      />

                      {/* Physical punch notches at bottom edge */}
                      <div className="absolute -left-3.5 bottom-[-14px] w-7 h-7 rounded-full bg-[#0d0d12] border-r border-white/10 z-20" />
                      <div className="absolute -right-3.5 bottom-[-14px] w-7 h-7 rounded-full bg-[#0d0d12] border-l border-white/10 z-20" />

                      {/* Header */}
                      <div className="flex justify-between items-start z-10 relative">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/70 uppercase">Circle13 Presents</span>
                          <span className="text-[15px] font-black tracking-[0.1em] text-white uppercase mt-0.5">Executive Pass</span>
                        </div>
                        
                        {/* Concentric Golden Stamp Engraved C13 */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-600 border border-yellow-200/50 flex items-center justify-center shadow-[0_4px_16px_rgba(251,191,36,0.4)] relative overflow-hidden shrink-0 select-none">
                          <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full animate-[shine_4s_infinite]" />
                          <div className="font-sans font-[900] text-[20px] text-[#4d2d00] tracking-tighter drop-shadow-[0_1.5px_0px_rgba(255,255,255,0.4)] select-none">
                            C13
                          </div>
                        </div>
                      </div>

                      {/* Top Half Credentials / Dynamic Guest connection Form */}
                      <div className="flex flex-col z-10 relative flex-1 justify-center">
                        <AnimatePresence mode="wait">
                          {showForm ? (
                            /* VIP CONNECTION FORM */
                            <motion.div
                              key="connection-form"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                              className="flex flex-col gap-3 w-full mt-2"
                            >
                              <div className="flex flex-col">
                                <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-yellow-200/90 uppercase">Submit Connection Stub</span>
                                <span className="text-[10px] text-white/70 leading-tight mt-0.5">Met {member.name}? Enter your contact details:</span>
                              </div>
                              
                              <input
                                type="text"
                                placeholder="Your Name"
                                value={visitorName}
                                onChange={(e) => setVisitorName(e.target.value)}
                                className="w-full bg-black/30 border border-white/15 rounded-[10px] py-2 px-3 text-[13px] text-white placeholder-white/45 focus:outline-none focus:border-white transition-colors shadow-inner"
                              />
                              
                              <input
                                type="text"
                                placeholder="LinkedIn profile or Email"
                                value={visitorContact}
                                onChange={(e) => setVisitorContact(e.target.value)}
                                className="w-full bg-black/30 border border-white/15 rounded-[10px] py-2 px-3 text-[13px] text-white placeholder-white/45 focus:outline-none focus:border-white transition-colors shadow-inner"
                              />

                              <div className="flex flex-col gap-1.5">
                                <div className="flex flex-wrap gap-1.5">
                                  {["⚡️ Met Just Now", "💼 Coffee/Pitch", "🚀 Collab"].map((tag) => (
                                    <button
                                      key={tag}
                                      type="button"
                                      onClick={() => setVisitorContext(tag)}
                                      className={`text-[9px] font-bold py-1 px-2.5 rounded-full border transition-all cursor-pointer ${
                                        visitorContext === tag
                                          ? "bg-white text-[#d01c00] border-white"
                                          : "bg-black/25 text-white/60 border-white/10 hover:border-white/30"
                                      }`}
                                    >
                                      {tag}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <button
                                onClick={sendConnectionStub}
                                className="w-full py-2.5 rounded-[12px] font-bold text-white text-[12.5px] flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:brightness-110 active:scale-[0.98] transition-all border border-amber-300/30"
                                style={{
                                  background: "linear-gradient(135deg, #FF9B04, #d01c00)",
                                }}
                              >
                                Send Connection Stub ⚡️
                              </button>
                            </motion.div>
                          ) : (
                            /* CARD DETAILS */
                            <motion.div
                              key="credentials-card"
                              animate={{ opacity: isTorn ? 0 : 1, y: isTorn ? -15 : 0 }}
                              transition={{ duration: 0.4 }}
                              className="flex flex-col"
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

                    {/* ── LIVE DIRECT-ON-CARD PERFORATION DRAG TRACK ── */}
                    {!isTorn && (
                      <div
                        ref={trackRef}
                        className="w-[92%] h-8 absolute top-[314px] left-[4%] z-30 flex items-center select-none cursor-pointer"
                      >
                        {/* Laser-Cut Perforation Line behind Scissor Handle */}
                        <div className="absolute left-0 right-0 h-[2.5px] overflow-hidden rounded-full">
                          {/* Laser glow laser-cut track (Left of scissor) */}
                          <div
                            className="absolute top-0 left-0 bottom-0 bg-[#FF9B04] shadow-[0_0_10px_#FFBB00]"
                            style={{ width: `${dragProgressPercent}%` }}
                          />
                          {/* Standard Uncut dotted perforation line (Right of scissor) */}
                          <div
                            className="absolute top-0 right-0 bottom-0 border-t-2 border-dashed border-white/30"
                            style={{ left: `${dragProgressPercent}%` }}
                          />
                        </div>

                        {/* Interactive Drag Scissor Handle */}
                        <motion.div
                          drag="x"
                          dragDirectionLock
                          dragElastic={0}
                          dragMomentum={false}
                          dragConstraints={{ left: 0, right: trackWidth }}
                          onDragStart={() => setIsDragging(true)}
                          onDragEnd={() => {
                            setIsDragging(false);
                            // If they let go before hitting 96% completion, spring-bounce back to left!
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
                          className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-600 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_4px_14px_rgba(251,191,36,0.6)] border border-yellow-200/40 z-40 shrink-0"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Golden scissor blade snip-snip drag snip animation */}
                          <motion.svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4d2d00"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            animate={isDragging ? {
                              rotate: [0, 15, -15, 0],
                            } : { rotate: 0 }}
                            transition={isDragging ? {
                              repeat: Infinity,
                              duration: 0.3,
                            } : {}}
                          >
                            <circle cx="6" cy="6" r="3" />
                            <circle cx="6" cy="18" r="3" />
                            <line x1="9.8" y1="8.2" x2="21" y2="17" />
                            <line x1="21" y1="7" x2="9.8" y2="15.8" />
                          </motion.svg>
                        </motion.div>
                      </div>
                    )}

                    {/* ── CARD BOTTOM HALF (THE STUB) ── */}
                    <AnimatePresence>
                      {!isTorn && (
                        <motion.div
                          initial={{ opacity: 1, y: 0 }}
                          exit={{
                            y: 180,
                            opacity: 0,
                            rotate: 7,
                            scale: 0.9,
                            transition: { duration: 0.55, ease: [0.36, 0.07, 0.19, 0.97] }
                          }}
                          className="w-full h-[150px] rounded-b-[24px] rounded-t-[8px] relative overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.18)] border-b border-x border-amber-300/30 p-6 flex flex-col justify-end"
                          style={{
                            background: "linear-gradient(180deg, #E65C00 0%, #9E1B00 100%)",
                            backgroundImage: "linear-gradient(180deg, #E65C00 0%, #9E1B00 100%), radial-gradient(circle at 50% 0%, transparent, rgba(0,0,0,0.25)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.16'/%3E%3C/svg%3E\")",
                            backgroundBlendMode: "overlay, normal, normal",
                            marginTop: "-2px", // dynamic overlay boundary seam
                          }}
                        >
                          {/* Notch half-punches at top edge */}
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

              {/* ── SAVE CONTACT BUTTON (Only displays when not torn) ── */}
              <AnimatePresence>
                {!isTorn && (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="w-full mt-1.5 z-10"
                  >
                    <button
                      onClick={downloadvCard}
                      className="w-full py-3.5 rounded-[16px] font-bold text-white/85 hover:text-white text-[13.5px] flex items-center justify-center gap-1.5 cursor-pointer bg-white/5 border border-white/15 hover:bg-white/10 transition-all active:scale-[0.98]"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Save Direct Contact (vCard)
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
