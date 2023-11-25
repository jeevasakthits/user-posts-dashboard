import React from "react";
import "../styles/postsStyle.scss";
import { useNavigate } from "react-router-dom";
export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="pagebackButton" onClick={() => navigate(-1)}>
      back{" "}
    </button>
  );
}
