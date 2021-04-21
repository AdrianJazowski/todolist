/** @format */

import React from "react";
import { useRecoilValue } from "recoil";
import TaskList from "../../components/taskList/TaskList";
import { currentTask } from "../../state/state";

const CurrentTask = () => {
  const listOfCurrentTasks = useRecoilValue(currentTask);
  return (
    <>
      <TaskList tasksToDisplay={listOfCurrentTasks} />
    </>
  );
};

export default CurrentTask;
