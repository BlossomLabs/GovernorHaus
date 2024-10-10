import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Toaster } from "@repo/ui/components/ui/toaster";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { Layout } from "./components/Layout";
import { Web3Provider } from "./context/Web3Provider";

import {
  SITE_DESCRIPTION,
  SITE_EMOJI,
  SITE_NAME,
  SITE_URL,
  SOCIAL_TWITTER,
} from "@/utils/site";

import "@repo/ui/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: SITE_NAME,
    viewport: "width=device-width,initial-scale=1",
  },
  { name: "description", content: SITE_DESCRIPTION },
  { name: "image", content: SITE_EMOJI },
  { name: "og:image", content: "/opengraph-image" },
  { name: "og:title", content: SITE_NAME },
  { name: "og:description", content: SITE_DESCRIPTION },
  { name: "og:url", content: SITE_URL },
  { name: "og:type", content: "website" },
  { name: "og:site_name", content: SITE_NAME },
  { name: "og:locale", content: "en_US" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:image", content: "/opengraph-image" },
  { name: "twitter:title", content: SITE_NAME },
  { name: "twitter:description", content: SITE_DESCRIPTION },
  { name: "twitter:site", content: SOCIAL_TWITTER },
  { name: "twitter:creator", content: SOCIAL_TWITTER },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Web3Provider>
          <TooltipProvider>
            <Layout>
              <Outlet />
            </Layout>
          </TooltipProvider>
          <Toaster />
        </Web3Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
