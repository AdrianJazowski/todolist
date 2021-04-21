/** @format */
/** @jsxImportSource theme-ui */

import Task from "../../components/task/Task";
import { RiArrowGoBackFill } from "react-icons/ri";
import { SingleTaskWrapperStyles } from "./singleTaskStyles";

const SingleTask = (props) => {
  const { task } = props.location.state;
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div
      sx={{
        transform: "translate(0, 50%)",
      }}
    >
      <Task {...task} alreadyInTask />
      <button sx={SingleTaskWrapperStyles} onClick={handleGoBack}>
        <RiArrowGoBackFill />
        Powrót
      </button>
    </div>
  );
};

export default SingleTask;
