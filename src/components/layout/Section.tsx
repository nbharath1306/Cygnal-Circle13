export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <p className="text-[12px] font-medium text-white/35 mb-3 px-1 uppercase tracking-[0.06em]">
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}
