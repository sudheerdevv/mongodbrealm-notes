import React from "react";
import "../styles/Doc.css";

export default function doc({ name, message, id }) {
  return (
    <div className="doc">
      <div className="text_box">
        <h5>{name}</h5>
        <p>{message.substring(0, 150) + "..."}</p>
      </div>
      <em>{id.getTimestamp().toLocaleString()}</em>
    </div>
  );
}
