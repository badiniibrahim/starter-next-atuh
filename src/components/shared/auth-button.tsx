import { auth } from "@/lib/auth-helper";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "@/lib/auth";

export default async function AuthButton() {
  const user = await auth();
  if (!user) {
    return (
      <Link className={buttonVariants({ variant: "outline" })} href="/signin">
        Sign In
      </Link>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{user?.email ?? user?.name}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <form>
            <button
              formAction={async () => {
                "use server";
                await signOut();
              }}
            >
              Sign out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
