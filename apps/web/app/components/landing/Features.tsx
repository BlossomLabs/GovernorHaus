import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    title: "User-Friendly DAO Setup",
    description:
      "GovernorHaus guides you through every step, from naming your DAO to setting voting parameters, with a clean and simple interface. No technical skills needed.",
  },
  {
    title: "Bulk Import Addresses",
    description:
      "Easily paste token holder addresses and allocations from a CSV, Excel, or Google Sheets to streamline the setup process.",
  },
  {
    title: "Seamless Tally Integration",
    description:
      "Your newly created DAO is automatically integrated with Tally.xyz, making governance participation and management effortless.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Key Features and{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Benefits
        </span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
