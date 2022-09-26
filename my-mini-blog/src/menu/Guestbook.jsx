import ListGroup from "react-bootstrap/ListGroup";
import { useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

function ActiveExample() {
  const mo = useRef([]);
  const [choiceState, SetChoiceState] = useState(false);

  function fn_mouseOver(key) {
    //이건 마우스 위로 올렸을때 효과주기 연습.
    key.target.style.background = "blue";
    key.target.style.color = "white";
  }

  function fn_mouseLeave(key) {
    key.target.style.background = "white";
    key.target.style.color = "black";
  }
  function fn_click() {
    // 게시글 선택
    SetChoiceState(true);
    console.log("fn_click");
  }
  function contentList() {
    return (
      <Table striped bordered hover variant="dark" >
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th></th>
            <th>시간</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td></td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td></td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td></td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  function choiceContent() {
    return (
      <div>
        <h1>게시글</h1>
      </div>
    );
  }
  return (
    <>
      {choiceState && <div>{choiceContent()}</div>}
      {contentList()}
    </>
  );
}

export default ActiveExample;
