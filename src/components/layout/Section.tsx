export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <div className="flex items-center gap-5 mb-7">
        <div className="glow-line flex-1" />
        <h2 className="text-[8px] uppercase tracking-[0.5em] text-[#D4B87A]/40 font-bold whitespace-nowrap">
          {title}
        </h2>
        <div className="glow-line flex-1" />
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
