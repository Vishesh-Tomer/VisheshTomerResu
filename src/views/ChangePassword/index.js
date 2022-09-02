import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.scss";
import { ChangePas } from "../../Service/auth";

function ChangePass() {
  const history = useHistory();

  const [values, setValues] = useState({
    password : "",
    oldPassword : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const login = async (e) => {
    e.preventDefault();
    
    const response = await ChangePas(values);
    console.log(response, "respoonse");
    if (response?.data.code===200) {
      localStorage.setItem("token", response?.data?.data?.token);
      localStorage.setItem(
        "resObj",
        JSON.stringify(response?.data?.user_info)
      );
      window.location.reload();
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
  };

  return (
    <>
      <div className="main-wrapper-login">
        <div className="Login-wrapper">
        <div className="forgt-txt-head text-center mb-5">
            <h1>Change Password</h1>
            <p>Please enter your New Password And Old Password.</p>
          </div>
          <div className="loginbody--form">
            <Form onSubmit={login}>
              <Row>
              <Col xs="12">
                  <Form.Control
                    type="password"
                    className="input-login-control mb-4"
                    placeholder="New Password"
                    name="password"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="password"
                    className="input-login-control mb-4"
                    placeholder="Old Password"
                    name="old Password"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="12">
                  <div className="login-login">
                    <button type="submit" className="btn btn-login">
                      Continue
                    </button>
                  </div>
                </Col>
                
                <Col xs="12">
                  <div className="login-back-btn text-center mt-5">
                    {" "}
                    <p>Back To Login </p>{" "}
                    <a
                      href="#"
                      className="btn btn-login-back"
                      onClick={() => {
                        history.push("/login");
                      }}
                    >
                      Click Here
                    </a>
                  </div>
                </Col>
                <ToastContainer />     
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChangePass;
