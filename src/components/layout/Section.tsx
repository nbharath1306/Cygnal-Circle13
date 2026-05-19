export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Grouped section header — 13px, bold, uppercase, text-white/85, left padded */}
      <p
        className="text-[13px] font-bold uppercase mb-2 px-5 tracking-[0.06em] text-white/85"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
      >
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}
