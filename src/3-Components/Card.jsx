import { useCardsContext } from "../GlobalVariables/CardsContext";

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
  let imageSrc;
  let frontsideSrc;
  let backsideSrc;

  if (frontside === "regular") {
    frontsideSrc = `/public/Assets/cards_images/${cardId}.svg`;
  } else {
    frontsideSrc = `/public/Assets/german_cards_images/${cardId}.png`;
  }

  if (backside === "red") {
    backsideSrc = "/public/Assets/cards_images/backside.png";
  } else {
    backsideSrc = "/public/Assets/cards_images/backside_blue.png";
  }

  if (typeof cardId === "number") {
    imageSrc = frontsideSrc;
  } else if (cardId === "backside") {
    imageSrc = backsideSrc;
  } else if (side === "YOU") {
    imageSrc = "/public/Assets/winner_yw.jpeg";
  } else {
    imageSrc = "/public/Assets/winner_cw.jpeg";
  }

  //above part was changed: cardId === 'winner' gets its image

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
