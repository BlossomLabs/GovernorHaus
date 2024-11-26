import { About } from "@/components/landing/About";
import { Cta } from "@/components/landing/Cta";
import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { Sponsors } from "@/components/landing/Sponsors";
import type { MetaFunction } from "@remix-run/node";
import { Button } from "@repo/ui/components/ui/button";
import { useNavigate } from "react-router-dom";

export const meta: MetaFunction = () => {
  return [
    { title: "GovernorHaus" },
    { name: "description", content: "Welcome to the future of work" },
  ];
};

export default function Home() {
  const navigate = useNavigate();
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
