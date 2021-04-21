/** @format */
/** @jsxImportSource theme-ui */

import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { NavbarStyles } from "./navbarStyles";
import AppContext from "../../state/context";
import { useContext } from "react";
import { staticCurrentTask, staticFinishedTask } from "../../state/state";
import { useRecoilValue } from "recoil";

const Navbar = () => {
  const staticFinishedTasksLenght = useRecoilValue(staticFinishedTask);
  const staticCurrentTasksLenght = useRecoilValue(staticCurrentTask);
  const value = useContext(AppContext);
  const { addNewTask } = value;

  return (
    <div sx={NavbarStyles}>
      <ul>
        <li onClick={addNewTask}>
          <Link to={routes.currentTask}>Utwórz nowe zadanie</Link>
        </li>
        <li>
          <Link to={routes.currentTask}>
            W trakcie realizacji ({staticCurrentTasksLenght.length})
          </Link>
        </li>
        <li>
          <Link to={routes.finishedTask}>
            Zrealizowane ({staticFinishedTasksLenght.length})
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
