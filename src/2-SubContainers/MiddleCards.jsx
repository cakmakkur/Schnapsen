import Card from "../3-Components/Card";

export default function MiddleCards({
  playedCardsOfTurn,
  remainingCards,
  trump,
}) {
  return (
    <div className="middleCardsDiv">
      <PlayedCardsOfTurn playedCardsOfTurn={playedCardsOfTurn} />
      {trump && <Card style={"trump"} cardId={trump.id} />}
      {remainingCards.length >= 2 && (
        <Card style={"remStack"} cardId={"backside"} />
      )}
      {/* <Card className="trump" /> */}
    </div>
  );
}

function PlayedCardsOfTurn({ playedCardsOfTurn }) {
  return playedCardsOfTurn.map((c) => <Card key={c.id} cardId={c.id} />);
}
