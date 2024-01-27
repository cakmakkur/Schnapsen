import Button from "../3-Components/Button";

export default function ConfigsContainer({
  mainPlayContainerRef,
  setShowSettings,
}) {
  const handleButtonClick = () => {
    if (mainPlayContainerRef.current) {
      mainPlayContainerRef.current.handleNewGame();
    }
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  return (
    <div className="configsContainer">
      <Button handleClick={handleButtonClick} name={"New Game"}></Button>
      <Button name={"Tutorial"}></Button>
      <Button handleClick={handleSettingsClick} name={"Settings"}></Button>
      <Button handleClick={() => window.close()} name={"Exit"}></Button>
    </div>
  );
}
