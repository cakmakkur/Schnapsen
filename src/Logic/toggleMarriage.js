export function toggleMarriage(isEnabled, setIsEnabled, setMarriagePointsMode, marriagePointsMode, playerMarriage1, playerMarriage2, playerHand) {
  // disable all cards first
  setIsEnabled(!isEnabled);
  setMarriagePointsMode(!marriagePointsMode);
  // enable only the marriage cards
  let marriageIds = [];
  playerMarriage1.map((c) => {
    marriageIds.push(c.id);
  });
  if (playerMarriage2.length > 0) {
    playerMarriage2.map((c) => {
      marriageIds.push(c.id);
    });
  }
  playerHand.map((c) => {
    marriageIds.map((id) => {
      if (c.id === id) {
        c.marriageOption = !c.marriageOption;
      }
    });
  });
}