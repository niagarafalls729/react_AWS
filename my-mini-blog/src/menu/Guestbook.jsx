import { useRef, useState, useEffect, useId } from "react";
// 파이어베이서 파일에서 import 해온 db
import { db } from "../FireBase/DBconfig";
// db에 접근해서 데이터를 꺼내게 도와줄 친구들
import { collection, getDocs, addDoc,updateDoc,doc, deleteDoc } from "firebase/firestore/lite";
import { async } from "@firebase/util";

function Guestbook() {
  // 이따가 users 추가하고 삭제하는거 진행을 도와줄 state
  const [users, setUsers] = useState([]);
  // db의 users 컬렉션을 가져옴
  const usersCollectionRef = collection(db, "users");
  // 유니크 id를 만들기 위한 useId(); - react 18 기능으로, 이 훅을 이렇게 사용하는게 맞고 틀린지는 모른다.
  const uniqueId = useId();
  console.log(uniqueId);
  const [changed, setChanged] = useState(false);
  // 시작될때 한번만 실행
  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(usersCollectionRef);
      // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    setChanged(false);
    getUsers();
  }, [changed]);

  const [userId, SetUserId] = useState("");
  const [age, SetAge] = useState("");

  // 띄워줄 데이터 key값에 고유ID를 넣어준다.
  const showUsers = users.map(
    (value) =>
      value && (
        <div>
          <div key={uniqueId}>
            <h1>Name: {value.name}</h1>
            <h1>Age: {value.age}</h1>
            <button
              onClick={() => {
                updateUser(value.id, value.age);
              }}
            >
              Increase Age
            </button>
            <button onClick={() => {deleteUser(value.id)}}>
              Delete Users
            </button>
          </div>
        </div>
      )
  );

  const saveInput = useRef();
  const saveInputAge = useRef();

  async function fn_save() {
    // 여기다가 하니깐 useState 가 재 렌더링 하면서 값응ㅇㄹ 못넣음 시발

    // SetUserId(saveInput.current.value);
    // SetAge(saveInputAge.current.value);
    // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
    console.log("userId" + userId + "/" + "age" + age);
    await addDoc(usersCollectionRef, { name: userId, age: age });
    setChanged(true);
  }
 async function updateUser(id, age){
  //id 로 해당 디비중에 값을 찾음.
  const userDoc = doc(db, "users", id)
  const newField = {age: ( Number(age) + 1)};
  await updateDoc(userDoc, newField);
  setChanged(true);
 }
async function deleteUser(id){
  const userDoc = doc(db, "users", id)
  await deleteDoc(userDoc)
  setChanged(true);
}
  return (
    <>
      <input
        type="text"
        ref={saveInput}
        onChange={(e) => {
          SetUserId(e.target.value);
        }}
      ></input>
      <input
        type="number"
        ref={saveInputAge}
        onChange={(e) => {
          SetAge(e.target.value);
        }}
      ></input>
      <button onClick={fn_save}>저장</button>
      <div className="App">{showUsers}</div>
    </>
  );
}

export default Guestbook;
