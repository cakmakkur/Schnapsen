// import { useContext } from "react";
import { useCardsContext } from "../GlobalVariables/CardsContext";

export default function SettingsContainer({ setShowSettings }) {
  function onCloseClick() {
    setShowSettings(false);
  }
  const { setFrontside, setBackside, setBackgroundStyle } = useCardsContext();

  function handleBackside(e) {
    setBackside(e.target.value);
  }

  function handleFrontside(e) {
    setFrontside(e.target.value);
  }

  function handleBackground(e) {
    setBackgroundStyle(e.target.value);
  }

  return (
    <div className="settingsDiv">
      <button onClick={onCloseClick} className="closeButton">
        X
      </button>
      <div className="div1">
        <p>Choose backside:</p>
        <form name="cardBackside" action="">
          <div>
            <img src="/src/Assets/cards_images/backside_blue.png" alt="" />
            <input
              onChange={(e) => handleBackside(e)}
              value={"blue"}
              name="cardBackside"
              type="radio"
            />
          </div>
          <div>
            <img src="/src/Assets/cards_images/backside.png" alt="" />
            <input
              onChange={(e) => handleBackside(e)}
              value={"red"}
              name="cardBackside"
              type="radio"
            />
          </div>
        </form>
      </div>
      <div className="div3">
        <p>Choose card type:</p>
        <form name="cardFrontside" action="">
          <div>
            <img src="/src/Assets/cards_images/1.svg" alt="" />
            <input
              onChange={(e) => handleFrontside(e)}
              value={"regular"}
              name="cardFrontside"
              type="radio"
            />
          </div>
          <div>
            <img src="/src/Assets/german_cards_images/1.png" alt="" />
            <input
              onChange={(e) => handleFrontside(e)}
              value={"german"}
              name="cardFrontside"
              type="radio"
            />
          </div>
        </form>
      </div>
      <div className="div2">
        <p>Choose table:</p>
        <form name="table-texture" action="">
          <div>
            <img src="/src/Assets/table-background.jpeg" alt="" />
            <input
              onChange={(e) => handleBackground(e)}
              value={"green"}
              name="table-texture"
              type="radio"
            />
          </div>
          <div>
            <img src="/src/Assets/table-background_blue.jpeg" alt="" />
            <input
              onChange={(e) => handleBackground(e)}
              value={"blue"}
              name="table-texture"
              type="radio"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
