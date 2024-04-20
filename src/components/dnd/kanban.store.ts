import { todo } from "node:test";
import { create } from "zustand";

type Task = {
  id: number;
  title: string;
};

type TaskList = {
  name: string;
  task: Task[];
};

interface KanbanStore {
  task: TaskList[];
  activeId: number | null;
  setActiveId: (id: number) => void;
}

const initialtask: TaskList[] = [
  {
    name: "todo",
    task: [
      {
        id: 1,
        title: "Task 1",
      },
      {
        id: 2,
        title: "Task 2",
      },
    ],
  },
  {
    name: "in-progress",
    task: [
      {
        id: 3,
        title: "Task 3",
      },
    ],
  },
  {
    name: "done",
    task: [
      {
        id: 4,
        title: "Task 4",
      },
    ],
  },
];

export const useKanbanStore = create<KanbanStore>((set) => ({
  task: initialtask,
  activeId: null,
  setActiveId: (id: number) => set({ activeId: id }),
}));
