import { unauthorized } from "next/navigation";
import { baseAuth } from "./auth";

export const auth = async () => {
  const session = await baseAuth();
  return session?.user;
};

export const authRequired = async () => {
  const user = await auth();
  if (!user) {
    unauthorized();
  }
};
