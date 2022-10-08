import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa";

import "./style.scss";
import { Registe } from "../../Service/auth";

function Register() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailValidError, setEmailValidError] = useState(false);
  const [emailIsRequiredError, setEmailIsRequiredlError] = useState(false);

  // Name UseState
  const [name, setName] = useState("");
  const [nameValidError, setnameValidError] = useState(false);
  const [nameIsRequiredError, setnameIsRequiredlError] = useState(false);

  // Password UseState
  const [password, setPassword] = useState("");
  const [passwordIsRequiredError, setPasswordIsRequiredlError] =
    useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  //  Handle Email
  const handleEmailChange = (value) => {
    setEmail(value);
    const rex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
    if (value === "") {
      setEmailValidError(false);
      setEmailIsRequiredlError(true);
    } else if (rex.test(value) === false) {
      setEmailValidError(true);
      setEmailIsRequiredlError(false);
    } else {
      setEmailValidError(false);
      setEmailIsRequiredlError(false);
    }
  };

  // Handle Name
  const handleNameChange = (value) => {
    setName(value);
    const regex = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    if (value === "") {
      setnameValidError(false);
      setnameIsRequiredlError(true);
    } else if (regex.test(value) === false) {
      setnameValidError(true);
      setnameIsRequiredlError(false);
    } else {
      setnameValidError(false);
      setnameIsRequiredlError(false);
    }
  };

  // Handle Password
  const handlePassword = (value) => {
    setPassword(value);
    const regex =
      /^(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (value === "") {
      setPasswordError(false);
      setPasswordIsRequiredlError(true);
    } else if (regex.test(value) === false) {
      setPasswordError(true);
      setPasswordIsRequiredlError(false);
    } else {
      setPasswordError(false);
      setPasswordIsRequiredlError(false);
    }
  };

  const handleShowPassword = (event, type) => {
    event.preventDefault();
    if (type === "show") {
      setIsShowPassword(true);
    } else {
      setIsShowPassword(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (email === "" || !email) {
      setEmailIsRequiredlError(true);
    }
    if (password === "" || !password) {
      setPasswordIsRequiredlError(true);
    }
    if (name === "" || !name) {
      setnameIsRequiredlError(true);
    }

    if (email !== "" && password !== "" && name !== "") {
      let requestData = {
        email: email,
        password: password,
        name: name,
      };
      const response = await Registe(requestData);
      console.log(response, "respoonse");
      if (response?.data.user?.code === 200) {
        localStorage.setItem(
          "token",
          response?.data?.data?.tokens.refresh.token
        );
        localStorage.setItem(
          "resObj",
          JSON.stringify(response?.data?.user?.data)
        );
        toast.success(response?.data?.user?.message);
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
                <Col className="mt-3" xs="12">
                  <h6>
                    {" "}
                    <label> Full Name</label>{" "}
                  </h6>
                  <Form.Control
                    type="text"
                    name="name"
                    maxLength="40"
                    value={name}
                    id="exampleInputtext"
                    aria-describedby="textHelp"
                    onChange={(e) => handleNameChange(e.target.value)}
                  />

                  {nameIsRequiredError && (
                    <div className="invalid-feedback mt-0">
                      Name is required
                    </div>
                  )}
                  {nameValidError && (
                    <div className="invalid-feedback mt-0">
                    Please enter your full name (first & last name).
                    </div>
                  )}
                </Col>
                <Col className="mt-3" xs="12">
                  <h6>
                    {" "}
                    <label>Email</label>{" "}
                  </h6>
                  <div className="form-group mb-1">
                    <Form.Control
                      id="exampleInputtext"
                      aria-describedby="textHelp"
                      maxLength="40"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                    />
                    <span>
                      <FaEnvelope />
                    </span>
                  </div>
                  {emailIsRequiredError && (
                    <div className="invalid-feedback mt-1">
                      Email is required
                    </div>
                  )}
                  {emailValidError && (
                    <div className="invalid-feedback mt-1 mt-1">
                      Please enter valid email
                    </div>
                  )}
                </Col>
                <Col className="mt-3" xs="12">
                  <h6>
                    {" "}
                    <label>Password</label>{" "}
                  </h6>
                  <div className="form-group mb-1">
                    <Form.Control
                      type={!isShowPassword ? "password" : "text"}
                      className="input-login-control mb-1"
                      id="exampleInputtext"
                      aria-describedby="textHelp"
                      placeholder="Password"
                      maxLength="40"
                      name="password"
                      value={password}
                      onChange={(e) => handlePassword(e.target.value)}
                    />
                    <span>
                      {!isShowPassword ? (
                        <FaEye onClick={(e) => handleShowPassword(e, "show")} />
                      ) : (
                        <FaEyeSlash
                          onClick={(e) => handleShowPassword(e, "hide")}
                        />
                      )}
                    </span>
                  </div>
                  {passwordIsRequiredError && (
                    <div className="invalid-feedback mt-1">
                      Password is required
                    </div>
                  )}
                  {passworderror && (
                    <div className="invalid-feedback mt-1">
                      Please enter valid<br></br>
                      *Password Minimum eight characters <br></br>
                      *at least one uppercase letter [A-Z] <br></br>
                      *one lowercase letter [a-z]<br></br>
                      *one number [0-8] <br></br>
                      *and one special character [! @ # # $ % ^ & *]
                      <br></br>
                    </div>
                  )}
                </Col>

                <Col className="mt-3" xs="6">
                  <div className="forgot--txtlink text-end mb-5">
                    <span
                      href="#"
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
