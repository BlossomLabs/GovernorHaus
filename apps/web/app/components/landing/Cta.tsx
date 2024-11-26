import { Button } from "@repo/ui/components/ui/button";

export const Cta = () => {
  return (
    <section id="cta" className="bg-muted/50 py-16 my-24 sm:my-32">
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Support Our
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Open Source{" "}
            </span>
            Work
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            GovernorHaus is an open-source project and a public good. If you
            believe in our mission to make DAO creation accessible to everyone,
            consider supporting us. Your donations help us continue developing,
            maintaining, and improving the platform for the community.
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button
            className="w-full md:mr-4 md:w-auto px-10 py-3 text-lg"
            onClick={() =>
              window.open("https://giveth.io/project/governor-haus", "_blank")
            }
          >
            Donate on Giveth
          </Button>
          <Button
            className="w-full md:w-auto px-10 py-3 text-lg"
            onClick={() =>
              window.open(
                "https://explorer.gitcoin.co/#/projects/0xeec99a85aa2aa2d763ba15567ddbaa91e2a34952249eb2d4077f1e61e611cbcb",
                "_blank",
              )
            }
          >
            Donate on Gitcoin
          </Button>
        </div>
      </div>
    </section>
  );
};
