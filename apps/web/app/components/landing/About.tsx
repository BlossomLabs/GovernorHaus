export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  How{" "}
                </span>
                it works
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                GovernorHaus leverages OpenZeppelin's battle-tested contracts to
                provide secure, scalable DAO deployment. Unlike other methods
                that require command-line interactions, our platform puts you in
                control—directly from your browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
