import React from "react";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useRef, useState, useId, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import "./CommentCRUD.css";
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
import { db } from "../FireBase/DBconfig";
function Comment(props) {
  // 이 페이지 기준에서는 전역변수로 받아오기에 이렇게만해도 작동됨

  const content = useRef();
  const name = useRef();
  const pw = useRef(); 
  const capcha = useRef();
  const uniqueId = useId();

  const random = Math.floor(Math.random() * 3 * 1000);
  const fn_randomNumCreaated = (
    <Form.Label column sm={1} style={{ paddingLeft: "10px" }} key={uniqueId}>
      {random}
    </Form.Label>
  );

  const [users, setUsers] = useState([]);
  const [change, setChange] = useState(false);
  const [checkPW, setCheckPW] = useState();
  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      const q = query(
        collection(db, "comment"),
        //where("guestbook_key", "==", props.value),
        orderBy("comment_key", "asc")
      );
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(q);
      //console.log("data:::"+JSON.stringify(data))
      // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
      setUsers(
        data.docs.map((findDoc) => ({ ...findDoc.data(), id: findDoc.id }))
      );

      // users.map((value) => console.log(value.content));
    };
    getUsers();
    //}, [change]);
  }, [change]);

  const [user, setUser] = useState();

  async function fn_created_comment() {
    console.log("em" + random + "?///" + capcha.current.value);
    if (random != capcha.current.value) {
      return alert("자동입력방지 번호가 틀렸습니다.!");
    }
    if (
      content.current.value == "" ||
      name.current.value == "" ||
      pw.current.value == ""
    ) {
      return alert("내용, 작성자 ,비밀번호 모두 필수값임! ");
    }

    const usersCollectionRef = collection(db, "comment");
    const q = query(
      collection(db, "comment"),
      orderBy("comment_key", "desc"),
      limit(1)
    );
    const data2 = await getDocs(q);

    const maxnum = data2.docs.map((findDoc) => ({
      ...findDoc.data(),
      id: findDoc.id,
    }));

    await addDoc(usersCollectionRef, {
      comment_key: maxnum[0].comment_key + 1,
      content: content.current.value,
      name: name.current.value,
      created: new Date(),
      guestbook_key: props.value,
      password: pw.current.value,
    });
    content.current.value = "";
    name.current.value = "";
    capcha.current.value = "";
    pw.current.value = "";

    change ? setChange(false) : setChange(true);
  }

  function fn_date(inputDate) {
    const date = new Date(+inputDate + 3240 * 10000)
      .toISOString()
      .split("T")[0];

    return date;
  }

 

  async function fn_delete(key,password) {
    
    console.log("password"+password) 

    if(checkPW != password){
      
      return alert("댓글 비밀번호가 다름!")
    }
    setCheckPW("");

    const q = query(collection(db, "comment"), where("comment_key", "==", key));
    const querySnapshot = await getDocs(q);
    let docID = "";
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });
    const guestmodified = doc(db, "comment", docID);
    await deleteDoc(guestmodified);
    change ? setChange(false) : setChange(true);
  }

  return (
    <>
      {users.map(
        (value) =>
          value.guestbook_key == props.value && (
            <div
              className="input-group input-group-sm"
              style={{ borderTop: "1px solid" }}
            >
              <Col>
                <h5>
                  {value.name} : {value.content}
                </h5>
              </Col>
              <Col xs="3">
                <InputGroup size="sm">
                <h5 style={{marginRight:"10px"}}>작성일 : {fn_date(value.created.seconds * 1000)} </h5>
                
                <Form.Control
                  maxLength="10"
                  placeholder="댓글 비밀번호"
                  className="inputSize" 
                  onChange={(e)=>setCheckPW(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={(e) => fn_delete(value.comment_key,value.password)}
                >
                  삭제
                </Button>
                </InputGroup>
              </Col>
            </div>
          )
      )}

      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          ref={content}
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
        />

        <div className="input-group input-group-sm">
          <Col xs="2">{fn_randomNumCreaated}</Col>
          <Col xs="2">
            <input
              maxLength="10"
              placeholder="왼쪽번호입력!"
              class="form-control"
              ref={capcha}
            />
          </Col>
          <Col xs="4">
            <input
              ref={name}
              maxLength="10"
              placeholder="작성자"
              class="form-control"
            />
          </Col>
          <Col xs="2">
            <input
              ref={pw}
              maxLength="10"
              placeholder="비밀번호"
              class="form-control"
            />
          </Col>
          <Col>
            <button
              type="button"
              class="btn btn-outline-secondary"
              onClick={() => fn_created_comment()}
              style={{ width: "100%" }}
            >
              등록
            </button>
          </Col>
        </div>
      </FloatingLabel>
    </>
  );
}

export default Comment;
