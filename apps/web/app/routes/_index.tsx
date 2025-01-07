import { About } from "@/components/landing/About";
import { Cta } from "@/components/landing/Cta";
import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { Sponsors } from "@/components/landing/Sponsors";
import { SITE_DESCRIPTION, SITE_NAME } from "@/utils/site";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: SITE_NAME },
    { name: "description", content: SITE_DESCRIPTION },
  ];
};

export default function Home() {
  return (
    <div>
      <Hero />
      <Sponsors />
      <About />
      <Features />
      <Cta />
      <FAQ />
      <ScrollToTop />
    </div>
  );
}
