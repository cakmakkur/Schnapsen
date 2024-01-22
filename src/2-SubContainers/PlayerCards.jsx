import Card from "../3-Components/Card";

export default function PlayerCards({
  playerHand,
  setPlayerHand,
  playedCardsOfTurn,
  setPlayedCardsOfTurn,
  isEnabled,
  setIsEnabled,
}) {
  return (
    <div className="playerCardsDiv" style={{ border: "1px solid red" }}>
      {playerHand.map((card) => (
        <Card
          isEnabled={isEnabled}
          handleClick={() => selectCard(card)}
          key={card.id}
          cardId={card.id}
        />
      ))}
    </div>
  );

  function selectCard(card) {
    let newPlayerHand = playerHand.filter((c) => c.id !== card.id);
    setPlayerHand(newPlayerHand);
    let newPlayedCardsOfTurn = [...playedCardsOfTurn];
    newPlayedCardsOfTurn.push(card);
    setPlayedCardsOfTurn(newPlayedCardsOfTurn);
    setIsEnabled(false);
  }
}
