/** @format */
/** @jsxImportSource theme-ui */

import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { MdDone, MdCancel } from "react-icons/md";
import { Link, Redirect } from "react-router-dom";
import {
  BottomSectionWrapperStyles,
  DeleteButtonStyles,
  IconsStyles,
  LetterCounterStyles,
  MiddleSectionStyles,
  TaskWrapperStyles,
} from "./taskStyles";
import { useContext, useState } from "react";
import { routes } from "../../routes";
import AppContext from "../../state/context";

const Task = (props) => {
  const {
    completed,
    created_at,
    id,
    title,
    updated_at,
    task,
    lettersCounter,
    isEditing,
    alreadyInTask,
  } = props;
  const value = useContext(AppContext);
  const {
    handleEditTaskTitle,
    handleFinishTask,
    handleDeleteTask,
    toggleEditingTask,
  } = value;
  const [isRedirect, setIsRedirect] = useState(false);

  const handleDeleteTaskAndSetRedirect = () => {
    handleDeleteTask(id);
    setIsRedirect(true);
  };
  const handleFinishTaskAndSetRedirect = (id) => {
    handleFinishTask(id);
    setIsRedirect(true);
  };

  const renderTopSection = () => (
    <div sx={TaskWrapperStyles}>
      <button
        sx={DeleteButtonStyles}
        title="Usuń zadanie"
        onClick={() => handleDeleteTaskAndSetRedirect()}
      >
        <AiFillDelete />
      </button>
      <div
        sx={{
          width: "100%",
          height: "2%",
          backgroundColor: "primary",
        }}
      />
      <p sx={{ margin: "5px", fontSize: 0 }}>Zadanie stworzono: {created_at}</p>
      {renderMiddleSection()}
    </div>
  );

  const renderMiddleSection = () => (
    <div sx={MiddleSectionStyles}>
      <textarea
        sx={{ flex: 1, resize: "none" }}
        disabled={isEditing ? false : true}
        value={title}
        maxLength={270}
        onChange={(e) => handleEditTaskTitle(id, e)}
      />
      {renderCardBottomSection()}
    </div>
  );

  const renderCardBottomSection = () => (
    <>
      <div sx={LetterCounterStyles}>
        <p sx={{ fontWeight: "heading" }}>{lettersCounter}/270</p>
      </div>
      <div sx={BottomSectionWrapperStyles}>
        <div sx={IconsStyles}>
          {alreadyInTask ? null : (
            <>
              <Link
                to={{
                  pathname: `/task/${id}`,
                  state: {
                    task,
                  },
                }}
              >
                <AiFillEye title="Zobacz zadanie" />
              </Link>
              <AiFillEdit
                title="Edytuj zadanie"
                onClick={() => toggleEditingTask(id)}
              />
            </>
          )}

          {completed ? (
            <MdCancel
              title="Anuluj  wykonanie zadania"
              onClick={() => handleFinishTaskAndSetRedirect(id)}
            />
          ) : (
            <MdDone
              title="Zakończ zadanie"
              onClick={() => handleFinishTaskAndSetRedirect(id)}
            />
          )}
        </div>
        <p sx={{ fontSize: 0 }}>Ostatnia zmiana: {updated_at}</p>
      </div>
    </>
  );

  return (
    <>
      <div sx={{ display: "flex", justifyContent: "center" }}>
        {renderTopSection()}
      </div>
      {isRedirect ? <Redirect to={routes.currentTask} /> : null}
    </>
  );
};

export default Task;
