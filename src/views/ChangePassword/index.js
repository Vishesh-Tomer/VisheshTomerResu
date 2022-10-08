import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaAngleRight,
  FaFacebookF,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "./style.scss";
import { ChangePas } from "../../Service/auth";

function ChangePass() {
  const history = useHistory();
  const id = JSON.parse(localStorage.getItem("resObj")).id
  const [oldPassword, setoldpassword] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordIsRequiredError, setPasswordIsRequiredError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [oldPasswordIsRequiredError, setOldPasswordIsRequiredError] =
    useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordIsRequiredError, setNewPasswordIsRequiredError] =
    useState(false);
  
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowCnfPassword, setIsShowCnfPassword] = useState(false);
  const [iserror, setIsError] = useState(false);
  const [error, setError] = useState("");

  const handleOldPass = (value) => {
          setoldpassword(value);
    if (value === "") {
      setOldPasswordIsRequiredError(true);
    } else {
      setOldPasswordIsRequiredError(false);
    }
  };
  

  const handleNewPass = (value) => {
    setPassword(value);
    const regex =/^(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (value === "") {
      setPasswordIsRequiredError(true);
      setPasswordError(false);
    }else if (regex.test(value) === false) {
      setPasswordError(true);
      setPasswordIsRequiredError(false);
    }else {
      setPasswordError(false);
      setPasswordIsRequiredError(false);
    }
  };

  const handlePassword = async () => {
    if (oldPassword === "" || password === "") {
      setOldPasswordIsRequiredError(true);
      setPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }

    if (confirmPasswordError) {
      setConfirmPasswordError(true);
      return;
    }

    const requestedData = {
      oldPassword: oldPassword,
      password: password,
    };

    const response = await ChangePas(requestedData, id);
    console.log("handlePassword response",response);
    if (response?.data?.code === 200) {
      history.push("/login");
      toast.success("Password changed successfully");
    } else {
      toast.error("Something Went wrong!");
    }
  };

  const handleConfirmPass = (value) => {
    if ( value !== password ) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPassword(value);
      setConfirmPasswordError(false);
    }
  };

  const handleOldPassword = (event, type) => {
    event.preventDefault();
    if (type === "show") {
      setIsShowOldPassword(true);
    } else {
      setIsShowOldPassword(false);
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

  const handleShowCnfPassword = (event, type) => {
    event.preventDefault();
    if (type === "show") {
      setIsShowCnfPassword(true);
    } else {
      setIsShowCnfPassword(false);
    }
  };

  return (
    <>
      <div className="main-wrapper-login">
        <div className="Login-wrapper">
          <div className="forgt-txt-head text-center mb-5">
            <h1>Change Password</h1>
            <p>Please enter your old password and new password</p>
          </div>
          <div className="loginbody--form">
            <Form>
              <Row>
                <Col xs="12">
                  <div className="alertOuter mt-3">
                    <div className="form-group">
                      <input
                      name="oldpassword"
                        onChange={(event) => handleOldPass(event.target.value)}
                        type={!isShowOldPassword ? "password" : "text"}
                        className="form-control"
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder="Old Password"
                      />
                      <span>
                        {!isShowOldPassword ? (
                          <FaEye
                            onClick={(e) => handleOldPassword(e, "show")}
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={(e) => handleOldPassword(e, "hide")}
                          />
                        )}
                      </span>
                    </div>
                    {oldPasswordIsRequiredError ? (
                      <div className="invalid-feedback">
                        Old Password is required
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="form-group">
                      <input
                      name="password"
                        onChange={(event) => handleNewPass(event.target.value)}
                        type={!isShowPassword ? "password" : "text"}
                        className="form-control"
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder="New Password"
                      />
                      <span>
                        {!isShowPassword ? (
                          <FaEye
                            onClick={(e) => handleShowPassword(e, "show")}
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={(e) => handleShowPassword(e, "hide")}
                          />
                        )}
                      </span>
                    </div>
                    {passwordError ? (
                      <div className="invalid-feedback">
                        Password at least 8 characters in length.
                        <br />
                        Lowercase letters (a-z)
                        <br />
                        Uppercase letters (A-Z)
                        <br />
                        Numbers (0-9)
                        <br />
                        Special characters ($@$!%*?&) <br />
                      </div>
                    ) : (
                      ""
                    )}
                    {passwordIsRequiredError ? (
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="form-group">
                      <input
                        onChange={(event) =>
                          handleConfirmPass(event.target.value)
                        }
                        type={!isShowCnfPassword ? "password" : "text"}
                        className="form-control"
                        name="conferm password"
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder="Confirm Password"
                      />
                      <span>
                        {!isShowCnfPassword ? (
                          <FaEye
                            onClick={(e) => handleShowCnfPassword(e, "show")}
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={(e) => handleShowCnfPassword(e, "hide")}
                          />
                        )}
                      </span>
                    </div>
                    {confirmPasswordError ? (
                      <div className="invalid-feedback">Password mismatch</div>
                    ) : (
                      ""
                    )}
                    {confirmPasswordIsRequiredError ? (
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    ) : (
                      ""
                    )}
                    <Col xs="12">
                      <div className="login-login">
                        <a
                          type="submit"
                          className="btn btn-login mt-3"
                          onClick={handlePassword}
                        >
                          Submit
                        </a>
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
export default ChangePass;
