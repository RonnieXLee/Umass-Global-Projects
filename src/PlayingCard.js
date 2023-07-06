import React from "react";
import { useFlip } from "./hooks";
import backOfCard from "./back.png";
import "./PlayingCard.css";

function PlayingCard({ front, back = backOfCard }) {
  const [isFacingUp, flip] = useFlip();

  const handleClick = () => {
    flip();
  };

  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={handleClick}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
