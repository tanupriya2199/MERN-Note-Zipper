import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to note zipper</h1>
              <p className="subtitle"> One safe place for your notes.</p>
            </div>
            <div className="button-container mt-5 d-flex">
              <Link to="/login">
                <Button size="lg" className="landing-button">
                  LOGIN
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="lg"
                  variant="outline-primary"
                  className="landing-button"
                >
                  SIGNUP
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
