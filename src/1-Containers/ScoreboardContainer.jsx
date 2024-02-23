import { useEffect } from "react";
import { usePointsContext } from "../GlobalVariables/PointsContext";

export default function ScoreboardContainer() {
  const { playerPoints, cpuPoints } = usePointsContext();

  useEffect(() => {
    const playerContainer = document.querySelector(".playerPoints");
    const cpuContainer = document.querySelector(".computerPoints");
    if (playerPoints === 0 && cpuPoints === 0) {
      //here delete all the inputs from before
      return;
    }

    playerContainer.innerHTML += `<p class='addedPoints'>${playerPoints}</p>`;
    cpuContainer.innerHTML += `<p class='addedPoints'>${cpuPoints}</p>`;

    let existingScore = playerContainer.querySelectorAll("p");
    let existingScore2 = cpuContainer.querySelectorAll("p");

    if (existingScore.length > 2) {
      const previousScore = existingScore[existingScore.length - 2];
      const previousScore2 = existingScore2[existingScore.length - 2];
      previousScore.style.textDecoration = "line-through";
      previousScore2.style.textDecoration = "line-through";
    }
  }, [playerPoints, cpuPoints]);

  return (
    <div className="scoreboardContainer">
      <div className="playerPoints">
        <p className="underline">Player</p>
      </div>
      <div className="computerPoints">
        <p className="underline">CPU</p>
      </div>
    </div>
  );
}
