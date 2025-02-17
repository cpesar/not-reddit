import { Button } from "@heroui/react";
// import signIn from "@/lib/actions/sign-in.action";
import { signIn } from "@/lib/actions/sign-in.action";
import { signOut } from "@/lib/actions/sign-out.action";
import { auth } from "@/auth";
import Profile from "@/components/ui/profile";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <form action={signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {session?.user ? (
        <div>{JSON.stringify(session.user)}</div>
      ) : (
        <div>Signed Out</div>
      )}
      <Profile />
    </div>
  );
}
