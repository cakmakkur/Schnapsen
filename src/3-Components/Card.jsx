import { useState, useEffect } from "react";
import { useCardsContext } from "../GlobalVariables/CardsContext";

import winner_cw from "../Assets/winner_cw.jpeg";
import winnerYou from "../Assets/winner_yw.jpeg";
import backside_red from "../Assets/cards_images/backside.png";
import backside_blue from "../Assets/cards_images/backside_blue.png";

export default function Card({
  cardId,
  handleClick,
  style,
  isEnabled,
  isSelected,
  selectedCardPos,
  cpuPlayAnm,
  side,
}) {
  const { frontside, backside } = useCardsContext();
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (cardId === "cpuPlayed") return;

    const loadImage = async () => {
      let frontsideSrc;
      let backsideSrc;

      if (
        frontside === "regular" &&
        cardId !== "backside" &&
        cardId !== "winner"
      ) {
        frontsideSrc = await import(`../Assets/cards_images/${cardId}.svg`);
      } else if (cardId !== "backside" && cardId !== "winner") {
        frontsideSrc = await import(
          `../Assets/german_cards_images/${cardId}.png`
        );
      }

      if (backside === "red") {
        backsideSrc = backside_red;
      } else {
        backsideSrc = backside_blue;
      }

      if (typeof cardId === "number") {
        setImageSrc(frontsideSrc.default);
      } else if (cardId === "backside") {
        setImageSrc(backsideSrc);
      } else if (cardId === "winner" && side === "YOU") {
        setImageSrc(winnerYou);
      } else {
        setImageSrc(winner_cw);
      }
    };

    loadImage();
  }, [cardId, frontside, backside, side]);

  return (
    <button disabled={!isEnabled} className={style} onClick={handleClick}>
      <img
        className={`cardImg  ${
          isSelected && selectedCardPos === 0
            ? "from0"
            : isSelected && selectedCardPos === 1
              ? "from1"
              : isSelected && selectedCardPos === 2
                ? "from2"
                : isSelected && selectedCardPos === 3
                  ? "from3"
                  : isSelected && selectedCardPos === 4
                    ? "from4"
                    : cardId === "cpuPlayed"
                      ? "cpa"
                      : ""
        } ${cpuPlayAnm === true ? "cpa_active" : ""}`}
        src={imageSrc}
        alt=""
      />
    </button>
  );
}
