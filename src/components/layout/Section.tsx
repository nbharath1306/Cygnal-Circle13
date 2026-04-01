export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <div className="flex items-center gap-4 mb-7">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#BFA97A]/8" />
        <h2 className="text-[8px] uppercase tracking-[0.45em] text-[#BFA97A]/35 font-bold whitespace-nowrap">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#BFA97A]/8" />
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  );
}
