import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useId, useRef } from "react";
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

  function fn_comnet_save(key){
    console.log("댓글"+key)
  }

  function fn_click(key) {
    // 게시글 선택
    SetChoiceState(key);
    console.log("key" + key);
    // return (
    //   <div>
    //     <input></input>
    //     <button>등록</button>
    //   </div>
    // );
  }
  const AB = useRef();  

  const  contentList = 
  
      <Accordion key={uniqueId} flush>
        {users.map(
          (value) =>
            value && (
              // <tr key={uniqueId} onClick={() => fn_click(value.comment)}>
              <>
                <Accordion.Item key={uniqueId} eventKey={value.comment}>
                  <Accordion.Header onClick={() => fn_click(value.comment)}>
                    {value.title}
                     
                  </Accordion.Header>
                  <Accordion.Body ref={AB}>
                    <Row>
                      <Col>
                        <h1>{value.content}</h1>
                      </Col>
                      <Col xs="auto">
                        <Button onClick={() => fn_comnet_save(value.comment)} className="mb-3">
                          삭제
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Control className="mb-2" id="inlineFormInput" ref={AB} />
                      </Col>
                      <Col xs="auto">
                        <Button onClick={() => fn_comnet_save(value.comment)} className="mb-2">
                          등록
                        </Button>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            )
        )}
      </Accordion>
  

  return (
    <>
      {/* {choiceState && (
        <div>
          <GuestBookDetail selectNum={choiceState} />
        </div>
      )} */}
      {contentList}
    </>
  );
}

export default ActiveExample;
