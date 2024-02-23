export function checkExchange(remainingCards, playerHand, trump, setIsExchangeEnabled) {
  if (remainingCards.length >= 1) {
    playerHand.map((c) => {
      if (c.color === trump.color && c.value === 2) {
        setIsExchangeEnabled(true);
      }
    });
  }
}