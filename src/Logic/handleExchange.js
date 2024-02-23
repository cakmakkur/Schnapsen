export function handleExchange(trump, playerHand, setTrump, setPlayerHand, setIsExchangeEnabled) {
  let trumpToGet = trump;
  let trumpToGive;
  let newPlayerHand = [...playerHand];
  newPlayerHand.map((c, i) => {
    if (c.color === trump.color && c.value === 2) {
      trumpToGive = newPlayerHand.splice(i, 1)[0];
    }
  });
  newPlayerHand.push(trumpToGet);
  setTrump(trumpToGive);
  setPlayerHand(newPlayerHand);
  setIsExchangeEnabled(false);
}