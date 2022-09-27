import Table from "react-bootstrap/Table";
import { useState, useEffect, useId } from "react";
// 파이어베이서 파일에서 import 해온 db
import { db } from "../FireBase/DBconfig";
 import GuestBookDetail from "./GuestBookDetail";
// db에 접근해서 데이터를 꺼내게 도와줄 친구들
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore/lite";

function ActiveExample() {
  //R 로 쓰는 값
  const [users, setUsers] = useState([]);
  // db의 users 컬렉션을 가져옴
  const usersCollectionRef = collection(db, "guestbook");
  // 유니크 id를 만들기 위한 useId(); - react 18 기능으로, 이 훅을 이렇게 사용하는게 맞고 틀린지는 모른다.
  const uniqueId = useId();
  // C U D 행동하면 한번씩 렌더링을 위한 값 useEffect에 사용.
  const [changed, setChanged] = useState(false);
  // 게시글 선택시 값 바로위에 랜더링 시켜주기 위한 visible 값
  const [choiceState, SetChoiceState] = useState(false);
  // 시작될때 한번만 실행
  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(usersCollectionRef);
      
      // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
      setUsers(
        data.docs.map((findDoc) => ({ ...findDoc.data(), id: findDoc.id }))
      );
    };
    setChanged(false);
    getUsers();
    
  }, [changed]);

  function fn_mouseOver(key) {
    //이건 마우스 위로 올렸을때 효과주기 연습.
    key.target.style.background = "blue";
    key.target.style.color = "white";
  }

  function fn_mouseLeave(key) {
    key.target.style.background = "white";
    key.target.style.color = "black";
  }
  function fn_click(key) {
    // 게시글 선택
    SetChoiceState(key); 
    
  }
   
  function contentList() {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>시간</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          
            {users.map((value) => ( value && (
              <tr key={uniqueId} onClick={()=>fn_click(value.comment)}>
              <td>{value.comment}</td>
              <td>{value.title}</td>
              <td>{value.created.timestampValue}</td>
              <td>{value.name}</td>
              </tr>    
              )
            ))
            }
          
        </tbody>
      </Table>
    );
  }


  return (
    <>
      {choiceState && <div><GuestBookDetail selectNum = {choiceState}/></div>}
      {contentList()}
    </>
  );
}

export default ActiveExample;
