import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Color.css";

function Color({ colors }) {
  const { color } = useParams();
  const hex = colors[color];
  const navigate = useNavigate();

  if (!hex) {
    navigate("/colors");
    return null;
  }

  return (
    <div className="Color" style={{ backgroundColor: hex }}>
      <p>{color}.</p>
      <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  );
}

export default Color;
