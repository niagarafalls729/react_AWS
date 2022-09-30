import React from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
// 파이어베이서 파일에서 import 해온 db
import { db } from "../FireBase/DBconfig";
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

import { useState, useEffect, useId, useRef } from "react";

export default function ModalCRUD({setCreated,setChanged}) {


  const createdTitleRef = useRef();

  const createdContentRef = useRef();

  const createdNameRef = useRef();
  const createdPassRef = useRef();
  async function fn_created() {
    // getDocs로 컬렉션안에 데이터 가져오기

    //console.log("data:::"+JSON.stringify(data))
    // users에 data안의 자료 추가. 객체에 id 덮어씌우는거

    const usersCollectionRef = collection(db, "guestbook");
    const q = query(
      collection(db, "guestbook"),
      orderBy("comment", "desc"),
      limit(1)
    );
    const data2 = await getDocs(q);

    const maxnum = data2.docs.map((findDoc) => ({
      ...findDoc.data(),
      id: findDoc.id,
    }));

    console.log("save시도");

    await addDoc(usersCollectionRef, {
      title: createdTitleRef.current.value,
      content: createdContentRef.current.value,
      name: createdNameRef.current.value,
      created: new Date(),
      comment: maxnum[0].comment + 1,
      password : createdPassRef.current.value,
    }); 
    setCreated(false)
    setChanged(true)
  }

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Form.Control
          id="inlineFormInput"
          ref={createdTitleRef}
          placeholder="제목"
          maxLength="40"
        />
      </Modal.Header>

      <Modal.Body>
        <Form.Control
          as="textarea"
          ref={createdContentRef}
          rows={5}
          maxLength="200"
          placeholder="내용"
        />
      </Modal.Body>

      <Modal.Footer>
        <Col>
          <Form.Control
            id="inlineFormInput"
            ref={createdNameRef}
            maxLength="20"
            placeholder="작성자"
          />
        </Col>
        <Col>
          <Form.Control
            id="inlineFormInput"
            ref={createdPassRef}
            maxLength="20"
            placeholder="비밀번호"
          />
        </Col>        
        <Button variant="primary" onClick={() => fn_created()}>
          등록 >___@{" "}
        </Button>
        <Button variant="secondary" onClick={()=>setCreated(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}
