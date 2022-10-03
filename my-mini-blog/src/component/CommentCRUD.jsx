import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useRef, useState ,useId} from "react";
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
function Comment(props) {
  // 이 페이지 기준에서는 전역변수로 받아오기에 이렇게만해도 작동됨

  const comment_val = useRef();

  const capcha =useRef();
  
  const uniqueId = useId();

  const  random= Math.floor(Math.random() * 3*1000)
  const fn_randomNumCreaated = (
      <Form.Label column sm={1} style={{ paddingLeft: "10px" }} key={uniqueId}>
          {random}
      </Form.Label>
  )

  function fn_created_comment() {
  
    console.log("em"+random+"?///"+capcha.current.value)


  }

  return (
    <>
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
        />

        <div class="input-group input-group-sm">
          <Col xs="2">
           {fn_randomNumCreaated}
          </Col>
          <Col xs="3">
            <input
              maxlength="10"
              placeholder="왼쪽번호입력!"
              class="form-control"
              ref={capcha}
            />
          </Col>
          <Col xs="3">
            <input maxlength="10" placeholder="작성자" class="form-control" />
          </Col>
          <Col xs="2">
            <input maxlength="10" placeholder="비밀번호" class="form-control" />
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
