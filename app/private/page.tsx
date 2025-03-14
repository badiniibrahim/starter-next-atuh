import { authRequired } from "@/lib/auth-helper";
import React from "react";

export default async function page() {
  await authRequired();
  return <div>page</div>;
}
