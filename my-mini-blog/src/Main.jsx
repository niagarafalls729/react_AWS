import React from "react";
import { useState, useContext , useEffect } from "react";
import { ChoiceMenuState } from "./ChoiceMenuState";

export default function Main({ name }) {
  const { menuIndex, setMenuIndex } = useContext(ChoiceMenuState);

  return <div>선택 메뉴 : {menuIndex}</div>;
}
