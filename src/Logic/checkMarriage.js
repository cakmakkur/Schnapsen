export function checkMarriage(playerHand, setPlayerMarriage1, setPlayerMarriage2, setIsMarriageEnabled) {
  let matchingPairsArray1 = [];
  let matchingPairsArray2 = [];
  // check if there are marriage-qualified cards among the hand
  let marriageArray = playerHand.filter(
    (c) =>
      c.marriage === "m1" ||
      c.marriage === "m2" ||
      c.marriage === "m3" ||
      c.marriage === "m4"
  );
  //if there is 1 or 2 pairs of same color, put them in an array
  if (marriageArray.length >= 2) {
    for (let i = 0; i < marriageArray.length; i++) {
      for (let j = i + 1; j < marriageArray.length; j++) {
        if (marriageArray[i].marriage === marriageArray[j].marriage) {
          matchingPairsArray1 = [marriageArray[i], marriageArray[j]];
        }
      }
    }
    matchingPairsArray1.sort((a, b) => {
      a.value - b.value;
    });
  }
  //if there are 2 pairs, put them in two separate arrays of couples
  if (matchingPairsArray1.length === 4) {
    for (let i = 0; i < matchingPairsArray1.length; i++) {
      for (let j = i + 1; j < matchingPairsArray1.length; j++) {
        if (
          matchingPairsArray1[i].marriage === matchingPairsArray1[j].marriage
        ) {
          matchingPairsArray2 = matchingPairsArray2.concat([
            matchingPairsArray1[i],
            matchingPairsArray1[j],
          ]);
        }
      }
    }
    //take one of the arrays and assign it to another array
    matchingPairsArray1 = matchingPairsArray2.splice(0, 1)[0];
    // sort in ascending order
    matchingPairsArray1.sort((a, b) => {
      return a.value - b.value;
    });
    if (matchingPairsArray2.length !== 0) {
      matchingPairsArray2.sort((a, b) => {
        return a.value - b.value;
      });
    }
  }
  //enable the option
  if (matchingPairsArray1.length > 0) {
    setPlayerMarriage1(matchingPairsArray1);
    if (matchingPairsArray2 > 0) {
      setPlayerMarriage2(matchingPairsArray2);
    }
    setIsMarriageEnabled(true);
  } else {
    setIsMarriageEnabled(false);
    console.log('marriage disabled')
  }
}