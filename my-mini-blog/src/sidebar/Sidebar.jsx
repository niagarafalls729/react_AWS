import React from "react";
import "./SidebarThema.css";
import { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ChoiceMenuState } from "../ChoiceMenuState";

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
      pageName: "guest book",
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
  function ChoiceMenu(name) { 
    setMenuIndex(name);
  }
  return (
    <div className="SidebarThema">
      <BrowserRouter>
        <ul>
          {menuList.map((i,j) => (
            <li  key={j} onClick={() => ChoiceMenu(i.pageName)}>
              <Link to={i.itemId}>{i.title}</Link>
            </li>
          ))}
        </ul>
        <Routes>
          {menuList.map((i,k) => (
            <Route key={k} path={i.itemId} element={""} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Sidebar;
