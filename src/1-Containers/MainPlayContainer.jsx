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
  const [shouldPickNewCard, setShouldPickNewCard] = useState(false);

  const [playerPoints, setPlayerPoints] = useState(0);
  const [cpuPoints, setCpuPoints] = useState(0);

  const [isMarriageEnabled, setIsMarriageEnabled] = useState(false);
  const [marriagePointsMode, setMarriagePointsMode] = useState(false);
  const [playerMarriage1, setPlayerMarriage1] = useState([]);
  const [playerMarriage2, setPlayerMarriage2] = useState([]);

  useImperativeHandle(ref, () => ({
    handleNewGame,
  }));

  useEffect(() => {
    if (shouldPickNewCard) {
      handleNewCardPick();
    } else {
      handleGameFlow();
    }
  }, [playedCardsOfTurn, cpuHand]);

  const handleNewCardPick = () => {
    pickNewCard();
    handleGameFlow();
  };

  function pickNewCard() {
    let newRemainingCards = [...remainingCards];
    let newPlayerHand = [...playerHand];
    let newCpuHand = [...cpuHand];
    let randomIx;

    randomIx = randomIndex(newRemainingCards.length);
    newPlayerHand.push(newRemainingCards.splice(randomIx, 1)[0]);
    randomIx = randomIndex(newRemainingCards.length);
    newCpuHand.push(newRemainingCards.splice(randomIx, 1)[0]);
    setPlayerHand(newPlayerHand);
    setCpuHand(newCpuHand);
    setRemainingCards(newRemainingCards);
    setShouldPickNewCard(false);
  }

  const handleTurnBasedOnLastRoundWinner = () => {
    if (lastRoundWinner === "player") {
      checkExchange();
      checkMarriage();
      setIsEnabled(true);
    } else {
      makeCpuMove();
    }
  };

  const handleSingleCardPlayed = () => {
    const lastPlayer = playedCardsOfTurn[0].holder;
    if (lastPlayer === "player") {
      makeCpuMove();
    } else {
      setIsEnabled(true);
    }
  };

  const handleGameFlow = () => {
    setShouldPickNewCard(false);

    if (playedCardsOfTurn.length === 0 && remainingCards.length <= 9) {
      handleTurnBasedOnLastRoundWinner();
    } else if (playedCardsOfTurn.length === 1) {
      handleSingleCardPlayed();
    } else if (playedCardsOfTurn.length === 2) {
      evaluateRound();
    }
  };

  async function makeCpuMove() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let newCpuHand = [...cpuHand];
    let newPlayedCardsOfTurn = [...playedCardsOfTurn];
    const randomIx = randomIndex(cpuHand.length);
    newPlayedCardsOfTurn.push(newCpuHand.splice(randomIx, 1)[0]);
    setPlayedCardsOfTurn(newPlayedCardsOfTurn);
    setCpuHand(newCpuHand);
  }

  return (
    <div className="mainPlayContainer">
      <CpuCards cpuHand={cpuHand} />
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
        marriagePointsMode={marriagePointsMode}
        trump={trump}
        setPlayerPoints={setPlayerPoints}
        playerPoints={playerPoints}
      />
      <button
        disabled={!isMarriageEnabled}
        onClick={toggleMarriage}
        className={`in-game-btn in-game-btn-pair ${
          isMarriageEnabled ? "in-game-btn-pair-enabled" : ""
        }`}
      >
        <img className="in-game-btn-img" src="/src/Assets/pair.svg" alt="" />
      </button>
      <button
        onClick={handleExchange}
        disabled={!isExchangeEnabled}
        className={`in-game-btn in-game-btn-exchange ${
          isExchangeEnabled ? "in-game-btn-exchange-enabled" : ""
        }`}
      >
        <img
          className="in-game-btn-img"
          src="/src/Assets/exchange.svg"
          alt=""
        />
      </button>
    </div>
  );

  //EXCHANGE TRUMP FUNCTIONS
  function checkExchange() {
    playerHand.map((c) => {
      if (c.color === trump.color && c.value === 2) {
        setIsExchangeEnabled(true);
      }
    });
  }
  function handleExchange() {
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
  //SHOW MARRIAGE FUNCTIONS
  function checkMarriage() {
    let matchingPairsArray1 = [];
    let matchingPairsArray2 = [];
    // check if there are marriage-qualified card among the hand
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
    //if there are 2 pairs, put them in separate arrays
    if (matchingPairsArray1.length === 4) {
      console.log("not ready yet");
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
      matchingPairsArray1 = matchingPairsArray2.splice(0, 1)[0];
      // sort in ascending order
      matchingPairsArray1.sort((a, b) => {
        return a.value - b.value;
      });
      matchingPairsArray2.sort((a, b) => {
        return a.value - b.value;
      });
    }
    //enable the option
    if (matchingPairsArray1.length > 0) {
      setPlayerMarriage1(matchingPairsArray1);
      setPlayerMarriage2(matchingPairsArray2);
      setIsMarriageEnabled(true);
    } else {
      setIsMarriageEnabled(false);
    }
  }
  function toggleMarriage() {
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

  //EVALUATE THE ROUND
  async function evaluateRound() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let roundPoints = 0;
    let onlyOneTrump = false;
    let roundWinner;
    playedCardsOfTurn.forEach((c) => {
      roundPoints += c.value;
      if (c.color === trump.color) {
        onlyOneTrump = !onlyOneTrump;
        roundWinner = c.holder;
      }
    });

    if (onlyOneTrump) {
      console.log("winner is " + roundWinner);
    } else if (
      playedCardsOfTurn[0].color === playedCardsOfTurn[1].color &&
      playedCardsOfTurn[1].value > playedCardsOfTurn[0].value
    ) {
      roundWinner = playedCardsOfTurn[1].holder;
      console.log("winner is " + roundWinner);
    } else {
      roundWinner = playedCardsOfTurn[0].holder;
      console.log("winner is " + roundWinner);
    }

    if (roundWinner === "player") {
      setPlayerPoints(playerPoints + roundPoints);
      console.log("player points: " + (playerPoints + roundPoints));
    } else {
      setCpuPoints(cpuPoints + roundPoints);
      console.log("cpu points: " + (cpuPoints + roundPoints));
    }

    setMarriagePointsMode(false);
    setLastRoundWinner(roundWinner);
    setShouldPickNewCard(true);
    setPlayedCardsOfTurn([]);
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
    console.log("5 cards each dealt");
    let trumpSelection = getInitialCard(newRemainingCards);
    newTrump = trumpSelection.selectedCard;
    newRemainingCards = trumpSelection.newRemainingCards;

    setRemainingCards(newRemainingCards);
    setPlayerHand(newPlayerHand);
    setCpuHand(newCpuHand);
    setTrump(newTrump);
  }
});

MainPlayContainer.displayName = "MainPlayContainer";
export default MainPlayContainer;
