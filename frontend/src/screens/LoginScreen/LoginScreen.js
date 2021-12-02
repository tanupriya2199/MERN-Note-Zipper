import * as axios from "axios";
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loading from "../../components/common/Loading";
import MainScreen from "../../components/common/MainScreen";

import "./LoginScreen.css";

const LoginScreen = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnchange = (e) => {
    const { id, value } = e.target;
    setLoginForm((pre) => {
      return { ...pre, [id]: value };
    });
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post("/api/users/login", loginForm, config);
      console.log("datat", data);
      localStorage.serItem("userInfo", data);
      setLoading(false);
    } catch (error) {
      console.log("error==", error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <MainScreen title="Login">
      <div className="loginScreenContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={loginForm.email}
              type="email"
              onChange={handleOnchange}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={loginForm.password}
              type="password"
              onChange={handleOnchange}
              placeholder="Enter Password"
            />
          </Form.Group>

          <Button variant="primary" onClick={onClickSubmit} type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New customer?{" "}
            <Link to="/register" className="f-bold">
              Register Here
            </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
