export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent" />
        <h2 className="text-[9px] uppercase tracking-[0.35em] text-text-secondary/60 font-semibold whitespace-nowrap">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-500/8 to-transparent" />
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  );
}
