import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope } from "react-icons/fa";

import "./style.scss";
import { LOGIN } from "../../Service/auth";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter valid email";
  }
  if (!values.password) {
    errors.password = "Please enter the Password";
  }
  return errors;
};

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [emailIsRequiredError, setEmailIsRequiredlError] = useState("");
  const [emailValidError, setEmailValidError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsRequiredError, setPasswordIsRequiredlError] =
    useState(false);
  const [iserror, setIsError] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
    const regex = /^[A-Za-z0-2._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
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

  const handlePassword = (value) => {
    setPassword(value);
    if (value === "") {
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
      if (response?.data.code !== 200) {
        setError(response.data.message);
        setIsError(true);
        setTimeout(() => {
          setError("");
          setIsError(false);
        }, 5000);
      } else {
        setIsError(false);
        history.push("/dashboard");
        localStorage.setItem(
          "token",
          response?.data?.data?.tokens.refresh.token
        );
        localStorage.setItem(
          "resObj",
          JSON.stringify(response?.data?.data?.admin)
        );
        history.push("/dashboard");
        toast.success(response?.data?.message);
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
                  {iserror ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : null}
                  <Form.Control
                    className={
                      emailIsRequiredError
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="exampleInputtext"
                    aria-describedby="textHelp"
                    type="email" 
                    placeholder="Email"
                    name="email"
                    onChange={(e) => handleEmailChange(e.target.value)}
                  ></Form.Control>
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
                  <Form.Control
                  className={
                      emailIsRequiredError
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    id="exampleInputtext"
                    aria-describedby="textHelp"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handlePassword(e.target.value)}
                  />
                  {passwordIsRequiredError && (
                    <div className="invalid-feedback">Password is required</div>
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
      {/* <div className="col-md-6">
                    <form onSubmit={login}>
                      <h4>LogIn with Email/Password</h4>
                      <div className="login_with_pass">
                        {iserror ? (
                          <div className="alert alert-danger">{error}</div>
                        ) : null}
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            onChange={(e) => handleEmailChange(e.target.value)}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Email Address"
                            required
                          />
                          <span>
                            <FaEnvelope />
                          </span>
                        </div>
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
                        <div className="form-group">
                          <input
                            type="password"
                            onChange={(e) => handlePassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            required
                          />
                        </div>
                        {passwordIsRequiredError && (
                          <div className="invalid-feedback">
                            Password is required
                          </div>
                        )}
                        <div className="forgot-password">
                          <Link to="/guard/forgot-password">
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="loginBtn">
                          <button
                            type="submit"
                          >
                          </button>
                          {/* <LoginForm onSubmit={props => this.doLogin(props)} {...this.props} loading={this.state.loading} passwordType={this.state.passwordType} toggleShowPassword={this.toggleShowPassword.bind(this)} /> */}
      {/* </div>
                      </div>
                    </form>
                  </div> */}
    </>
  );
}
export default Login;
