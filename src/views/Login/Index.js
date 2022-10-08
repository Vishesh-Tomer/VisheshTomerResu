import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaEyeSlash, FaEye } from "react-icons/fa";

import "./style.scss";
import { LOGIN } from "../../Service/auth";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsRequiredError, setPasswordIsRequiredlError] =
    useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [iserror, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [toatError, settoatError] = useState(false);
  const [emailValidError, setEmailValidError] = useState(false);
  const [emailIsRequiredError, setEmailIsRequiredlError] = useState(false);

  const handleEmailChange = (value) => {
    setEmail(value);
    const rege = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
    if (value === "") {
      setEmailValidError(false);
      setEmailIsRequiredlError(true);
    } else if (rege.test(value) === false) {
      setEmailValidError(true);
      setEmailIsRequiredlError(false);
    } else {
      setEmailValidError(false);
      setEmailIsRequiredlError(false);
    }
  };

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
    if (email !== "" && password !== "") {
      let requestData = {
        email: email,
        password: password,
      };
      const response = await LOGIN(requestData);
      console.log(response, "respoonse");
      if (response?.data.code !== 200) {
        toast.error("Please Fill Correct Details");
        setError("Please Fill Correct credentials");
        setIsError(true);
        setTimeout(() => {
          setError("");
          setIsError(false);
        }, 5000);
      } else {
        toast.success("Logged In Successfully");
        setIsError(false);
        localStorage.setItem(
          "token",
          response?.data?.data?.tokens.refresh.token
        );
        localStorage.setItem(
          "resObj",
          JSON.stringify(response?.data?.data?.admin)
        );

        history.push("/admin/dashboard");
      }
    }
  };

  return (
    <>
      <div className="main-wrapper-login">
        <div className="Login-wrapper">
          <div className="loginbody--form">
            <div className="rna-container"></div>
            <Form onSubmit={login}>
              <Row>
                <Col xs="12">
                  {iserror ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : null}
                  <div
                    className={
                      emailValidError
                        ? "form-control is-invalid"
                        : "input-login-control mb-1"
                    }
                  ></div>
                  <div
                    className={
                      emailIsRequiredError
                        ? "form-control is-invalid"
                        : "input-login-control mb-1"
                    }
                  ></div>
                  <div className="form-group mb-1">
                    <Form.Control
                      className="input-login-control"
                      id="exampleInputtext"
                      aria-describedby="textHelp"
                      type="email"
                      maxLength="40"
                      placeholder="Email"
                      name="email"
                      onChange={(e) => handleEmailChange(e.target.value)}
                    ></Form.Control>
                    <span>
                      <FaEnvelope />
                    </span>
                  </div>
                  {emailIsRequiredError && (
                    <div className="invalid-feedback">Email is required</div>
                  )}
                  {emailValidError && (
                    <div className="invalid-feedback">
                      Please enter valid email
                    </div>
                  )}
                </Col>
                <Col xs="12">
                  <div
                    className={
                      passwordIsRequiredError
                        ? "form-control is-invalid"
                        : "input-login-control mb-1"
                    }
                  ></div>
                  <div
                    className={
                      passworderror
                        ? "form-control is-invalid"
                        : "input-login-control mb-1"
                    }
                  ></div>
                  <div className="form-group mb-1">
                    <Form.Control
                      type={!isShowPassword ? "password" : "text"}
                      className="input-login-control mb-1"
                      id="exampleInputtext"
                      aria-describedby="textHelp"
                      placeholder="Password"
                      name="password"
                      maxLength="40"
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
                    <div className="invalid-feedback">Password is required</div>
                  )}
                  {passworderror && (
                    <div className="invalid-feedback">
                      Please enter valid<br></br>
                      *Password Minimum eight characters <br></br>
                      *at least one uppercase letter [A-Z] <br></br>
                      *one lowercase letter [a-z]<br></br>
                      *one number [0-8] <br></br>
                      *and one special character [! @ # # $ % ^ & *]<br></br>
                    </div>
                  )}
                </Col>
                <Row>
                  <Col xs="6">
                    <div className="forgot--txtlink text-end mb-2">
                      <span
                        className="link-forgot cursor-pointer"
                        onClick={() => {
                          history.push("/ForgetPassword");
                        }}
                      >
                        <br></br>
                        Forgot password?
                      </span>
                    </div>
                    <br />
                  </Col>
                  <Col className="pope" mr="2">
                    <div className="forgot--txtlink text-end mb-2">
                      <span
                        className="link-forgot cursor-pointer"
                        onClick={() => {
                          history.push("/register");
                        }}
                      >
                        <br></br>
                        Register here?
                      </span>
                    </div>
                    <br />
                  </Col>
                  <Col xs="12">
                    <div className="forgot--txtlink text-end mb-2">
                      <span
                        className="link-forgot cursor-pointer"
                        onClick={() => {
                          history.push("/register");
                        }}
                      >
                        Change password?
                      </span>
                    </div>
                  </Col>
                </Row>

                <Col xs="12">
                  <div className="col-md-12">
                    <div className="notReg">
                      <Button
                        variant="default"
                        type="submit"
                        className="btn btn-login cursor-pointer"
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
}
export default Login;
