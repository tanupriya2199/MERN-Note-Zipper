import React, { useState, useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as axios from "axios";

import MainScreen from "../../components/common/MainScreen";

const MyNotes = () => {
  const onclickDelete = (id) => {};
  const [allNotes, setAllNotes] = useState([]);

  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes");
    setAllNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainScreen title="Welcome back tanupriya....">
      <Link to="create-note">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      <div>
        {allNotes &&
          allNotes.map((note) => {
            return (
              <Accordion key={note._id}>
                <Card className="mt-3">
                  <Accordion.Toggle
                    as={Card.Text}
                    variant="link"
                    className="mb-0"
                    eventKey={note._id}
                  >
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <span className="font-weight-bold h5">{note.title}</span>
                      <div>
                        <Button>
                          <Link to={`/note/${note._id}`}>Edit </Link>
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => onclickDelete(note._id)}
                          className="mx-2"
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Header>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={note._id}>
                    <Card.Body>
                      <h4>
                        <Badge variant="success">
                          Category - {note.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on - {new Date().getUTCDate()}
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            );
          })}
      </div>
    </MainScreen>
  );
};

export default MyNotes;
