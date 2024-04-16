import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
}
