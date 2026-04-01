export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-default to-transparent" />
        <h2 className="text-[11px] uppercase tracking-[0.15em] text-text-accent font-medium">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-default to-transparent" />
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
