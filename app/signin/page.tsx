import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/lib/auth";
import { AuthError } from "next-auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth-helper";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const user = await auth();
  if (user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", formData);
          } catch (error) {
            if (error instanceof AuthError) {
              // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        <Label htmlFor="email">
          Email
          <Input name="email" id="email" />
        </Label>
      </form>
      {Object.values(providerMap).map((provider) => (
        <form
          className="flex justify-center flex-row w-full"
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "",
              });
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }

              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error;
            }
          }}
        >
          <Button type="submit">
            <span>Sign in with {provider.name}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
