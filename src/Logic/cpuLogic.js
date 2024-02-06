import randomIndex from "./randomIndex";

export default function cpuMove (cpuHand, phase1, lead, playedCard, cpuPoints, playerPoints, trump, remainingCards ) {

  let index;
  let id;
  let randomPercentage = Math.floor(Math.random());

  //returns the first card of the given array
  function findIndex (conditionArray) {
    id = conditionArray[0].id;
    index = cpuHand.findIndex((c) => c.id === id)
    return index;
  }

  let trumps = cpuHand.filter((c) => c.color === trump.color);
  let trumpsMarriageCandidates = trumps.filter((c) => c.value === 4 || c.value === 3);
  let marriageCandidates = cpuHand.filter((c) => c.value === 3 || c.value === 4)
  let aces = cpuHand.filter((c) => c.value === 11);

  let j_trump = cpuHand.filter((c) => c.value === 2 && c.color === trump.color)
  let q_trump = cpuHand.filter((c) => c.value === 3 && c.color === trump.color)
  let k_trump = cpuHand.filter((c) => c.value === 4 && c.color === trump.color)
  let t_trump = cpuHand.filter((c) => c.value === 10 && c.color === trump.color)
  let a_trump = cpuHand.filter((c) => c.value === 11 && c.color === trump.color)

  let j_noTrump = cpuHand.filter((c) => c.value === 2 && c.color !== trump.color)
  let q_noTrump = cpuHand.filter((c) => c.value === 3 && c.color !== trump.color)
  let k_noTrump = cpuHand.filter((c) => c.value === 4 && c.color !== trump.color)
  let t_noTrump = cpuHand.filter((c) => c.value === 10 && c.color !== trump.color)
  let a_noTrump = cpuHand.filter((c) => c.value === 11 && c.color !== trump.color)

  let q_noPair_noTrump = q_noTrump.filter(q => 
    !k_noTrump.some(k => k.color === q.color));
  let k_noPair_noTrump = k_noTrump.filter(k => 
    !q_noTrump.some(q => q.color === k.color));



  //prefer non-trump, prefer low to high, avoid possible marriage
  function noT_LH () {
    if(j_noTrump) {
      return findIndex(j_noTrump)
    } else if (q_noPair_noTrump) {
      findIndex(q_noPair_noTrump)
    } else if (k_noPair_noTrump) {
      return findIndex(k_noPair_noTrump)
    } else if (a_trump) {
      return findIndex(a_trump)
    } else {
      //play random
      return randomIndex(cpuHand.length)
    }
  }

  //prefer trump, prefer low to high, avoid possible marriage
  function t_LH () {
    if (j_trump) {
      return findIndex(j_trump)
    } else if (trumpsMarriageCandidates !== 2) {
      if (q_trump) {
        return findIndex(q_trump)
      } else if (k_trump) {
        return findIndex(k_trump)
      } else if (t_trump) {
        return findIndex(t_trump)
      } else if (a_trump) {
        return findIndex(a_trump)
      } else {
        return randomIndex(cpuHand.length)
      }
    } else {
      noT_LH();
    }
  }

  if (phase1) {
    if (lead) {
      //marriage and exchange operations
      if (lead && cpuPoints > 0) {
        //check marriage
        //show marriage
        //check exchange
        //exchange
      } 
      // logic for phase 1 - lead
      if (randomPercentage < 90) {
        noT_LH()
      } else {
        return randomIndex(cpuHand.length)
      }
    }
    //logic for phase 1 - non-lead
    else {
      if (playedCard.value === 11 && playedCard.color === trump.color) {
        //player played an ACE - trump
        noT_LH();
      } else if (playedCard.value === 11) {
        //player played an ACE - non-trump
        t_LH();
      }
    }
  }

  //logic for second phase
  else {
    if (lead) {
      //logic when the cpu plays the first card
    } else {
      //logic when the player plays the first card
    }
  }
}


//this function should return an index that is going to be used in the mainplaycontainer