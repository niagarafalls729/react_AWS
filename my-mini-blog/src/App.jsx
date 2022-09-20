import logo from "./logo.svg";
import "./App.css";
import Main from "./Main";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";
import { ChoiceMenuState } from "./Context/ChoiceMenuState";
import { SidebarClose } from "./Context/SidebarClose";

function App() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [conSidebarBool, setConSidebarBool] = useState(true);


  return (
    <div>
      <ChoiceMenuState.Provider value={{ menuIndex, setMenuIndex }}>
      <SidebarClose.Provider value={{ conSidebarBool, setConSidebarBool }}>
        <Sidebar></Sidebar>
        <Main></Main>
        <Main></Main>
        <Main></Main>
        <Main></Main>
        <Main></Main>
      </SidebarClose.Provider>
      </ChoiceMenuState.Provider>
    </div>
  );
}

export default App;
