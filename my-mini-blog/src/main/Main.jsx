import React from "react";
import {  useContext } from "react";
import { ChoiceMenuState } from "../context/ChoiceMenuState";
import { SidebarClose } from "../context/SidebarClose";
import "./Main.css"
import BlogUser from '../menu/BlogUser';
import StudyHistory from '../menu/StudyHistory';
import StudyHistoryC from '../menu/StudyHistoryC';
import GuestBook from '../menu/GuestBook';
import HomeContents from '../menu/HomeContents';

export default function Main() {
  const { conSidebarBool, setConSidebarBool } = useContext(SidebarClose);

  function SelectMenu() {
    const { menuIndex, setMenuIndex } = useContext(ChoiceMenuState);
    console.log("MAINmenuIndex",menuIndex)
    switch (menuIndex) {
      case "blogUser":
        return <BlogUser></BlogUser>
      case "StudyHistory":
        return <StudyHistory></StudyHistory>
      case "StudyHistoryC":
          return <StudyHistoryC></StudyHistoryC>        
      case "Guestbook":
        return <GuestBook></GuestBook>

      default:
        return <HomeContents></HomeContents>
    }
  } 
  return (
    <div className={conSidebarBool ? "MainDiv" : "NoneMainDiv"}>
      
      {SelectMenu()}

    </div>
  );
}
