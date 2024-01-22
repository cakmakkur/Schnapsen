import Button from "../3-Components/Button";

export default function ConfigsContainer({ handleNewGame, buttonRef }) {
  return (
    <div className="configsContainer">
      <Button
        buttonRef={buttonRef}
        handleClick={handleNewGame}
        name={"New Game"}
      ></Button>
      <Button name={"Tutorial"}></Button>
      <Button name={"Settings"}></Button>
      <Button handleClick={() => window.close()} name={"Exit"}></Button>
    </div>
  );
}
