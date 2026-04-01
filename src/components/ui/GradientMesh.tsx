"use client";

/**
 * Animated gradient mesh background.
 * Liquid Glass NEEDS a colorful background to refract —
 * a solid black background defeats the entire purpose.
 */
export function GradientMesh() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a12]">
      {/* Slow-moving color orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#1a1040] blur-[120px] top-[-10%] left-[-15%] animate-[drift1_20s_ease-in-out_infinite]" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#0c2340] blur-[120px] top-[20%] right-[-10%] animate-[drift2_25s_ease-in-out_infinite]" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#2a0c3a] blur-[100px] bottom-[10%] left-[20%] animate-[drift3_22s_ease-in-out_infinite]" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#0a2030] blur-[100px] bottom-[-5%] right-[15%] animate-[drift4_18s_ease-in-out_infinite]" />

      {/* Subtle grain on top */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />
    </div>
  );
}
