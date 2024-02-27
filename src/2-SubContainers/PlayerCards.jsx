import Card from "../3-Components/Card";
import { useState } from "react";

export default function PlayerCards({
  playerHand,
  setPlayerHand,
  playedCardsOfTurn,
  setPlayedCardsOfTurn,
  isEnabled,
  setIsEnabled,
  marriagePointsMode,
  trump,
  setPlayerPoints,
  playerPoints,
  setMatchChecked,
}) {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardPos, setSelectedCardPos] = useState(null);

  return (
    <div className="playerCardsDiv">
      {playerHand.map((card) => (
        <Card
          isEnabled={isEnabled || card.marriageOption || card.lastPhaseEnabled}
          style={card.marriageOption ? "marriageHighlight" : ""}
          handleClick={() => selectCard(card, trump)}
          key={card.id}
          cardId={card.id}
          isSelected={selectedCardId === card.id ? true : false}
          selectedCardPos={selectedCardPos}
        />
      ))}
    </div>
  );

  function selectCard(card, trump) {
    //if the marriagemode is activated and the player clicks on this card, it adds extra points to the player
    if (marriagePointsMode) {
      if (card.color === trump.color) {
        setPlayerPoints(playerPoints + 40);
      } else {
        setPlayerPoints(playerPoints + 20);
      }
    }
    //implement card animation
    playerHand.map((c, index) => {
      if (c.id === card.id) {
        setSelectedCardPos(index);
        setSelectedCardId(card.id);
      }
    });

    // cards.map((c) => {
    //   if (c.id === card.id) {
    //     setSelectedCardId(card.id);
    //   }
    // });
    setTimeout(() => {
      let newPlayedCardsOfTurn = [...playedCardsOfTurn];
      let newPlayerHand = playerHand.filter((c) => c.id !== card.id);
      setPlayerHand(newPlayerHand);
      newPlayedCardsOfTurn.push(card);
      setPlayedCardsOfTurn(newPlayedCardsOfTurn);
      setIsEnabled(false);
      setMatchChecked(false);
    }, 200);
  }
}
