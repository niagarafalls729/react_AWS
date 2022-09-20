import logo from "./logo.svg";
import "./App.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";
import { ChoiceMenuState } from "./context/ChoiceMenuState";
import { SidebarClose } from "./context/SidebarClose";

function App() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [conSidebarBool, setConSidebarBool] = useState(true);


  return (
    <div>
      <ChoiceMenuState.Provider value={{ menuIndex, setMenuIndex }}>
      <SidebarClose.Provider value={{ conSidebarBool, setConSidebarBool }}>
        <Sidebar></Sidebar>
        <Main></Main> 
      </SidebarClose.Provider>
      </ChoiceMenuState.Provider>
    </div>
  );
}

export default App;
