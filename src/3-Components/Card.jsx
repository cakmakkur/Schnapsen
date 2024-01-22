// import card from "../Assets/cards_images/1.svg";

export default function Card({ cardId, handleClick, style, isEnabled }) {
  let imageSrc;
  if (typeof cardId === "number") {
    imageSrc = `/src/Assets/cards_images/${cardId}.svg`;
  } else {
    imageSrc = "/src/Assets/cards_images/backside.png";
  }
  return (
    <button disabled={!isEnabled} className={style} onClick={handleClick}>
      <img className="cardImg" src={imageSrc} alt="" />
    </button>
  );
}
