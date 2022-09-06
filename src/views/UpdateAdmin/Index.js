import React, { useState,useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.scss";
import { updateAdmin, getAdmin } from "../../Service/auth";


function Register() {
  const history = useHistory();

  const [adminInfo, setAdminInfo] = useState({});

  const resobject = JSON.parse(localStorage.getItem('resObj'))
  const id = resobject.id
  console.log(id)
  useEffect(() => {
    const getData = async () => {
      const respons = await getAdmin({ id });
      // console.log("getAdmin", response);
        setAdminInfo(respons?.data);
        
    };
    getData();
  }, [id]);
  // console.log("setAdminInfo",adminInfo);



  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
  });

  // const { name, email,  } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const login = async (e) => {
    e.preventDefault();
    
    const response = await updateAdmin(adminInfo);
   
    console.log(response, "respoonse");
    if (response?.data?.code === 200) {
      localStorage.setItem("token", response?.data?.data?.tokens.refresh.token);
      localStorage.setItem(
        "resObj",
        JSON.stringify(response?.data)
      );
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
    console.log(response, "respoonse");
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
                    value={adminInfo.name}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="email"
                    className="input-login-control mb-4"
                    placeholder="Email"
                    name="email"
                    value={adminInfo.email}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="number"
                    className="input-login-control mb-4"
                    placeholder="Phone Number"
                    name="phone"
                    value={adminInfo.phone}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="text"
                    className="input-login-control mb-4"
                    placeholder="Admin type"
                    name="type"
                    value={adminInfo.type}
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
                      Update\ Now
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
