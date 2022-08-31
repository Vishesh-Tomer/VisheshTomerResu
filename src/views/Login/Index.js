import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Dashboard from "views/Dashboard";

import "./style.scss";
import { LOGIN } from "../../Service/auth";

function Login() {
  const history = useHistory();

  const [values, setValues] = useState({
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
    //   await LOGIN(values).then((response)=>
    //   //console.log(response.data.data.token, "respni"),
    //     localStorage.setItem("Token" , response.data.data.token),
    //     //localStorage.setItem("Admin" , response.data.data.user_info),
    //    navigate('/manageuser')).catch((err)=>{
    //       console.log(err , "err")
    //   })
    const response = await LOGIN(values);
    //   const [response] = await Promise.allSettled([LOGIN(values)])
    console.log(response, "respoonse");
    if (response?.data.admin) {
      history.push("/dashboard");
      localStorage.setItem("token", response?.data?.data?.token);
      localStorage.setItem(
        "resObj",
        JSON.stringify(response?.data?.user_info)
      );
      window.location.reload();
      history.push("/dashboard");
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
                  <Form.Control
                    type="password"
                    className="input-login-control mb-4"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </Col>
                

                <Col xs="6">
                  <div className="forgot--txtlink text-end mb-5">
                    <span
                      className="link-forgot cursor-pointer"
                      onClick={() => {
                        history.push("/dashboard");
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
