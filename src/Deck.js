import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        setDeck(response.data);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    fetchDeck();
  }, []);

  const draw = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);

      if (response.data.remaining === 0) {
        throw new Error("Error: no cards remaining!");
      }

      const card = response.data.cards[0];

      setDrawn((prevDrawn) => [
        ...prevDrawn,
        {
          id: card.code,
          name: `${card.suit} ${card.value}`,
          image: card.image,
        },
      ]);
    } catch (error) {
      alert(error.message);
    }
  };

  const startShuffling = async () => {
    setIsShuffling(true);
    try {
      await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
      setDrawn([]);
    } catch (error) {
      console.error("Error shuffling deck:", error);
      alert("Failed to shuffle the deck.");
    } finally {
      setIsShuffling(false);
    }
  };

  const renderDrawButton = () => {
    if (!deck) return null;

    return (
      <button className="Deck-gimme" onClick={draw} disabled={isShuffling}>
        DRAW
      </button>
    );
  };

  const renderShuffleButton = () => {
    if (!deck) return null;

    return (
      <button className="Deck-gimme" onClick={startShuffling} disabled={isShuffling}>
        SHUFFLE DECK
      </button>
    );
  };

  return (
    <main className="Deck">
      {renderDrawButton()}
      {renderShuffleButton()}

      <div className="Deck-cardarea">
        {drawn.map((card) => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;
