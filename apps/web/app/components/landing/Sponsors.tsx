interface SponsorProps {
  logo: JSX.Element;
  href: string;
}

const sponsors: SponsorProps[] = [
  {
    logo: (
      <img
        src="/images/blossom-logo.svg"
        alt="Blossom Labs"
        className="h-[40px]"
      />
    ),
    href: "https://blossom.software",
  },
];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="container pt-24 sm:py-32">
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Built by
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {sponsors.map(({ logo, href }: SponsorProps) => (
          <div
            key={href}
            className="flex items-center gap-1 text-muted-foreground/60"
          >
            <a href={href} target="_blank" rel="noreferrer">
              {logo}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};