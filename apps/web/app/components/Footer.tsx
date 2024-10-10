import {
  SITE_EMOJI,
  SITE_INFO,
  SOCIAL_GITHUB,
  SOCIAL_TWITTER,
} from "@/utils/site";
import React from "react";

export function Footer() {
  const links = [
    { href: `https://github.com/${SOCIAL_GITHUB}`, label: "GitHub" },
    { href: `https://twitter.com/${SOCIAL_TWITTER}`, label: "Twitter" },
  ];
  return (
    <>
      <footer className="sticky top-[100vh] footer flex justify-between items-center bg-neutral text-neutral-content p-4">
        <p>
          {SITE_EMOJI} {SITE_INFO}
        </p>
        <div className="flex gap-4">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
