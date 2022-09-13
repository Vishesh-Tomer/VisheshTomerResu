import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.scss";
import { LOGIN } from "../../Service/auth";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailIsRequiredError, setEmailIsRequiredlError] = useState("Something went wrong!");
  const [emailValidError, setEmailValidError] = useState("Something went wrong!");
  const [password, setPassword] = useState("");
  const [passwordIsRequiredError, setPasswordIsRequiredlError] =useState(false);
 
  const handleEmailChange = (value) => {
    setEmail(value);
    const regex =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (value === "") {
      toast.error("Email is required!");
      setEmailValidError(false);
      setEmailIsRequiredlError(true);
    } else if (regex.test(value) === false) {
      setEmailValidError(true);
      setEmailIsRequiredlError(false);
    } else {
      setEmailValidError(false);
      setEmailIsRequiredlError(false);
    }
  };


  const handlePassword = (value) => {
    setPassword(value);
    if (value === "") {
      toast.error("Password is required!");
      setPasswordIsRequiredlError(true);
    } else {
      setPasswordIsRequiredlError(false);
    }
  };




  // const [values, setValues] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };
  const login = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      let requestData = {
        email: email,
        password: password,
      };
    const response = await LOGIN(requestData);
    console.log(response, "respoonse");
    if (response?.data.code===200) {
      history.push("/dashboard");
      localStorage.setItem("token", response?.data?.data?.tokens.refresh.token);
      localStorage.setItem(
        "resObj",
        JSON.stringify(response?.data?.data?.admin)
      );
      history.push("/dashboard");
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
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
                    type="email"
                    className="input-login-control mb-4"
                    placeholder="Email"
                    name="email"
                    value = {email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                  />
                   {emailIsRequiredError && (
                          <div className="invalid-feedback">
                            Email is required
                          </div>
                        )}
                        {emailValidError && (
                          <div className="invalid-feedback">
                            Please enter valid email
                          </div>
                        )}
                </Col>
                <Col xs="12">
                  <Form.Control
                    type="password"
                    className="input-login-control mb-4"
                    placeholder="Password"
                    name="password"
                    value = {password}
                    onChange={(e) => handlePassword(e.target.value)}
                  />
                        {passwordIsRequiredError && (
                          <div className="invalid-feedback">
                            Password is required
                          </div>
                        )}
                </Col>
                

                <Col xs="6">
                  <div className="forgot--txtlink text-end mb-5">
                    <span
                      className="link-forgot cursor-pointer"
                      onClick={() => {
                        history.push("/ForgetPassword");
                      }}
                    >
                      Forgot password?
                    </span>
                  </div>
                </Col>
                <Col xs="12">
                  <div className="login-login">
                    <button
                      type="submit"
                      className="btn btn-login cursor-pointer"
                    >
                      Login
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
export default Login;
