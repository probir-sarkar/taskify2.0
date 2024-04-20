import { useKanbanStore } from "./kanban.store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ taskId, status }: { taskId: number; status: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { task } = useKanbanStore();
  const listTask = task.find((t) => t.name === status)?.task ?? [];
  const t = listTask.find((t) => t.id === taskId);
  if (!t) return null;
  return (
    <div className="p-5 bg-slate-200 shadow-lg rounded-lg" ref={setNodeRef} style={style} {...attributes}>
      <div className="">
        {t.title}
        <button {...listeners}>Drag me</button>
      </div>
    </div>
  );
};

export default Task;
