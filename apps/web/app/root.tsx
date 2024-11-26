import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { ToastProvider } from "@repo/ui/components/ui/toast";
import { Toaster } from "@repo/ui/components/ui/toaster";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { Layout } from "./components/Layout";
import { Web3Provider } from "./context/Web3Provider";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_X } from "@/utils/site";

import rainbowkitStyles from "@rainbow-me/rainbowkit/styles.css?url";
import globalsStyles from "@repo/ui/globals.css?url";
import indexStyles from "./index.css?url";

export function links() {
  return [
    {
      rel: "icon",
      href: "/images/favicon-96x96.png",
      type: "image/png",
      sizes: "96x96",
    },
    {
      rel: "icon",
      href: "/images/favicon.svg",
      type: "image/svg+xml",
    },
    { rel: "shortcut icon", href: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/images/apple-touch-icon.png",
    },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "stylesheet", href: globalsStyles },
    { rel: "stylesheet", href: rainbowkitStyles },
    { rel: "stylesheet", href: indexStyles },
  ];
}

export const meta: MetaFunction = () => [
  { title: SITE_NAME },
  { name: "description", content: SITE_DESCRIPTION },
  { name: "image", content: `${SITE_URL}/opengraph-image.webp` },
  { name: "og:image", content: `${SITE_URL}/opengraph-image.webp` },
  { name: "og:title", content: SITE_NAME },
  { name: "og:description", content: SITE_DESCRIPTION },
  { name: "og:url", content: SITE_URL },
  { name: "og:type", content: "website" },
  { name: "og:site_name", content: SITE_NAME },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:image", content: `${SITE_URL}/opengraph-image.webp` },
  { name: "twitter:title", content: SITE_NAME },
  { name: "twitter:description", content: SITE_DESCRIPTION },
  { name: "twitter:site", content: SOCIAL_X },
  { name: "twitter:creator", content: SOCIAL_X },
];

export function HydrateFallback() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-background">
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Web3Provider>
          <ToastProvider>
            <TooltipProvider>
              <Layout>
                <Outlet />
              </Layout>
            </TooltipProvider>
            <Toaster />
          </ToastProvider>
        </Web3Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
