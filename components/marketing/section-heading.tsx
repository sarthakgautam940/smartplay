export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="max-w-2xl">
      <div className="public-kicker">
        {eyebrow}
      </div>
      <h2
        className={
          tone === "dark"
            ? "mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl"
            : "mt-4 font-display text-4xl font-semibold leading-tight text-[#07110d] sm:text-5xl"
        }
      >
        {title}
      </h2>
      <p
        className={
          tone === "dark"
            ? "mt-5 text-lg leading-8 text-white/64"
            : "mt-5 text-lg leading-8 text-[#405047]"
        }
      >
        {description}
      </p>
    </div>
  );
}
