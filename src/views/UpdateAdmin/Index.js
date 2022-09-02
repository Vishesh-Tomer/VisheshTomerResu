import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.scss";
import { Registe } from "../../Service/auth";

function Register() {
  const history = useHistory();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
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
    
    const response = await Registe(values);
   
    console.log(response, "respoonse");
    if (response?.data.code === 200) {
      history.push("/login");
      localStorage.setItem("token", response?.data?.data?.token);
      localStorage.setItem(
        "resObj",
        JSON.stringify(response?.data?.user_info)
      );
      history.push("/login");
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
  };

  return (
    <>
      <div className="main-wrapper-login">
        <div className="Login-wrapper">
          <div className="loginbody--form">
            <Form onSubmit={login}>
              <Row>
              <Col xs="12">
                  <Form.Control
                    type="text"
                    className="input-login-control mb-4"
                    placeholder="Enter Your Name"
                    name="name"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="email"
                    className="input-login-control mb-4"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="number"
                    className="input-login-control mb-4"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="password"
                    className="input-login-control mb-4"
                    placeholder="Password"
                    name="type"
                    onChange={handleChange}
                  />
                </Col>
                

                <Col xs="6">
                  <div className="forgot--txtlink text-end mb-5">
                    <span
                      className="link-forgot cursor-pointer"
                      onClick={() => {
                        history.push("/login");
                      }}
                    >
                      Click here to Login
                    </span>
                  </div>
                </Col>
                <Col xs="12">
                  <div className="login-login">
                    <button
                      type="submit"
                      className="btn btn-login cursor-pointer"
                    >
                      Register Now
                    </button>
                    <ToastContainer />
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
