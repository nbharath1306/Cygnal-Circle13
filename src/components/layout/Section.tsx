export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5">
      {/* Apple grouped list header — 13px semibold, uppercased, secondary color, left-padded */}
      <p
        className="text-[13px] font-normal text-white/40 mb-[7px] px-4 uppercase"
        style={{ letterSpacing: "-0.08px" }}
      >
        {title}
      </p>
      <div className="material-group">
        {children}
      </div>
    </section>
  );
}
