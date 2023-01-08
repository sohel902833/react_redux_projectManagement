export const BACKLOG = "Backlog";
export const READY = "Ready";
export const DOING = "Doing";
export const REVIEW = "Review";
export const BLOCKED = "Blocked";
export const DONE = "Done";

export const stages = [
  {
    id: 1,
    title: BACKLOG,
    createButton: true,
  },
  {
    id: 2,
    title: READY,
    createButton: false,
  },
  {
    id: 3,
    title: DOING,
    createButton: false,
  },
  {
    id: 4,
    title: REVIEW,
    createButton: false,
  },
  {
    id: 5,
    title: BLOCKED,
    createButton: false,
  },
  {
    id: 6,
    title: DONE,
    createButton: false,
  },
];
