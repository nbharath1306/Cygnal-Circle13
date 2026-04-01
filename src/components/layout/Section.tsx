export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <p className="text-[13px] font-semibold text-white/40 mb-2 px-2 uppercase tracking-[0.02em]">
        {title}
      </p>
      <div className="glass-group">
        {children}
      </div>
    </section>
  );
}
