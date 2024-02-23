import { useCardsContext } from "../GlobalVariables/CardsContext";

export default function setBackgroundImage() {
  const { backgroundStyle } = useCardsContext();

  let backgroundImageUrl;
  if (backgroundStyle === "green") {
    backgroundImageUrl = "./src/Assets/table-background.jpeg";
  } else {
    backgroundImageUrl = "./src/Assets/table-background_blue.jpeg";
  }
  return backgroundImageUrl;
}
