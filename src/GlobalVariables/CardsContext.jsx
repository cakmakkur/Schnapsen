import { createContext, useState, useContext } from "react";

const CardsContext = createContext();

export const useCardsContext = () => useContext(CardsContext);

export const CardsContextProvider = ({ children }) => {
  const [frontside, setFrontside] = useState("regular");
  const [backside, setBackside] = useState("red");
  const [backgroundStyle, setBackgroundStyle] = useState("green");

  const value = {
    frontside,
    backside,
    setFrontside,
    setBackside,
    backgroundStyle,
    setBackgroundStyle,
  };

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
};
