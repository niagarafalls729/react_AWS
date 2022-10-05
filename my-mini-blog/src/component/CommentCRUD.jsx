import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useRef, useState, useId, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";

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


  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      const q = query(
        collection(db, "comment"),
        //where("guestbook_key", "==", props.value),
        orderBy("comment_key","asc") ,
        
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
    if ( content.current.value == ""
      || name.current.value == ""
      || pw.current.value == "" ){

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

    // console.log("save시도"+maxnum[0].comment_key);
    console.log(content.current.value)
    console.log(name.current.value)
    console.log(pw.current.value)

    await addDoc(usersCollectionRef, {
      comment_key: maxnum[0].comment_key + 1,
      content: content.current.value,
      name: name.current.value,
      created: new Date(),
      guestbook_key: props.value,
      password: pw.current.value,
    });
    change ? setChange(false) : setChange(true)
     
  }

  return (
    <>
      {users.map((value) => ( value.guestbook_key == props.value) && <h5>댓글 : {value.content}</h5>)}

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
            <input ref={name} maxLength="10" placeholder="작성자" class="form-control" />
          </Col>
          <Col xs="2">
            <input ref={pw} maxLength="10" placeholder="비밀번호" class="form-control" />
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
