export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <p className="text-[13px] font-semibold text-[#86868B] mb-3 px-1 uppercase tracking-[0.02em]">
        {title}
      </p>
      <div className="rounded-[14px] overflow-hidden bg-[#1C1C1E] divide-y divide-white/[0.06]">
        {children}
      </div>
    </section>
  );
}
