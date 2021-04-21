/** @format */

import React from "react";
import { useRecoilValue } from "recoil";
import TaskList from "../../components/taskList/TaskList";
import { finishedTask } from "../../state/state";

const FinishedTask = () => {
  const listOfFinishedTasks = useRecoilValue(finishedTask);

  return (
    <>
      <TaskList tasksToDisplay={listOfFinishedTasks} />
    </>
  );
};

export default FinishedTask;
