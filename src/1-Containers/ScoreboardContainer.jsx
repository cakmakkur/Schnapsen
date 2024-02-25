import { useEffect, useRef } from "react";
import { usePointsContext } from "../GlobalVariables/PointsContext";

export default function ScoreboardContainer({ animationClass }) {
  const { playerPoints, cpuPoints, bummerlRef } = usePointsContext();
  const scrollDivRef = useRef(null);

  useEffect(() => {
    if (playerPoints === 0 && cpuPoints === 0) return;

    const playerContainer = document.querySelector(".playerPoints");
    const cpuContainer = document.querySelector(".computerPoints");

    playerContainer.innerHTML += `<p class='addedPoints'>${playerPoints}</p>`;
    cpuContainer.innerHTML += `<p class='addedPoints'>${cpuPoints}</p>`;

    if (playerPoints >= 66 || cpuPoints >= 66) {
      playerContainer.innerHTML += `<p class='newGameSeperator'>NEW</p>`;
      cpuContainer.innerHTML += `<p class='newGameSeparator'>GAME</p>`;
    }

    let existingScore = playerContainer.querySelectorAll("p");
    let existingScore2 = cpuContainer.querySelectorAll("p");

    if (existingScore.length > 2) {
      const previousScore = existingScore[existingScore.length - 2];
      const previousScore2 = existingScore2[existingScore.length - 2];
      previousScore.style.textDecoration = "line-through";
      previousScore2.style.textDecoration = "line-through";
    }

    scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight;
  }, [playerPoints, cpuPoints]);

  return (
    <>
      <div className={`scoreboardHeader ${animationClass}`}>
        <p className="underline">
          {bummerlRef.current.player > 0 ? (
            <span className="bummerl">{bummerlRef.current.player}</span>
          ) : (
            ""
          )}
          Player
        </p>
        <p className="underline">
          {/* potential mistake here. check it */}
          {bummerlRef.current.cpu > 0 ? (
            <span className="bummerl">{bummerlRef.current.cpu}</span>
          ) : (
            ""
          )}
        </p>
      </div>
      <div ref={scrollDivRef} className="scoreboardContainer">
        <div className="playerPoints"></div>
        <div className="computerPoints"></div>
      </div>
    </>
  );
}
