import { useNavigate } from "@remix-run/react";
import { Button } from "@repo/ui/components/ui/button";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-4xl sm:text-5xl md:text-6xl font-bold">
          <h1>Launch Your DAO</h1> in Minutes{" "}
          <h2 className="inline">
            with{" "}
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              GovernorHaus
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          GovernorHaus simplifies DAO creation with OpenZeppelin Governor
          contracts. No coding needed—just connect your wallet, fill in the
          details, and deploy your DAO directly on Tally.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button
            className="w-full md:w-auto px-12 py-6 text-lg"
            onClick={() => navigate("/launch")}
          >
            Create Your DAO Now
          </Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <img src="/images/tally-ens.png" alt="tally" />
      </div>

      {/* Shadow effect */}
      <div className="hero-shadow" />
    </section>
  );
};
