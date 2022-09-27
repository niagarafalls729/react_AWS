import React from "react";
import { useState, useEffect, useId } from "react";
// 파이어베이서 파일에서 import 해온 db
import { db } from "../FireBase/DBconfig";
// db에 접근해서 데이터를 꺼내게 도와줄 친구들
import {  collection,  getDocs,  addDoc,  updateDoc,  doc,  deleteDoc, query, where,} from "firebase/firestore/lite";

export default function GuestBookDetail(props) {
  //R 로 쓰는 값
  const [users, setUsers] = useState([]);
  // db의 users 컬렉션을 가져옴
  const usersCollectionRef = collection(db, "guestbook") 
  const q = query(collection(db, "guestbook"), where("comment", "==", props.selectNum));
  // 유니크 id를 만들기 위한 useId(); - react 18 기능으로, 이 훅을 이렇게 사용하는게 맞고 틀린지는 모른다.
  const uniqueId = useId();
  // 시작될때 한번만 실행
  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(q);
      //console.log("data:::"+JSON.stringify(data))
      // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
      setUsers(
        data.docs.map((findDoc) => ({ ...findDoc.data(), id: findDoc.id }))
      );
    };
    getUsers();
  }, []);

  return (
    <div class="d-flex" id="wrapper">
      <div id="page-content-wrapper">
        <div class="container-fluid">
          {users.map(
            (value) =>
              value && (
                <>
                  <h1 class="mt-4">{value.title}</h1>
                  <p>{value.content}</p>
                </>
              )
          )}
         
        </div>
      </div>
    </div>
  );
}
