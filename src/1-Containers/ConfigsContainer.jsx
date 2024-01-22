import Button from "../3-Components/Button";

export default function ConfigsContainer({ mainPlayContainerRef }) {
  const handleButtonClick = () => {
    if (mainPlayContainerRef.current) {
      mainPlayContainerRef.current.handleNewGame();
    }
  };

  return (
    <div className="configsContainer">
      <Button handleClick={handleButtonClick} name={"New Game"}></Button>
      <Button name={"Tutorial"}></Button>
      <Button name={"Settings"}></Button>
      <Button handleClick={() => window.close()} name={"Exit"}></Button>
    </div>
  );
}
