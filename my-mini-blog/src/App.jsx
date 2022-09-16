import logo from "./logo.svg";
import "./App.css";
import Main from "./Main";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";
import { ChoiceMenuState } from "./ChoiceMenuState";

function App() {
  const [menuIndex, setMenuIndex] = useState(null);

  return (
    <div>
      <ChoiceMenuState.Provider value={{ menuIndex, setMenuIndex }}>
        <Sidebar></Sidebar>
        <Main></Main>
        <Main></Main>
        <Main></Main>
        <Main></Main>
        <Main></Main>
      </ChoiceMenuState.Provider>
    </div>
  );
}

export default App;
