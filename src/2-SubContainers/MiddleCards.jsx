import Card from "../3-Components/Card";

export default function MiddleCards({
  playedCardsOfTurn,
  remainingCards,
  trump,
  playerPoints,
  cpuPoints,
  hasTrickFinished,
  shouldPickNewCard,
  hasGameStarted,
}) {
  return (
    <div className="middleCardsDiv">
      <PlayedCardsOfTurn
        hasTrickFinished={hasTrickFinished}
        playedCardsOfTurn={playedCardsOfTurn}
      />

      {trump ? (
        <Card
          style={`trump ${remainingCards.length < 1 ? "trump_disappear" : ""} `}
          cardId={trump.id}
        />
      ) : (
        ""
      )}

      {/* {remainingCards.length >= 1 && (
        <Card style={"remStack"} cardId={"backside"} />
      )} */}
      {hasGameStarted ? (
        <Card
          style={`remStack ${
            trump && remainingCards.length < 1 ? "remStack_disappear" : ""
          } `}
          cardId={"backside"}
        />
      ) : (
        ""
      )}

      {playerPoints > 0 || cpuPoints > 0 ? <PrevWonCards /> : ""}
      <>
        <Card
          style={`dcT ${shouldPickNewCard === true ? "dcT_active" : ""}`}
          cardId={"backside"}
        />
        <Card
          style={`dcB ${shouldPickNewCard === true ? "dcB_active" : ""}`}
          cardId={"backside"}
        />
      </>
    </div>
  );
}

function PlayedCardsOfTurn({ playedCardsOfTurn, hasTrickFinished }) {
  return playedCardsOfTurn.map((c) => (
    <Card
      key={c.id}
      cardId={c.id}
      style={`${hasTrickFinished ? "mcAnim" : ""}`}
    />
  ));
}

function PrevWonCards() {
  return (
    <>
      <Card style={"pwc1"} cardId={"backside"} />
      <Card style={"pwc2"} cardId={"backside"} />
    </>
  );
}

//delete style and dependencies in playedCardsOfTurn function
//mainPlayContainer remove hasTrickFinished
