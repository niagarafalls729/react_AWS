import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import "./GuestBook.css";
import { useState, useEffect, useId, useRef } from "react"; 
import "moment/locale/ko"; //대한민국
// 파이어베이서 파일에서 import 해온 db
import { db } from "../FireBase/DBconfig"; 
import Modalpop from './../component/ModalCRUD'
// db에 접근해서 데이터를 꺼내게 도와줄 친구들
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  limit,
  query,
  fromDate,where
} from "firebase/firestore/lite";

function ActiveExample() {
  //R 로 쓰는 값
  const [users, setUsers] = useState([]);
  //C 로 쓰는 값
  const [created, setCreated] = useState(false);
  const [modified, setModified] = useState(false);
 
  const modifiedContentRef = useRef();
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
      const q = query(collection(db, "guestbook"), orderBy("comment", "desc"));
      const data = await getDocs(q);
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

  async function fn_modified(key) {
    
    
    if (!modified) {

      setModified(key);


    } else if (modified > 0) {

      const q = query(collection(db, "guestbook"), where("comment", "==", key));
      const querySnapshot = await getDocs(q);
      let docID = '';
      querySnapshot.forEach((doc) => {
        docID = doc.id;
      });
      const guestmodified = doc(db, "guestbook", docID);
      await updateDoc(guestmodified,  { content: modifiedContentRef.current.value });
      setModified(false);
      setChanged(true);
 
    }
  }
  function fn_delete(key) {
    console.log("삭제" + key);
  }
 
 

  function fn_created_coment(key) {
    console.log("Dcreatedcoment" + key);
  }
  function fn_date(inputDate) {
    const date = new Date(+inputDate + 3240 * 10000)
      .toISOString()
      .split("T")[0];

    return date;
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
                <Accordion.Body  >
                  <Row key={uniqueId}>
                    <Col>
                      {/* 글 수정 버튼 누를시 생성 */}
                      {modified === value.comment ? (
                        <Form.Group>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            defaultValue={value.content}
                            ref={modifiedContentRef}
                          />
                        </Form.Group>
                      ) : (
                        <h1>{value.content}</h1>
                      )}
                    </Col>
                    <Col xs="auto">
                      {modified === value.comment ? (
                        <Button
                          onClick={() => fn_modified(value.comment)}
                          className="button is-info"
                        >
                          수정한거 저장!
                        </Button>
                      ) : (
                        <Button
                          onClick={() => fn_modified(value.comment)}
                          className="button is-info"
                        >
                          수정
                        </Button>
                      )}
                      <Button
                        onClick={() => fn_delete(value.comment)}
                        className="button is-danger"
                      >
                        삭제
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      작성자 : {value.name} | 작성일 :
                      {fn_date(value.created.seconds * 1000)}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="댓글"
                         
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
      {/* 방명록 등록 팝업  */}
        {created && (
          <Modalpop 
          setCreated={setCreated} 
          setChanged={setChanged}
          ></Modalpop>
        )}
      </>

      {contentList}
    </>
  );
}

export default ActiveExample;
