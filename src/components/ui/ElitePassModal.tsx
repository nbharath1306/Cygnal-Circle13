"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import { playTap } from "@/lib/sound";
import type { TeamMember } from "@/data/types";
import Image from "next/image";

export function ElitePassModal({ member }: { member: TeamMember }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTorn, setIsTorn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorContact, setVisitorContact] = useState("");
  const [visitorContext, setVisitorContext] = useState("⚡️ Met Just Now");
  const cardRef = useRef<HTMLDivElement>(null);

  // Initialize Tilt on Modal Card (only if not torn to allow stable form inputs)
  useEffect(() => {
    const cardEl = cardRef.current;
    if (isOpen && cardEl && !isTorn) {
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
  }, [isOpen, isTorn]);

  const toggleModal = () => {
    playTap();
    if (isOpen) {
      setIsTorn(false);
      setShowForm(false);
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
    }, 450); // Delay matches framer-motion exit duration
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
      {/* Floating Action Button (FAB) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 260, damping: 20 }}
        onClick={toggleModal}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_6px_20px_rgba(10,132,255,0.3)] border border-white/20 active:scale-95 transition-transform group"
        style={{
          background: "linear-gradient(135deg, rgba(10, 132, 255, 0.8), rgba(64, 156, 255, 0.8))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        aria-label="Open Elite Pass"
      >
        {/* Sleek executive hover label */}
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
              className="relative max-w-[380px] w-full flex flex-col items-center gap-5"
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

              {/* Double-stack name parts for YC-styled typography */}
              {(() => {
                const nameParts = member.name.split(" ");
                const firstName = nameParts[0] || "";
                const lastName = nameParts.slice(1).join(" ") || "";

                return (
                  <div
                    ref={cardRef}
                    className="w-full h-[480px] rounded-[24px] relative overflow-hidden shadow-[0_25px_60px_rgba(230,92,0,0.35)] border border-amber-300/30 p-6 flex flex-col justify-between"
                    style={{
                      background: "linear-gradient(135deg, #FF9B04 0%, #E65C00 60%, #9E1B00 100%)",
                      backgroundImage: "linear-gradient(135deg, #FF9B04 0%, #E65C00 60%, #9E1B00 100%), radial-gradient(circle at 50% 50%, transparent, rgba(0,0,0,0.25)), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.16'/%3E%3C/svg%3E\")",
                      backgroundBlendMode: "overlay, normal, normal",
                    }}
                  >
                    {/* Holographic light reflect overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        background: "linear-gradient(125deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.3) 100%)",
                      }}
                    />

                    {/* Left/Right physical ticket punch holes */}
                    <div className="absolute -left-3.5 top-[71.5%] w-7 h-7 rounded-full bg-[#0d0d12] border-r border-white/10 z-20" />
                    <div className="absolute -right-3.5 top-[71.5%] w-7 h-7 rounded-full bg-[#0d0d12] border-l border-white/10 z-20" />

                    {/* Dotted Perforation Line (only displays if not torn) */}
                    <AnimatePresence>
                      {!isTorn && (
                        <motion.div
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-4 right-4 top-[74.5%] z-10 border-t-2 border-dashed border-white/30"
                        />
                      )}
                    </AnimatePresence>

                    {/* ── TOP SECTION ── */}
                    <div className="flex justify-between items-start z-10 relative">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/70 uppercase">Circle13 Presents</span>
                        <span className="text-[15px] font-black tracking-[0.1em] text-white uppercase mt-0.5">Executive Pass</span>
                      </div>
                      
                      {/* Premium Golden Foil Shark Seal */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-600 border border-yellow-200/50 flex items-center justify-center shadow-[0_4px_16px_rgba(251,191,36,0.4)] relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full animate-[shine_4s_infinite]" />
                        <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#4d2d00] drop-shadow-md" fill="currentColor">
                          <path d="M21.9,11.6c-0.2-0.2-0.6-0.3-0.9-0.1c-1.3,0.8-2.9,1.1-4.4,0.9c-0.7-0.1-1.3-0.3-2-0.6c-0.5-0.2-0.9-0.5-1.4-0.8c-1.2-0.8-2.5-1.2-3.9-1.2c-1.5,0-2.9,0.5-4,1.4c-0.3,0.3-0.3,0.8,0,1.1s0.8,0.3,1.1,0c0.8-0.7,1.8-1.1,2.9-1.1c1,0,2,0.3,2.9,0.9c0.5,0.3,1,0.6,1.5,0.8c0.7,0.3,1.5,0.6,2.3,0.7c1.7,0.2,3.5-0.1,5-1C22.2,12.4,22.1,11.9,21.9,11.6z M12.8,4.5c-0.4-0.3-0.9-0.2-1.2,0.2c-0.8,1.2-1.2,2.6-1.2,4.1c0,0.5,0.4,0.9,0.9,0.9s0.9-0.4,0.9-0.9c0-1.1,0.3-2.1,0.8-3C13.2,5.3,13.1,4.8,12.8,4.5z" />
                        </svg>
                      </div>
                    </div>

                    {/* ── MIDDLE SECTION — YC-STYLE DETAILS / INLINE GUEST LEAD FORM ── */}
                    <div className="flex flex-col z-10 relative flex-1 justify-center">
                      <AnimatePresence mode="wait">
                        {showForm ? (
                          /* VIP CONNECTION FORM (Fades in post-tear) */
                          <motion.div
                            key="connection-form"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-3.5 w-full mt-2"
                          >
                            <div className="flex flex-col">
                              <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-yellow-200/90 uppercase">Submit Connection Stub</span>
                              <span className="text-[10px] text-white/70 leading-tight mt-0.5">Claim the other half of the pass to connect with {member.name}</span>
                            </div>

                            {/* Visitor Name Input */}
                            <div className="flex flex-col">
                              <input
                                type="text"
                                placeholder="Your Name"
                                value={visitorName}
                                onChange={(e) => setVisitorName(e.target.value)}
                                className="w-full bg-black/30 border border-white/15 rounded-[10px] py-2.5 px-3.5 text-[13px] text-white placeholder-white/45 focus:outline-none focus:border-white transition-colors shadow-inner"
                              />
                            </div>

                            {/* Visitor Contact Input */}
                            <div className="flex flex-col">
                              <input
                                type="text"
                                placeholder="LinkedIn profile or Email"
                                value={visitorContact}
                                onChange={(e) => setVisitorContact(e.target.value)}
                                className="w-full bg-black/30 border border-white/15 rounded-[10px] py-2.5 px-3.5 text-[13px] text-white placeholder-white/45 focus:outline-none focus:border-white transition-colors shadow-inner"
                              />
                            </div>

                            {/* Meeting Context Selector */}
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[9px] font-mono font-bold tracking-[0.1em] text-white/40 uppercase">Meeting context:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {["⚡️ Met Just Now", "💼 Coffee/Pitch", "🚀 Collaboration"].map((tag) => (
                                  <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setVisitorContext(tag)}
                                    className={`text-[9.5px] font-bold py-1 px-3 rounded-full border transition-all cursor-pointer ${
                                      visitorContext === tag
                                        ? "bg-white text-[#d01c00] border-white shadow-sm"
                                        : "bg-black/25 text-white/60 border-white/10 hover:border-white/30"
                                    }`}
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Action Button inside Form */}
                            <button
                              onClick={sendConnectionStub}
                              className="w-full py-3 rounded-[12px] font-bold text-white text-[13px] flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:brightness-110 active:scale-[0.98] transition-all border border-amber-300/30"
                              style={{
                                background: "linear-gradient(135deg, #FF9B04, #d01c00)",
                              }}
                            >
                              Send VIP Connection Stub ⚡️
                            </button>
                          </motion.div>
                        ) : (
                          /* STANDARD EXECUTIVE CREDENTIALS CARD FRONT (Fades out when torn) */
                          <motion.div
                            key="credentials-card"
                            animate={{ opacity: isTorn ? 0 : 1, y: isTorn ? -20 : 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col mt-4"
                          >
                            <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/50 uppercase mb-1">Executive Holder</span>
                            
                            <div className="flex flex-col leading-none">
                              <h2 className="text-[34px] font-black text-white tracking-tighter uppercase font-[family-name:var(--font-display)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                                {firstName}
                              </h2>
                              <h2 className="text-[34px] font-black text-white tracking-tighter uppercase font-[family-name:var(--font-display)] mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                                {lastName}
                              </h2>
                            </div>

                            {/* Golden border stamped circular photo + details */}
                            <div className="flex items-center gap-3.5 mt-5">
                              <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-white/40 shadow-lg bg-white/10 shrink-0">
                                <Image
                                  src={member.photo}
                                  alt={member.name}
                                  width={50}
                                  height={50}
                                  priority
                                  className="rounded-full object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-[14px] font-extrabold text-white leading-tight truncate">{member.title}</span>
                                <span className="text-[12px] font-mono font-bold tracking-widest text-white/70 uppercase mt-0.5 truncate">{member.company}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ── BOTTOM STUB SECTION (Tears away dynamically on click) ── */}
                    <AnimatePresence>
                      {!isTorn && (
                        <motion.div
                          initial={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 120, rotate: 4, scale: 0.95 }}
                          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                          className="flex justify-between items-end z-10 relative pt-2 border-t border-dashed border-white/30"
                        >
                          <div className="flex flex-col">
                            <span className="text-[15px] font-black tracking-[0.18em] text-white/90 uppercase font-mono leading-none">VIP Access</span>
                            <span className="text-[9px] font-mono tracking-wider text-white/50 uppercase mt-1">Direct Connection Key</span>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <span className="text-[11px] font-mono font-bold tracking-wider text-white/90 uppercase">Code:</span>
                            <span className="text-[11px] font-mono font-bold tracking-wider text-white/80 mt-0.5">C13-{member.slug.toUpperCase()}-2026</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}

              {/* ── BOTTOM MODAL ACTION BUTTONS (Hidden when card is torn to focus on Lead Form) ── */}
              <AnimatePresence>
                {!isTorn && (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="w-full flex flex-col gap-2.5 z-10 mt-1"
                  >
                    {/* Tear & Claim VIP Connection Stub Button (Lead Gen CTA) */}
                    <button
                      onClick={handleTear}
                      className="w-full py-4 rounded-[16px] font-bold text-white text-[14px] flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_6px_22px_rgba(230,92,0,0.3)] hover:brightness-110 active:scale-[0.98] transition-all border border-amber-400/25 relative overflow-hidden group"
                      style={{
                        background: "linear-gradient(135deg, #FF9B04, #E65C00)",
                      }}
                    >
                      <span className="absolute inset-0 bg-white/10 skew-x-12 -translate-x-full group-hover:animate-[shine_2s_infinite]" />
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" />
                        <path d="M12 11V13" />
                      </svg>
                      Tear & Claim VIP Stub
                    </button>

                    {/* Download vCard Button (Direct Phonebook Save) */}
                    <button
                      onClick={downloadvCard}
                      className="w-full py-3.5 rounded-[16px] font-bold text-white/80 hover:text-white text-[13.5px] flex items-center justify-center gap-1.5 cursor-pointer bg-white/5 border border-white/15 hover:bg-white/10 transition-all active:scale-[0.98]"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2-2H5a2 2 0 0 1-2-2v-4" />
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
