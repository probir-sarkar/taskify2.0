"use client";
import StatusList from "./StatusList";
import { useState } from "react";
import { useKanbanStore } from "./kanban.store";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const KanbanBoard = () => {
  const { task } = useKanbanStore();
  const [activeId, setActiveId] = useState(null);
  const handleDragEnd = (event: any) => {
    console.log(event);
    setActiveId(null);
  };

  const handleDragSrart = (event: any) => {
    console.log(event.active.id);
  };

  const status = task.map((t) => t.name);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <div className="flex flex-row ">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragSrart}
      >
        {status.map((s) => (
          <StatusList status={s} key={s} />
        ))}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
