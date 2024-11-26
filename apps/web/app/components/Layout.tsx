import React, { type PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout(props: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}
