import { uuid } from "./utils/uuid";

export const columns = [
  {
    id: "opened",
    name: "Opened",
    availableColumns: ["in-progress", "closed"],
    tasks: [
      {
        id: uuid(),
        title: "Get some milk",
        description: "for breakfast",
        status: "opened",
      },
      {
        id: uuid(),
        title: "Take out trash",
        description: "",
        status: "opened",
      },
    ],
  },
  {
    id: "in-progress",
    name: "In progress",
    availableColumns: ["opened", "done", "closed"],
    tasks: [
      {
        id: uuid(),
        title: "Read a book",
        description: "until the end of this month",
        status: "in-progress",
      },
      {
        id: uuid(),
        title: "Read vue3 docs",
        description: "",
        status: "opened",
      },
    ],
  },
  {
    id: "done",
    name: "Done",
    availableColumns: ["closed"],
    tasks: [
      {
        id: uuid(),
        title: "Take dog for a walk",
        description: "play fetch with a ball",
        status: "done",
      },
    ],
  },
  {
    id: "closed",
    name: "Closed",
    availableColumns: ["opened"],
    tasks: [
      {
        id: uuid(),
        title: "Wash clothes",
        description: "dark clothes only",
        status: "closed",
      },
      {
        id: uuid(),
        title: "Dry clothes",
        description: "on low temperature",
        status: "closed",
      },
    ],
  },
];
