import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import InputGroup from "react-bootstrap/InputGroup";
import "./GuestBook.css";
import { useState, useEffect, useId, useRef } from "react";
import "moment/locale/ko"; //대한민국
import Comment from '../component/CommentCRUD'
// 파이어베이서 파일에서 import 해온 db
import { db } from "../FireBase/DBconfig";
import Modalpop from "../component/ModalCRUD";
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
  fromDate,
  where,
} from "firebase/firestore/lite";

function ActiveExample() {
  //R 로 쓰는 값
  const [users, setUsers] = useState([]);
  //C 로 쓰는 값
  const [created, setCreated] = useState(false);
  const [modified, setModified] = useState(false);

  const modifiedContentRef = useRef();

  const [ modifiedPassWord , setModifiedPassWord ]= useState(false); 
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
 

  function fn_comnet_save(key) {
    console.log("댓글" + key);
  }
  function fn_password(password ,comment){
    console.log("modifiedPassWord"+modifiedPassWord+"///"+password)
    setModified(comment)
    if( modifiedPassWord == password){
      console.log("비밀번호 확인 성공")
      setModifiedPassWord("pass")
    }else{
      setModifiedPassWord("no")
    }

  }
  async function fn_modified(key) {
    if (!modified) {
      setModified(key);
    } else if (modified > 0) {
      const q = query(collection(db, "guestbook"), where("comment", "==", key));
      const querySnapshot = await getDocs(q);
      let docID = "";
      querySnapshot.forEach((doc) => {
        docID = doc.id;
      });
      const guestmodified = doc(db, "guestbook", docID);
      await updateDoc(guestmodified, {
        content: modifiedContentRef.current.value,
      });
      setModified(false);
      setChanged(true);
    }
  }
  async function fn_delete(key) {

    const q = query(collection(db, "guestbook"), where("comment", "==", key));
    const querySnapshot = await getDocs(q);
    let docID = "";
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });
    const guestmodified = doc(db, "guestbook", docID);
    await deleteDoc(guestmodified, {
      content: modifiedContentRef.current.value,
    });
    setModified(false);
    setChanged(true);

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
                <Accordion.Body>
                  <Row key={uniqueId}>
                    <Col>
                      {/* 글 수정 버튼 누를시 생성 */}
                      {modified === value.comment &&  modifiedPassWord == "pass" ? (
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
                      {modified === value.comment &&  modifiedPassWord == "pass" ? (
                        <>
                          <InputGroup size="sm"> 
                          <Button
                            onClick={() => fn_modified(value.comment)}
                            variant="outline-secondary"
                          >
                            저장!
                          </Button>
                          <Button
                            onClick={() => fn_delete(value.comment)}
                            variant="outline-secondary"
                          >
                            삭제
                          </Button>
                          </InputGroup>
                        </>
                      ) : (
                        <>
                          <InputGroup size="sm">
                            <Form.Control maxLength="10" placeholder="비밀번호" className="inputSize" onChange={(e)=>setModifiedPassWord(e.target.value) }/>
                            <Button
                              variant="outline-secondary"
                              onClick={() => 
                                fn_password(value.password , value.comment)
                              }
                            >
                              수정 or 삭제
                            </Button>
                           
                          </InputGroup>

                          {/*                         

                        <Button
                          onClick={() => fn_modified(value.comment)}
                          className="button is-info"
                        >
                          수정
                        </Button> */}
                        </>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      작성자 : {value.name} | 작성일 :
                      {fn_date(value.created.seconds * 1000)}
                    </Col>
                  </Row>
 
                    
                    <Comment value = {value.comment}></Comment>
 
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
          <Modalpop setCreated={setCreated} setChanged={setChanged}></Modalpop>
        )}
      </>

      {contentList}
    </>
  );
}

export default ActiveExample;
