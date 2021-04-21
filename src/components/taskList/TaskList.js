/** @format */
/** @jsxImportSource theme-ui */

import SearchInput from "../searchInput/SearchInput";
import Task from "../task/Task";
import { TaskListStyles } from "./taskListStyles";

const TaskList = ({ tasksToDisplay }) => {
  return (
    <>
      <div>{<SearchInput />}</div>
      <ul sx={TaskListStyles}>
        {tasksToDisplay.map((task) => {
          const {
            title,
            completed,
            id,
            created_at,
            updated_at,
            isEditing,
            lettersCounter,
          } = task;

          return (
            <li key={id}>
              <Task
                completed={completed}
                created_at={created_at}
                lettersCounter={lettersCounter}
                id={id}
                title={title}
                updated_at={updated_at}
                isEditing={isEditing}
                task={task}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TaskList;
