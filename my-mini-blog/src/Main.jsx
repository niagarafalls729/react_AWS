import React from "react";
import { useState, useContext, useEffect } from "react";
import { ChoiceMenuState } from "./Context/ChoiceMenuState";
import { SidebarClose } from "./Context/SidebarClose";

import "./Main.css"

export default function Main({ name }) {
  const { menuIndex, setMenuIndex } = useContext(ChoiceMenuState);
  const { conSidebarBool, setConSidebarBool } = useContext(SidebarClose);
  //<div className={sideBarBool ? "SidebarThema" : "NoneSideberThema"}></div>
  return (
    <div className={conSidebarBool ? "MainDiv" : "NoneMainDiv"}>
      <div>선택 메뉴 : {menuIndex}</div>
    </div>
  );
}
