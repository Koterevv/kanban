import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="py-3">
      <nav className="flex justify-between text-xl uppercase container">
        <Link href={"/"}>LOGO</Link>
        <Link href={"/"}>user</Link>
      </nav>
    </header>
  );
}
