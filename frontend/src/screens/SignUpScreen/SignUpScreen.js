import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as axios from "axios";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/common/ErrorMessage";
import Loading from "../../components/common/Loading";
import MainScreen from "../../components/common/MainScreen";

const SignUpScreen = () => {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOnchange = (e) => {
    const { id, value } = e.target;
    setSignUpForm((prevValue) => {
      return { ...prevValue, [id]: value };
    });
  };

  // https://api.cloudinary.com/v1_1/dpenqyk2q/image/upload
  const uploadPicture = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "NoteZipper");
      data.append("cloud_name", "dpenqyk2q");
      fetch("https://api.cloudinary.com/v1_1/dpenqyk2q/image/upload", {
        method: "post",
        body: data,
      }).then((res) =>
        res
          .json()
          .then((picUrldata) => {
            console.log("picUrldata===", picUrldata);
            setSignUpForm((prev) => {
              return { ...prev, profilePic: picUrldata.url.toString() };
            });
          })
          .catch((err) => {
            console.log("err while uploading image", err);
          })
      );
    } else {
      setPicMessage("Please select an image");
    }
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();
    console.log("signup form", signUpForm);
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setMessage("Password doesn't match");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/api/users",
          {
            name: signUpForm.name,
            email: signUpForm.email,
            password: signUpForm.password,
            picture: signUpForm.picture,
          },
          config
        );
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <MainScreen title="Sign Up">
      <div className="loginScreenContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={signUpForm.name}
              type="text"
              onChange={handleOnchange}
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={signUpForm.email}
              type="email"
              onChange={handleOnchange}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={signUpForm.password}
              type="password"
              onChange={handleOnchange}
              placeholder="Enter Password"
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={signUpForm.confirmPassword}
              type="password"
              onChange={handleOnchange}
              placeholder="Enter Confirm Password"
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label> Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => uploadPicture(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload profile picture"
              custom
            />
          </Form.Group>

          <Button variant="primary" onClick={onClickSubmit} type="submit">
            Sign Up
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an account?{" "}
            <Link to="/" className="f-bold">
              Login
            </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default SignUpScreen;
