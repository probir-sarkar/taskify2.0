import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { logout } from "@/app/(auth)/actions";
import KanbanBoard from "@/components/dnd/KanbanBoard";

export default async function Page() {
  const { user } = await validateRequest();

  return (
    <div className="min-h-screen">
      <KanbanBoard />
    </div>
  );
}
