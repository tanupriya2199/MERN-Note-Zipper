import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 100 }) {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <Spinner
        style={{
          width: size,
          height: size,
        }}
        animation="border"
      />
    </div>
  );
}

export default Loading;
