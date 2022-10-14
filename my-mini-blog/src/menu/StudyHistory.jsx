import React from "react";
import Modalpop from "../component/ModalCRUD";
import { useState, useEffect, useId, useRef } from "react";
import sun from "../icon/sun.png";
import pencil from "../icon/pencil.png";
import {
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

function Tabs() {
  
  return (
    <div className="section section-tabs">
      <Container>
        <div className="title">
          <h3 className="mb-3">공부일지</h3>
        </div>
        <Row>
          {/* 이거 반복하면 늘어남 */}
          <Col className="ml-auto mr-auto" md="10" xl="6">
            <div className="mb-3">
              <small className="text-uppercase font-weight-bold">
                글 제목 1
              </small>
            </div>
            <Card>
              <button
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <CardBody>
                  <TabContent className="tab-space">
                    <TabPane>
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={sun}
                      ></img>
                      <p>
                        글 내용 내용내용 내용내용 내용내용 내용내용 내용내용
                        내용내용 내용내용 내용내용 내용내용 내용내용 내용 .
                      </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default function StudyHistory() {
  const [createdBTN, setCreatedBTN] = useState(false);

  return (
    <div style={{ display: "inline-block" }}>
      <Tabs></Tabs>
      <div style={{ float: "right" }}>
        <button
          style={{ backgroundColor: "transparent", border: "none" ,width: "100px"}}
          onClick={() =>
            createdBTN ? setCreatedBTN(false) : setCreatedBTN(true)
          }
        >
          <img style={{ width: "100px", height: "100px" }} src={pencil}></img>
        </button>
      </div>
      {createdBTN && <Modalpop></Modalpop>}
    </div>
  );
}
