export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6">
      <p className="text-[9px] uppercase tracking-[0.4em] text-white/15 font-medium mb-6 text-center">
        {title}
      </p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  );
}
