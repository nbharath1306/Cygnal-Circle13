"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ActiveRadarStats() {
  const [agents, setAgents] = useState(24195);
  const [cpuLoad, setCpuLoad] = useState(14.8);

  useEffect(() => {
    // Increment agents rolling counter smoothly to simulate active server loads
    const agentInterval = setInterval(() => {
      setAgents((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2800);

    // Dynamic minor fluctuation in mock CPU/simulation load
    const cpuInterval = setInterval(() => {
      setCpuLoad((prev) => {
        const delta = (Math.random() * 2 - 1) * 0.4;
        const newLoad = prev + delta;
        return parseFloat(Math.min(Math.max(12.0, newLoad), 18.5).toFixed(1));
      });
    }, 3500);

    return () => {
      clearInterval(agentInterval);
      clearInterval(cpuInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.6 }}
      className="w-full mt-6 rounded-[24px] overflow-hidden relative border border-white/10 p-5 flex flex-col gap-4"
      style={{
        background: "rgba(120, 120, 128, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Dynamic scan line effect inside card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px]">
        <div className="w-full h-[150px] bg-gradient-to-b from-[#0A84FF]/5 to-transparent absolute top-0 left-0 -translate-y-full animate-[scan_6s_linear_infinite]" />
      </div>

      {/* Header with pulsating green dot */}
      <div className="flex items-center justify-between w-full relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30D158] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30D158]"></span>
          </span>
          <span className="text-[11px] font-bold tracking-[0.15em] text-[#30D158] uppercase">
            Ventures Operational Radar
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/40 tracking-wider">SECURE LINK</span>
      </div>

      {/* Grid of Real-Time stats */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        {/* HallowTwin Simulated Agents Ticker */}
        <div className="rounded-[16px] bg-white/[0.03] border border-white/5 p-3.5 flex flex-col gap-1.5 shadow-sm">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">HallowTwin Agents</span>
          <span className="text-[20px] font-mono font-black text-white tracking-tight animate-pulse">
            {agents.toLocaleString()}
          </span>
          <span className="text-[9px] font-medium text-white/50 leading-tight">
            Active synthetic consumer agents simulated
          </span>
        </div>

        {/* Build Labs Simulation Compute load */}
        <div className="rounded-[16px] bg-white/[0.03] border border-white/5 p-3.5 flex flex-col gap-1.5 shadow-sm">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Build Labs Load</span>
          <span className="text-[20px] font-mono font-black text-[#0A84FF] tracking-tight">
            {cpuLoad}% <span className="text-[11px] font-bold text-white/30 uppercase font-sans">LOAD</span>
          </span>
          <span className="text-[9px] font-medium text-white/50 leading-tight">
            4 active compile pods on standby status
          </span>
        </div>
      </div>

      {/* Radar sweep footer banner */}
      <div className="flex items-center justify-between text-[11px] font-mono text-white/60 pt-2 border-t border-white/5 relative z-10 select-none">
        <span>MATRIX: ONLINE</span>
        <span className="text-[#0A84FF]">PING: 14MS</span>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </motion.div>
  );
}
