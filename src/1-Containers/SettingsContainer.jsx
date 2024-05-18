// import { useContext } from "react";
import { useCardsContext } from "../GlobalVariables/CardsContext";

import arrow_return from "../Assets/arrow_return.png";
import card_backside_blue from "../Assets/cards_images/backside_blue.png";
import card_backside from "../Assets/cards_images/backside.png";
import ex_reg from "../Assets/cards_images/1.svg";
import ex_ger from "../Assets/german_cards_images/1.png";
import ex_bg_g from "../Assets/table-background_g2.jpeg";
import ex_bg_b from "../Assets/table-background_b.jpeg";
import bg from "../Assets/wood-texture.jpg";

export default function SettingsContainer({
  setShowSettings,
  setAnimationClass,
  animationClass,
}) {
  const bg_url = `url(${bg})`;
  const backgroundImage = {
    backgroundImage: bg_url,
  };

  function onCloseClick() {
    setAnimationClass("fade-out");
    setTimeout(() => {
      setAnimationClass("fade-in");
      setShowSettings(false);
    }, 100);
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
    <div style={backgroundImage} className={`settingsDiv ${animationClass}`}>
      <button onClick={onCloseClick} className="closeButton">
        <img src={arrow_return} alt="return_arrow" />
      </button>
      <div className="div1">
        <p>Choose backside:</p>
        <form name="cardBackside" action="">
          <div>
            <img src={card_backside_blue} alt="card_backside" />
            <input
              onChange={(e) => handleBackside(e)}
              value={"blue"}
              name="cardBackside"
              type="radio"
            />
          </div>
          <div>
            <img src={card_backside} alt="card_backside" />
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
            <img src={ex_reg} alt="" />
            <input
              onChange={(e) => handleFrontside(e)}
              value={"regular"}
              name="cardFrontside"
              type="radio"
            />
          </div>
          <div>
            <img src={ex_ger} alt="" />
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
            <img src={ex_bg_g} alt="" />
            <input
              onChange={(e) => handleBackground(e)}
              value={"green"}
              name="table-texture"
              type="radio"
            />
          </div>
          <div>
            <img src={ex_bg_b} alt="" />
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
