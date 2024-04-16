import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { logout } from "@/app/(auth)/actions";

export default async function Page() {
  const { user } = await validateRequest();

  return (
    <div className="">
      <h1>Hi, {JSON.stringify(user)}!</h1>
      <form action={logout}>
        <button>Sign out</button>
      </form>
    </div>
  );
}
