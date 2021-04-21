/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import Root from "./Root";
import "./index.css";
import { ThemeProvider } from "theme-ui";
import { mainTheme } from "./globalStyles/themes/mainTheme";

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  </ThemeProvider>,
  document.getElementById("root")
);
