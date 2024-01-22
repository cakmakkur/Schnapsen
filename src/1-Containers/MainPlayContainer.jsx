import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { cards } from "../Assets/Cards/cards";
import randomIndex from "../Logic/randomIndex";

import CpuCards from "../2-SubContainers/CpuCards";
import MiddleCards from "../2-SubContainers/MiddleCards";
import PlayerCards from "../2-SubContainers/PlayerCards";

const MainPlayContainer = forwardRef((props, ref) => {
  const [playerHand, setPlayerHand] = useState([]);
  const [cpuHand, setCpuHand] = useState([]);
  const [remainingCards, setRemainingCards] = useState(cards);
  const [lastRoundWinner, setLastRoundWinner] = useState("player");
  const [playedCardsOfTurn, setPlayedCardsOfTurn] = useState([]);
  const [trump, setTrump] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useImperativeHandle(ref, () => ({
    handleNewGame,
  }));

  console.log(remainingCards.length);

  useEffect(() => {
    //starting game
    if (playedCardsOfTurn.length === 0 && remainingCards.length <= 9) {
      if (lastRoundWinner === "player") {
        setIsEnabled(true);
        return;
      } else {
        makeCpuMove();
      }
    }
    //async cpu move
    const makeCpuMove = async () => {
      await cpuMove();
    };
    //conditionals
    if (
      playedCardsOfTurn.length === 1 &&
      playedCardsOfTurn[0].holder === "player"
    ) {
      makeCpuMove();
    } else {
      setIsEnabled(true);
    }
    if (playedCardsOfTurn.length === 2) {
      // logic to evaluate the round and start next round
      console.log("now it evaluates");
    }
  }, [playedCardsOfTurn]);

  return (
    <div className="mainPlayContainer">
      <CpuCards setCpuHand={setCpuHand} cpuHand={cpuHand} />
      <MiddleCards
        playedCardsOfTurn={playedCardsOfTurn}
        remainingCards={remainingCards}
        trump={trump}
      />
      <PlayerCards
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        setPlayerHand={setPlayerHand}
        playerHand={playerHand}
        playedCardsOfTurn={playedCardsOfTurn}
        setPlayedCardsOfTurn={setPlayedCardsOfTurn}
      />
    </div>
  );

  function handleNewGame() {
    let newRemainingCards = [...remainingCards];
    let newPlayerHand = [...playerHand];
    let newCpuHand = [...cpuHand];
    let newTrump;

    function getInitialCard(newRemainingCards) {
      const randomIx = randomIndex(newRemainingCards.length);
      const selectedCard = newRemainingCards.splice(randomIx, 1)[0];
      return { selectedCard, newRemainingCards };
    }

    for (let i = 0; i < 5; i++) {
      let res = getInitialCard(newRemainingCards);
      res.selectedCard.holder = "player";
      newPlayerHand.push(res.selectedCard);
      res = getInitialCard(res.newRemainingCards);
      res.selectedCard.holder = "cpu";
      newCpuHand.push(res.selectedCard);
      newRemainingCards = res.newRemainingCards;
    }
    let trumpSelection = getInitialCard(newRemainingCards);
    newTrump = trumpSelection.selectedCard;
    newRemainingCards = trumpSelection.newRemainingCards;

    setRemainingCards(newRemainingCards);
    setPlayerHand(newPlayerHand);
    setCpuHand(newCpuHand);
    setTrump(newTrump);
  }

  function cpuMove() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let newCpuHand = [...cpuHand];
        let newPlayedCardsOfTurn = [...playedCardsOfTurn];
        const randomIx = randomIndex(cpuHand.length);
        newPlayedCardsOfTurn.push(newCpuHand.splice(randomIx, 1)[0]);
        setCpuHand(newCpuHand);
        setPlayedCardsOfTurn(newPlayedCardsOfTurn);
        resolve();
      }, 3000);
    });
  }

  // function pickNewCard(side) {
  //   const randomIx = randomIndex(remainingCards.length);
  //   const pickedCard = remainingCards[randomIx];
  //   if (side === "player") {
  //     setPlayerHand([...playerHand, pickedCard]);
  //   } else {
  //     setCpuHand([...cpuHand, pickedCard]);
  //   }
  // }
});
MainPlayContainer.displayName = "MainPlayContainer";

export default MainPlayContainer;
