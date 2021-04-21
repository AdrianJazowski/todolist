/** @format */

import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import {
  currentPageNumber,
  currentTask,
  finishedTask,
  staticTasksState,
  tasksState,
} from "./state/state";
import Router from "./routing/Router";
import { Spinner } from "theme-ui";
import AppContext from "./state/context";
import {
  deleteTasksFromApi,
  postTasksToApi,
  updateTasksInApi,
} from "./api/ApiMethods";

const Root = () => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [staticTasks, setStaticTasks] = useRecoilState(staticTasksState);
  const [spinSpiner, setSpinSpiner] = useState(true);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageNumber);
  const listOfFinishedTasks = useRecoilValue(finishedTask);
  const listOfCurrentTasks = useRecoilValue(currentTask);

  useEffect(() => {
    getTasksFromApi(currentPage);
    setSpinSpiner(false);
  }, []);

  const setTasksFormApiRequest = (taskData) => {
    const tasksArray = taskData.map((task) => {
      const { title, created_at, updated_at } = task;
      const created = created_at.substr(0, 10);
      const updated = updated_at.substr(0, 10);
      const lettersCounter = title.length;

      return {
        ...task,
        created_at: created,
        updated_at: updated,
        isEditing: false,
        lettersCounter,
      };
    });
    setStaticTasks([...tasksArray]);
    setTasks([...tasksArray]);
  };

  const getTasksFromApi = (pageNumber) => {
    fetch(`https://gorest.co.in/public-api/todos?page=${pageNumber}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTasksFormApiRequest(data.data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSetTaskState = (props) => {
    setTasks(props);
  };
  const handleSetStaticTaskState = (props) => {
    setStaticTasks(props);
  };

  const addNewTask = () => {
    const date = new Date();
    const newDate = `${date.getFullYear()}-0${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const newTask = {
      id: uuidv4(),
      user_id: 1,
      title: "Napisz treść zadania...",
      completed: false,
      created_at: newDate,
      updated_at: newDate,
      isEditing: false,
      lettersCounter: 0,
    };

    postTasksToApi(newTask);
    handleSetTaskState([newTask, ...tasks]);
  };

  const filterTasksByName = (searchInputValue) => {
    if (searchInputValue.length !== 0) {
      const filteredTasks = staticTasks.filter((task) => {
        const lowerCaseInputValue = searchInputValue.toLowerCase();
        const lowerCaseTaskName = task.title
          .toLowerCase()
          .slice(0, searchInputValue.length);

        return lowerCaseInputValue === lowerCaseTaskName;
      });

      handleSetTaskState([...filteredTasks]);
    } else {
      handleSetTaskState([...staticTasks]);
    }
  };

  const handleEditTaskTitle = (taskId, e) => {
    const mappedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newTask = {
          ...task,
          title: e.target.value,
          lettersCounter: e.target.value.length,
        };

        updateTasksInApi(taskId, newTask);
        return {
          ...newTask,
        };
      } else {
        return task;
      }
    });

    handleSetStaticTaskState([...mappedTasks]);
    handleSetTaskState([...mappedTasks]);
  };

  const handleFinishTask = (id) => {
    const newTodoList = tasks.map((task) => {
      return id === task.id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task;
    });
    handleSetStaticTaskState([...newTodoList]);
    handleSetTaskState([...newTodoList]);
  };

  const handleDeleteTask = (id) => {
    const newTodoList = tasks.filter((task) => {
      return task.id !== id;
    });
    deleteTasksFromApi(id);
    handleSetStaticTaskState([...newTodoList]);
    handleSetTaskState([...newTodoList]);
  };
  const toggleEditingTask = (taskId) => {
    const mappedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return task.title === "Napisz treść zadania..."
          ? {
              ...task,
              title: "",
              lettersCounter: 0,
              isEditing: !task.isEditing,
            }
          : {
              ...task,
              isEditing: !task.isEditing,
            };
      } else {
        return task;
      }
    });
    handleSetStaticTaskState([...mappedTasks]);
    handleSetTaskState([...mappedTasks]);
  };
  const handleGetNextPageWithTasks = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <AppContext.Provider
        value={{
          tasks,
          staticTasks,
          handleSetTaskState,
          handleSetStaticTaskState,
          listOfFinishedTasks,
          listOfCurrentTasks,
          addNewTask,
          filterTasksByName,
          handleEditTaskTitle,
          handleFinishTask,
          handleDeleteTask,
          toggleEditingTask,
          handleGetNextPageWithTasks,
        }}
      >
        {spinSpiner ? <Spinner /> : <Router />}
      </AppContext.Provider>
    </>
  );
};

export default Root;
