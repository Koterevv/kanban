import * as React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Navigation } from "./Aside/Navigation";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="grow flex">
        <Navigation />
        {children}
      </main>
      <Footer />
    </>
  );
};
