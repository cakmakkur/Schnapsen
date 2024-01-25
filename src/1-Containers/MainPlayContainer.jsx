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
  const [roundPoints, setRoundPoints] = useState(0);

  const [isMarriageEnabled, setIsMarriageEnabled] = useState(false);
  const [playerMarriage1, setPlayerMarriage1] = useState([]);
  const [playerMarriage2, setPlayerMarriage2] = useState([]);

  useImperativeHandle(ref, () => ({
    handleNewGame,
  }));

  console.log(remainingCards.length);

  useEffect(() => {
    console.log("useEffect triggered with playedCardsOfTurn changes.");

    if (shouldPickNewCard) {
      handleNewCardPick();
    } else {
      handleGameFlow();
    }
  }, [playedCardsOfTurn]);

  const handleNewCardPick = () => {
    pickNewCard();
    handleTurnBasedOnLastRoundWinner();
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
    console.log("new cards picked");
  }

  const handleTurnBasedOnLastRoundWinner = () => {
    if (lastRoundWinner === "player") {
      console.log("setting player card enabled");
      setIsEnabled(true);
    } else {
      console.log("making computer move");
      makeCpuMove();
    }
  };

  const handleGameFlow = () => {
    setShouldPickNewCard(false);

    if (playedCardsOfTurn.length === 0 && remainingCards.length <= 9) {
      console.log("start of a new round");
      handleTurnBasedOnLastRoundWinner();
    } else if (playedCardsOfTurn.length === 1) {
      handleSingleCardPlayed();
    } else if (playedCardsOfTurn.length === 2) {
      evaluateRound();
    }
  };

  const handleSingleCardPlayed = () => {
    const lastPlayer = playedCardsOfTurn[0].holder;
    if (lastPlayer === "player") {
      console.log("player has played, computer to move");
      makeCpuMove();
    } else {
      console.log("computer has played, player's turn");
      setIsEnabled(true);
    }
  };

  //async cpu move
  const makeCpuMove = async () => {
    await cpuMove();
  };

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
    //game flow logic should check if the winner of the last round if the player
    // if so this is executed
    //or use useEffect to check it when the round cards are 0 again after a round finishes
    playerHand.map((c) => {
      if (c.color === trump.color && c.value === 2) {
        setIsExchangeEnabled(true);
      }
    });
  }

  function checkMarriage() {
    //game logic should check first if the lastround winner is the player.
    //if so this will be executed
    let matchingPairsArray1 = [];
    let matchingPairsArray2 = [];
    // check if there are marriage-qualified card among the hand
    let marriageArray = playerHand.filter((c) => {
      c.marriage === "m1" ||
        c.marriage === "m2" ||
        c.marriage === "m3" ||
        c.marriage === "m4";
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

  async function evaluateRound() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("evaluating the round...");
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
    setLastRoundWinner(roundWinner);
    setShouldPickNewCard(true);
    setPlayedCardsOfTurn([]);
    console.log("evaluation finished");
  }

  function handleNewGame() {
    console.log("handle new game clicked");
    console.log("starting a new game");
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

  function cpuMove() {
    return new Promise((resolve) => {
      console.log("cpu is playing");

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
});

MainPlayContainer.displayName = "MainPlayContainer";
export default MainPlayContainer;
