import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../Service/auth";
import { useHistory } from "react-router-dom";

// react-bootstr useNavigateap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function User() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState()
 

    const navigate = useHistory();





    let handleSubmit = async (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
          let requestData = {
            email: email,
            password: password,
          };
        try {
          let res = await login (requestData, {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            navigate("/dashboard");
            setMessage("User enter successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      }
      };

      

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Login</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    
                    <Col className  ="col align-self-center" md="4" >
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Pasword
                        </label>
                        <Form.Control
                          placeholder="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Link to="/reset"> Forgot password? </Link>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Login
                  </Button>
                  {/* <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    
                  >
                   Register
                  </Button> */}
                  {/* <div className="clearfix"></div> */}
                  <div className="message">{message ? <p>{message}</p> : null}</div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
