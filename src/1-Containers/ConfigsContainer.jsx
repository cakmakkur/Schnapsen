import Button from "../3-Components/Button";
import { usePointsContext } from "../GlobalVariables/PointsContext";
import bg from "../Assets/wood-texture.jpg";

export default function ConfigsContainer({
  mainPlayContainerRef,
  setShowSettings,
  setShowTutorial,
  animationClass,
  setAnimationClass,
  setStartScreen,
}) {
  const { hasGameStarted, bummerlRef } = usePointsContext();
  const bg_url = `url(${bg})`;

  const backgroundImage = {
    backgroundImage: bg_url,
  };

  const handleButtonClick = () => {
    if (mainPlayContainerRef.current) {
      mainPlayContainerRef.current.handleNewGame();
    }
  };

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

  const handleQuitClick = () => {
    bummerlRef.current.player = 0;
    bummerlRef.current.cpu = 0;
    setStartScreen(true);
  };

  return (
    <div
      style={backgroundImage}
      className={`configsContainer ${animationClass}`}
    >
      <Button
        hasGameStarted={hasGameStarted}
        handleClick={handleButtonClick}
        name={"New Game"}
      ></Button>
      <Button handleClick={handleTutorialClick} name={"Tutorial"}></Button>
      <Button handleClick={handleSettingsClick} name={"Settings"}></Button>
      <Button handleClick={handleQuitClick} name={"Quit"}></Button>
    </div>
  );
}
