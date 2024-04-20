import Task from "./Task";
import { useKanbanStore } from "./kanban.store";
import { useDroppable } from "@dnd-kit/core";
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const StatusList = ({ status }: { status: string }) => {
  const { task } = useKanbanStore();
  const listTask = task.find((t) => t.name === status)?.task ?? [];
  // all tasks
  const allIdentifiers = listTask.map((t) => t.id);
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <SortableContext id={status} items={allIdentifiers} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef}>
        <h1>{status}</h1>

        <div className="grid gap-2">
          {listTask.map((t) => (
            <Task key={t.id} taskId={t.id} status={status} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default StatusList;
