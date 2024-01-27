import { createContext, useState, useContext } from "react";

const PointsContext = createContext();

export const usePointsContext = () => useContext(PointsContext);

export const PointsContextProvider = ({ children }) => {
  const [playerPoints, setPlayerPoints] = useState(0);
  const [cpuPoints, setCpuPoints] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const value = {
    playerPoints,
    cpuPoints,
    setPlayerPoints,
    setCpuPoints,
    hasGameStarted,
    setHasGameStarted,
  };

  return (
    <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
  );
};
