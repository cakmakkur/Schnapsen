import { createContext, useState, useContext, useRef } from "react";

const PointsContext = createContext();

export const usePointsContext = () => useContext(PointsContext);

export const PointsContextProvider = ({ children }) => {
  const [playerPoints, setPlayerPoints] = useState(0);
  const [cpuPoints, setCpuPoints] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isGameTie, setIsGameTie] = useState(false);
  const bummerlRef = useRef({ player: 0, cpu: 0 });

  const value = {
    playerPoints,
    cpuPoints,
    setPlayerPoints,
    setCpuPoints,
    hasGameStarted,
    setHasGameStarted,
    bummerlRef,
    isGameTie,
    setIsGameTie,
  };

  return (
    <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
  );
};
