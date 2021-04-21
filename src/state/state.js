/** @format */
import { atom, selector } from "recoil";

export const tasksState = atom({
  key: "tasksState",
  default: [],
});

export const staticTasksState = atom({
  key: "staticTasksState",
  default: [],
});
export const currentPageNumber = atom({
  key: "currentPageNumber",
  default: 1,
});

export const finishedTask = selector({
  key: "finishedTask",
  get: ({ get }) => {
    const ourFinishedTask = get(tasksState).filter(
      (task) => task.completed === true
    );
    return ourFinishedTask;
  },
});
export const currentTask = selector({
  key: "currentTask",
  get: ({ get }) => {
    const ourCurrentTask = get(tasksState).filter((task) => {
      return task.completed === false;
    });
    return ourCurrentTask;
  },
});

export const staticFinishedTask = selector({
  key: "staticFinishedTask",
  get: ({ get }) => {
    const ourStaticFinishedTask = get(staticTasksState).filter((task) => {
      return task.completed === true;
    });
    return ourStaticFinishedTask;
  },
});
export const staticCurrentTask = selector({
  key: "staticCurrentTask",
  get: ({ get }) => {
    const ourStaticCurrentTask = get(staticTasksState).filter((task) => {
      return task.completed === false;
    });
    return ourStaticCurrentTask;
  },
});
