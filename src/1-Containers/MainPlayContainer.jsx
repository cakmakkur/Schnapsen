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
  const [isExchangeEnabled, setIsExchangeEnabled] = useState(false);

  const [isMarriageEnabled, setIsMarriageEnabled] = useState(false);
  const [playerMarriage1, setPlayerMarriage1] = useState([]);
  const [playerMarriage2, setPlayerMarriage2] = useState([]);

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
      <button onClick={handleMarriage} className="in-game-btn in-game-btn-pair">
        <img className="in-game-btn-img" src="/src/Assets/pair.svg" alt="" />
      </button>
      <button className="in-game-btn in-game-btn-exchange">
        <img
          className="in-game-btn-img"
          src="/src/Assets/exchange.svg"
          alt=""
        />
      </button>
    </div>
  );

  function checkExchange() {
    playerHand.map((c) => {
      if (
        c.color === trump.color &&
        c.value === 2 &&
        lastRoundWinner === "player"
      ) {
        setIsExchangeEnabled(true);
      }
    });
  }

  function checkMarriage() {
    let matchingPairsArray1 = [];
    let matchingPairsArray2 = [];
    // check if there are marriage-qualified card among the hand
    let marriageArray = playerHand.filter((c) => {
      c.marriage === "m1" || "m2" || "m3" || "m4";
    });
    //if there is 1 or 2 pairs of same color, put them in an array
    if (marriageArray.length >= 2) {
      for (let i = 0; i < marriageArray.length; i++) {
        for (let j = i + 1; j < marriageArray.length; j++) {
          if (marriageArray[i].marriage === marriageArray[j].marriage) {
            matchingPairsArray1 = [marriageArray[i], marriageArray[j]];
          }
        }
      }
    }
    //if there are 2 pairs, put them in separate arrays
    if (matchingPairsArray1 === 4) {
      for (let i = 0; i < matchingPairsArray1.length; i++) {
        for (let j = i + 1; j < matchingPairsArray1.length; j++) {
          if (
            matchingPairsArray1[i].marriage === matchingPairsArray1[j].marriage
          ) {
            matchingPairsArray2 = matchingPairsArray2.concat([
              matchingPairsArray1[i],
              matchingPairsArray1[j],
            ]);
            // sort in ascending order
            matchingPairsArray2.sort((a, b) => {
              a.value - b.value;
            });
            matchingPairsArray1.splice(j, 1);
            matchingPairsArray1.splice(i, 1);
          }
        }
      }
    }
    //enable the option
    if (matchingPairsArray1.length > 0) {
      matchingPairsArray1.sort((a, b) => {
        a.value - b.value;
      });
      setPlayerMarriage1(matchingPairsArray1);
      setPlayerMarriage2(matchingPairsArray2);
      setIsMarriageEnabled(true);
    }
  }

  function handleMarriage() {
    if (playerMarriage2.length === 0) {
      let newPlayerHand = playerHand.filter((c) => {
        c.id !== playerMarriage1[0].id;
      });
      setPlayedCardsOfTurn(playerMarriage1[0]);
      setPlayerHand(newPlayerHand);
      setIsEnabled(false);
    }
    // this currently handles only the case, in which there is only on marriage-pair in the hand
  }

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
