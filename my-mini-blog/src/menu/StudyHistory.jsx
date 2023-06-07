import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 컴포넌트가 마운트되면 Ajax 요청을 보냅니다.
    axios.get("http://localhost:4000/login")
      .then(response => {
        // 요청이 성공한 경우 데이터를 업데이트합니다.
        console.log(response.data)
        setData(response.data);
      })
      .catch(error => {
        // 요청이 실패한 경우 에러를 처리합니다.
        console.error("Error fetching data:", error);
      });
  }, []); // useEffect를 빈 배열로 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 합니다.
  return (
    <div>
      <h1>이 게시판의 글은 oracle 클라우드의 자율운영 데이터베이스 로 사용</h1>
      {data ? (
       data[0].map((item, idx) => (
          <div key={idx}>
            <div>ID: {item.id}</div>
            <div>Title: {item.title}</div>
            <div>Content: {item.content}</div>
            <div>Date: {item.date}</div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
