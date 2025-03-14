import React from "react";
import { ModeToggle } from "../theme/theme-mod-toggle";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import AuthButton from "../shared/auth-button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 py-2 border-b border-accent gap-2">
      <p>Next-Auth</p>
      <div className="flex-1"></div>
      <AuthButton />
      <ModeToggle />
    </header>
  );
}
