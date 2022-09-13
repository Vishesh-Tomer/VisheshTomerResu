import React, { useState,useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.scss";
import { updateAdmin } from "../../Service/auth";


function Register() {
  const history = useHistory();
  const profileData = JSON.parse(localStorage.getItem('resObj'))
  console.log("profilr",profileData)
  const [name, setFirstName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);
  const [phone, setPhone] = useState(profileData.phone);
  const [type, setType] = useState(profileData.type);
  

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      toast.warning(
        "your session has been expired ...kindly login again.",
        "yellow"
      );
      history.push(`/login`);
    }
  }, []);

  const handleName = (value) => {
    setFirstName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleMobileChange = (value) => {
    setPhone(value);
  };

  const handleTypeChange = (value) => {
    setType(value);

  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

   
      const data = {
        name: name,
        email: email,
        phone: phone,
        type: type
      }
      const response = await updateAdmin(profileData.id , data)
        console.log("data",response);
        if (response.data.code === 200) {
          localStorage.setItem('resObj', JSON.stringify(response?.data?.data))
          toast.success("Updated Successfully");
          history.push(`/admin/adminprofile`);
          
        } else {
          toast.error("Something went wrong!");
        }
    
  };

   return (
    <>
      <div className="main-wrapper-login">
        <div className="Login-wrapper">
          <div className="loginbody--form">
            <Form>
              <Row>
              <Col xs="12">
                  <Form.Control
                    type="text"
                    className="input-login-control mb-4"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => handleName(e.target.value)}
                  />
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="email"
                    className="input-login-control mb-4"
                    placeholder="Email"
                
                    onChange={(e) => handleEmailChange(e.target.value)}
                    value={email}
                  />
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="number"
                    className="input-login-control mb-4"
                    placeholder="Phone Number"
          
                    onChange={(e) => handleMobileChange(e.target.value)}
                    value={phone}
                  />
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="text"
                    className="input-login-control mb-4"
                    placeholder="Admin type"
          
                    value={type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                  />
                </Col>
                

                <Col xs="6">
                  <div className="forgot--txtlink text-end mb-5">
                    <span
                      className="link-forgot cursor-pointer"
                      onClick={() => {
                        history.push("/admin/adminprofile");
                      }}
                    >
                      Click here to Back
                    </span>
                  </div>
                </Col>
                <Col xs="12">
                  <div className="login-login">
                    <button
                      type="submit"
                      className="btn btn-login cursor-pointer"
                      onClick={(e) => handleUpdateProfile(e)}
                    >
                      Update Now
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
