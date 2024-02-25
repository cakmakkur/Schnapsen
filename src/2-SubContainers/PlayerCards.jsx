import Card from "../3-Components/Card";

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
  return (
    <div className="playerCardsDiv">
      {playerHand.map((card) => (
        <Card
          isEnabled={isEnabled || card.marriageOption || card.lastPhaseEnabled}
          style={card.marriageOption ? "marriageHighlight" : ""}
          //here include classname to disappear
          handleClick={() => selectCard(card, trump)}
          key={card.id}
          cardId={card.id}
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
    let newPlayerHand = playerHand.filter((c) => c.id !== card.id);
    setPlayerHand(newPlayerHand);
    let newPlayedCardsOfTurn = [...playedCardsOfTurn];
    //implement card animation
    newPlayedCardsOfTurn.push(card);
    setPlayedCardsOfTurn(newPlayedCardsOfTurn);
    setIsEnabled(false);
    setMatchChecked(false);
  }
}
