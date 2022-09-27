import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import "./GuestBook.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
  deleteDoc,orderBy,limit,query
} from "firebase/firestore/lite";

function ActiveExample() {
  //R 로 쓰는 값
  const [users, setUsers] = useState([]);
  //C 로 쓰는 값
  const [created, setCreated] = useState(false);
  const [createdTitle, setCreatedTitle] = useState("");
  const [createdContent, setCreatedContent] = useState("");
  const [createdName, setCreatedName] = useState("");

  const createdTitleRef = useRef();
  const createdContentRef = useRef();
  const createdNameRef = useRef();

  // db의 users 컬렉션을 가져옴
  const usersCollectionRef = collection(db, "guestbook");
  // 유니크 id를 만들기 위한 useId(); - react 18 기능으로, 이 훅을 이렇게 사용하는게 맞고 틀린지는 모른다.
  const uniqueId = useId();
  // C U D 행동하면 한번씩 렌더링을 위한 값 useEffect에 사용.
  const [changed, setChanged] = useState(false);
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

  // function fn_mouseOver(key) {
  //   //이건 마우스 위로 올렸을때 효과주기 연습.
  //   key.target.style.background = "blue";
  //   key.target.style.color = "white";
  // }

  // function fn_mouseLeave(key) {
  //   key.target.style.background = "white";
  //   key.target.style.color = "black";
  // }

  function fn_comnet_save(key) {
    console.log("댓글" + key);
  }

  const AB = useRef();
  function fn_created_setting() {
   
    console.log(createdTitleRef.current.value)
    console.log(createdContentRef.current.value)
    console.log(createdNameRef.current.value)
    fn_created();
  }
     
  // 비동기로 데이터 받을준비
  async function fn_created() {
    // getDocs로 컬렉션안에 데이터 가져오기
    
    //console.log("data:::"+JSON.stringify(data))
    // users에 data안의 자료 추가. 객체에 id 덮어씌우는거

    const usersCollectionRef = collection(db, "guestbook") 
    const q = query(collection(db, "guestbook"), orderBy("comment","desc"), limit(1));
    const data2 = await getDocs(q);
    
    const maxnum = data2.docs.map((findDoc) => ({ ...findDoc.data(), id: findDoc.id }))
    console.log(maxnum[0].comment)
  };
   
   

    

    // await addDoc(usersCollectionRef, { title: createdTitleRef.current.value
    //   , content  : createdContentRef.current.value
    //   , name     : createdNameRef.current.value
    //   , created  : createdNameRef.current.value
    //   , comment  : age
    // });


    // setCreated(false)
    // setChanged(true);
  
  function fn_created_coment(key) {
    console.log("Dcreatedcoment" + key);
  }

  const contentList = (
    <Accordion key={uniqueId} flush>
      {users.map(
        (value) =>
          value && (
            // <tr key={uniqueId} onClick={() => fn_click(value.comment)}>
            <>
              <Accordion.Item eventKey={value.comment}>
                <Accordion.Header key={uniqueId}>
                  {value.title}
                </Accordion.Header>
                <Accordion.Body ref={AB}>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3-hidden">
                        <Form.Control
                          as="textarea"
                          rows={5}
                          defaultValue={value.content}
                        />
                      </Form.Group>
                      <h1>{value.content}</h1>
                    </Col>
                    <Col xs="auto">
                      <Button
                        onClick={() => fn_comnet_save(value.comment)}
                        className="button is-info"
                      >
                        수정
                      </Button>
                      <Button
                        onClick={() => fn_comnet_save(value.comment)}
                        className="button is-danger"
                      >
                        삭제
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>create Date: {value.created.seconds}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="댓글"
                        ref={AB}
                      />
                    </Col>
                    <Col xs="auto">
                      <Button
                        onClick={() => fn_created_coment(value.comment)}
                        className="mb-2"
                      >
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
  );

  return (
    <>
      <Row>
        <Col>
          <Form.Group className="mb-3-hidden">
            <Form.Control as="textarea" rows={5} />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={() => setCreated(true)}>
            방명록 등록!
          </Button>
        </Col>
      </Row>
      <>
        {created && (
          <Modal.Dialog>
            <Modal.Header>
              <Form.Control id="inlineFormInput" ref={createdTitleRef} placeholder="제목" />
            </Modal.Header>

            <Modal.Body>
              <Form.Control as="textarea" ref={createdContentRef} rows={5} placeholder="내용" />
            </Modal.Body>

            <Modal.Footer>
              <Col>
                <Form.Control id="inlineFormInput"  ref={createdNameRef}  placeholder="작성자" />
              </Col>
              <Button variant="primary" onClick={() => fn_created_setting()}>
                등록 >___@{" "}
              </Button>
              <Button variant="secondary" onClick={() => setCreated(false)}>
                Close
              </Button>

            </Modal.Footer>
          </Modal.Dialog>
        )}
      </>

      {contentList}
    </>
  );
}

export default ActiveExample;
