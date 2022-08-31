import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import "./style.scss";
import { Forgetpas } from "../../Service/auth";

function ForgetPass() {
  const history = useHistory();

  const [values, setValues] = useState({
    email: "",
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
    //   await LOGIN(values).then((response)=>
    //   //console.log(response.data.data.token, "respni"),
    //     localStorage.setItem("Token" , response.data.data.token),
    //     //localStorage.setItem("Admin" , response.data.data.user_info),
    //    navigate('/manageuser')).catch((err)=>{
    //       console.log(err , "err")
    //   })
    const response = await Forgetpas(values);
    //   const [response] = await Promise.allSettled([LOGIN(values)])
    console.log(response, "respoonse");
    if (response?.data.admin) {
      history.push("/login");
      localStorage.setItem("token", response?.data?.data?.token);
      localStorage.setItem(
        "resObj",
        JSON.stringify(response?.data?.user_info)
      );
      window.location.reload();
      history.push("/login");
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
    //   return
    // console.log(localStorage.getItem('resObj'), 'localStorage')
  };

  return (
    <>
      <div className="main-wrapper-login">
        <div className="Login-wrapper">
        <div className="forgt-txt-head text-center mb-5">
            <h1>Forgot Password</h1>
            <p>Please enter your email address. We will send you an email to recover your password.</p>
          </div>
          <div className="loginbody--form">
            <Form onSubmit={login}>
              <Row>
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
                
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ForgetPass;
