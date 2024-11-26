import {
  SITE_NAME,
  SOCIAL_GITCOIN,
  SOCIAL_GITHUB,
  SOCIAL_GIVETH,
  SOCIAL_X,
} from "@/utils/site";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <img
              src="/logo-dark.svg"
              alt={SITE_NAME}
              className="h-[32px] w-[32px] mr-2"
            />
            {SITE_NAME}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href={`https://github.com/${SOCIAL_GITHUB}`}
              className="opacity-60 hover:opacity-100"
            >
              Github
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href={`https://x.com/${SOCIAL_X}`}
              className="opacity-60 hover:opacity-100"
            >
              𝕏
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Support Us</h3>
          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href={`https://giveth.io/project/${SOCIAL_GIVETH}`}
              className="opacity-60 hover:opacity-100"
            >
              Giveth
            </a>
          </div>
          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href={`https://explorer.gitcoin.co/#/projects/${SOCIAL_GITCOIN}`}
              className="opacity-60 hover:opacity-100"
            >
              Gitcoin
            </a>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; {new Date().getFullYear()}{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://blossom.software"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Blossom Labs.
          </a>{" "}
          Licensed under AGPL-3.0. Open source contributions are welcomed!
        </h3>
      </section>
    </footer>
  );
};
