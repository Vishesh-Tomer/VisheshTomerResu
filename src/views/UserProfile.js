import React, { useEffect, useState } from "react";
import { getAdmin } from "Service/auth";
import { useHistory } from "react-router-dom";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function User() {
  const history = useHistory();
  const [adminInfo, setAdminInfo] = useState({});
  const resobject = JSON.parse(localStorage.getItem('resObj'))
  const id = resobject.id
  console.log(id)
  useEffect(() => {
    const getData = async () => {
      const response = await getAdmin({ id });
      console.log("getAdmin", response);
        setAdminInfo(response?.data);
        
    };
    getData();
  }, [id]);
  console.log("setAdminInfo",adminInfo);


  return (
    <> 
      <Container pt-3>
        <Row>
          <Col >
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h3 className="title">Admin Name  :-  {adminInfo.name}</h3>
                  </a>
                  <p></p>
                  <p className="description">Admin Email :-  {adminInfo.email}</p>
                </div>
                <p className="description text-center">
                Admin Type  :-   {adminInfo.type}
                </p>
              </Card.Body>
              <Row>
              <Col  style={{textAlign : 'center'}} xs="2">
                  <div className="login-login">
                    <button
                      className="btn btn-login cursor-pointer"
                      onClick={() => {
                        history.push("/updateadmin");
                      }}
                    >
                      Update Profile
                    </button>
                  </div>
                </Col>
                </Row>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
