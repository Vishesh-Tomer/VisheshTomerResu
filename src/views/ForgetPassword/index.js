import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope } from "react-icons/fa";

import "./style.scss";
import { Forgetpas } from "../../Service/auth";

function ForgetPass() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [iserror, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [emailValidError, setEmailValidError] = useState(false);
  const [emailIsRequiredError, setEmailIsRequiredlError] = useState(false);

  const handleEmailChange = (value) => {
    setEmail(value);
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value === "") {
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

  const login = async (e) => {
    e.preventDefault();
    if (email === "" || !email) {
      setEmailIsRequiredlError(true);
    }
    if (email !== "") {
      let requestData = {
        email: email,
      };
      const response = await Forgetpas(requestData);
      console.log(response, "respoonse");
      if (response?.data.code !== 200) {
        setError(response?.data?.message);
        setIsError(true);
        setTimeout(() => {
          setError("");
          setIsError(false);
        }, 5000);
      } else {
        setIsError(false);
        history.push("/dashboard");
        localStorage.setItem("token", response?.data?.data?.token);
        localStorage.setItem("resOb",JSON.stringify(response?.data?.user_info)
        );
        toast.success(response?.data?.message);
      }
    } 
  };

  return (
    <>
      <div className="main-wrapper-login">
        <div className="Login-wrapper">
          <div className="forgt-txt-head text-center mb-5">
            <h1>Forgot Password</h1>
            <p>
              Please enter your email address. We will send you an email to
              recover your password.
            </p>
          </div>
          <div className="loginbody--form">
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
                        ? "form-control is-invalid "
                        : "input-login-control mb-1"
                    }
                  ></div>
                  <div className="form-group mb-1">
                    <Form.Control
                      className="input-login-control mb-1"
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
                  <div className="login-login">
                    <button type="submit" className="btn btn-login mt-3">
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
export default ForgetPass;
