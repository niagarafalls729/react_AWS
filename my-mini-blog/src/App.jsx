import "./App.css";
import Main from "./main/Main";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";
import { ChoiceMenuState } from "./context/ChoiceMenuState";
import { SidebarClose } from "./context/SidebarClose";
import "bulma/css/bulma.min.css";
 

import IndexNavbar from "./sidebar/IndexNavbar";


function App() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [conSidebarBool, setConSidebarBool] = useState(true);

  return (
      
    <div> 
      <IndexNavbar></IndexNavbar>
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
