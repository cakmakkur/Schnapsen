import { useCardsContext } from "../GlobalVariables/CardsContext";

export default function Card({ cardId, handleClick, style, isEnabled }) {
  const { frontside, backside } = useCardsContext();
  let imageSrc;
  let frontsideSrc;
  let backsideSrc;

  if (frontside === "regular") {
    frontsideSrc = `/src/Assets/cards_images/${cardId}.svg`;
  } else {
    frontsideSrc = `/src/Assets/german_cards_images/${cardId}.png`;
  }

  if (backside === "red") {
    backsideSrc = "/src/Assets/cards_images/backside.png";
  } else {
    backsideSrc = "/src/Assets/cards_images/backside_blue.png";
  }

  if (typeof cardId === "number") {
    imageSrc = frontsideSrc;
  } else {
    imageSrc = backsideSrc;
  }

  return (
    <button disabled={!isEnabled} className={style} onClick={handleClick}>
      <img className="cardImg" src={imageSrc} alt="" />
    </button>
  );
}
