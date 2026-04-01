export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-[22px]">
      {/* Apple grouped list header: 13px, uppercase, secondary label, padded left by 16px */}
      <p
        className="text-[13px] font-normal text-[#86868B] mb-[8px] pl-[16px] uppercase"
        style={{ letterSpacing: "-0.08px" }}
      >
        {title}
      </p>
      <div className="material-group rounded-[18px]">
        {children}
      </div>
    </section>
  );
}
