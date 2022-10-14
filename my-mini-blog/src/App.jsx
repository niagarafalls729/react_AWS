import "./App.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import { useState, useEffect } from "react";
import { ChoiceMenuState } from "./context/ChoiceMenuState";
import { SidebarClose } from "./context/SidebarClose";
import "bulma/css/bulma.min.css";
 

import IndexNavbar from "./sidebar/IndexNavbar";



function App() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [conSidebarBool, setConSidebarBool] = useState(true); 

  return (
      
   <>
      <IndexNavbar></IndexNavbar>
      <ChoiceMenuState.Provider value={{ menuIndex, setMenuIndex }}>
        <SidebarClose.Provider value={{ conSidebarBool, setConSidebarBool }}>

          <Sidebar size = {window.innerWidth * 0.01}></Sidebar>
          
          <Main></Main>
          
        </SidebarClose.Provider>
      </ChoiceMenuState.Provider>
    </>
  );
}

export default App;
