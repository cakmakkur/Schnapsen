import Button from "../3-Components/Button";
import { usePointsContext } from "../GlobalVariables/PointsContext";

export default function ConfigsContainer({
  mainPlayContainerRef,
  setShowSettings,
  setShowTutorial,
  animationClass,
  setAnimationClass,
}) {
  const handleButtonClick = () => {
    if (mainPlayContainerRef.current) {
      mainPlayContainerRef.current.handleNewGame();
    }
  };

  const { hasGameStarted } = usePointsContext();

  const handleSettingsClick = () => {
    setAnimationClass("fade-out");
    setTimeout(() => {
      setAnimationClass("fade-in");
      setShowSettings(true);
    }, 100);
  };

  const handleTutorialClick = () => {
    setShowTutorial(true);
  };

  return (
    <div className={`configsContainer ${animationClass}`}>
      <Button
        hasGameStarted={hasGameStarted}
        handleClick={handleButtonClick}
        name={"New Game"}
      ></Button>
      <Button handleClick={handleTutorialClick} name={"Tutorial"}></Button>
      <Button
        // hasGameStarted={hasGameStarted}
        handleClick={handleSettingsClick}
        name={"Settings"}
      ></Button>
      <Button handleClick={() => window.close()} name={"Exit"}></Button>
    </div>
  );
}
