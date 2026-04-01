export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <div className="flex items-center gap-4 mb-5">
        <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-text-accent font-bold whitespace-nowrap">
          {title}
        </h2>
        <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
