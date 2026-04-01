export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <div className="flex items-center gap-5 mb-6">
        <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-white/[0.06]" />
        <h2 className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium whitespace-nowrap">
          {title}
        </h2>
        <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-white/[0.06]" />
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  );
}
