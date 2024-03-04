import { useEffect, useRef } from "react";
import start_game from "../../public/Assets/start_game2.jpg";

export default function StartScreen({ setStartScreen }) {
  const startScrDivRef = useRef(null);

  useEffect(() => {
    const startGame = () => {
      const div = startScrDivRef.current;
      div.style.transition = "opacity 1s ease-out";
      div.style.opacity = "0";
      setTimeout(() => {
        setStartScreen(false);
      }, 1000);
    };

    const startScrDiv = startScrDivRef.current;
    startScrDiv.addEventListener("click", startGame);

    return () => {
      startScrDiv.removeEventListener("click", startGame);
    };
  }, [setStartScreen]);
  return (
    <div ref={startScrDivRef} className="startScreen" style={{ opacity: 1 }}>
      <img src={start_game} alt="Start Game" />
      <p>Start Game</p>
    </div>
  );
}
