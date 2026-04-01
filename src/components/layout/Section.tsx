export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      <p className="text-[12px] text-[#86868B] font-medium mb-5 px-1">
        {title}
      </p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  );
}
