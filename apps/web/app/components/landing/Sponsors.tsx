import { Sponsors as SponsorsUI } from "@repo/ui/components/landing/Sponsors";

const sponsors = [
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
  return <SponsorsUI text="Built by" sponsors={sponsors} />;
};
