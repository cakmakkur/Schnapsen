import TutorialPages from "../2-SubContainers/TutorialPages";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function Tutorial({ setShowTutorial }) {
  const [leftPos, setLeftPos] = useState(0);

  function handlePrevClick() {
    const slideBox = document.querySelector(".slideBox");
    const progBar = document.querySelector(".progressBar");
    slideBox.style.left = leftPos + 80 + "vw";
    progBar.style.width = (leftPos / -80 - 1) * (70 / 15) + "vw";
    setLeftPos(leftPos + 80);
  }

  function handleNextClick() {
    const slideBox = document.querySelector(".slideBox");
    const progBar = document.querySelector(".progressBar");
    slideBox.style.left = leftPos - 80 + "vw";
    progBar.style.width = (leftPos / -80 + 1) * (70 / 15) + "vw";
    setLeftPos(leftPos - 80);
  }

  return (
    <div className="tutorialModalScreen">
      <div className="tutorialMainDiv">
        <button onClick={() => setShowTutorial(false)} className="closeBtn">
          X
        </button>
        <div className="tutorialProgress">
          <div className="progressBar"></div>
        </div>
        <TutorialPages />
        <Button
          disabled={leftPos === 0}
          onClick={handlePrevClick}
          className="navBtn prevBtn"
        >
          Prev
        </Button>
        <Button
          disabled={leftPos === -1200}
          onClick={handleNextClick}
          className="navBtn nextBtn"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
