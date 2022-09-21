import React from "react";
import "./SidebarThema.css";

import { useState, useContext, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ChoiceMenuState } from "../context/ChoiceMenuState";
import { SidebarClose } from "../context/SidebarClose";
// import IndexNavbar from "./IndexNavbar";
function Sidebar() {
  const [menuList, setMenuList] = useState([
    {
      title: "블로그 주인",
      itemId: "1",
      pageName: "blogUser",
    },
    {
      title: "공부 일지",
      itemId: "2",
      pageName: "StudyHistory",
      subNav: [
        {
          subTitle: "2-2",
          itemId: "/2/2-1",
        },
        {
          subTitle: "2-2",
          itemId: "/2/2-2",
        },
      ],
    },
    {
      title: "방명록",
      itemId: "3",
      pageName: "Guestbook",
      subNav: [
        {
          subTitle: "3-1",
          itemId: "/3/3-1",
        },
      ],
    },
  ]);
  //map 함수, 람다
  // 상수를 선언자체를 안하고 맵함수부터 바로 리턴에 때려밖아도됨

  // const title2 = menuList.map((i) => <p>{i.title} </p>);
  // const title1 = menuList.map((i) => {
  //   return <p key={i.itemId}>{i.title}</p>;
  // });

  const { menuIndex, setMenuIndex } = useContext(ChoiceMenuState);
  const { conSidebarBool, setConSidebarBool } = useContext(SidebarClose);

  
  function ChoiceMenu(name) {
    setMenuIndex(name);
  }

  const mySider = useRef();

  const [sideBarBool, setSideBarBool] = useState(true);
  function close() {
    setSideBarBool(false);
    setConSidebarBool(false);
  }
  function open() {
    setSideBarBool(true);
    setConSidebarBool(true);
  }

  return ( 
    <>
      <div className={sideBarBool ? "SidebarThema" : "NoneSideberThema"}>
      

      
        <link
          rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"
        ></link>

        <div
          className="w3-sidebar w3-bar-block w3-animate-left"
          id="mySidebar"
          ref={mySider}
        >
          
          <BrowserRouter>
            
            <li className="mainClose">
              <button
                className="w3-bar-item w3-button w3-large"
                onClick={() => ChoiceMenu("main")}
              >
                <Link className="MenuLink" to={"/"}>
                  Main
                </Link>
              </button>
            </li>
            <li className="mainClose-X">
              <button className="w3-bar-item w3-button" onClick={close}>
                &#9776;
              </button>
            </li>
            {menuList.map((i, j) => (
              <ul
                className="w3-bar-item w3-button w3-hover-text-red"
                key={j}
                onClick={() => ChoiceMenu(i.pageName)}
              >
                <Link className="MenuLink" to={i.itemId}>
                  {i.title}
                </Link>
              </ul>
            ))}

            <Routes>
              <Route key="0" path="/" element={""} />

              {menuList.map((i, k) => (
                <Route key={k} path={i.itemId} element={""} />
              ))}
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <button className="w3-button w3-white" onClick={open}>
        &#9776;
      </button>
      
    </>
  );
}

export default Sidebar;
