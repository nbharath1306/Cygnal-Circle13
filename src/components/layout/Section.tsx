export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="text-[12px] font-medium text-white/30 mb-3 px-1 uppercase tracking-[0.08em]">
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}
