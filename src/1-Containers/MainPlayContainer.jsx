import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { cards } from "../Assets/Cards/cards";
import randomIndex from "../Logic/randomIndex";
import CpuCards from "../2-SubContainers/CpuCards";
import MiddleCards from "../2-SubContainers/MiddleCards";
import PlayerCards from "../2-SubContainers/PlayerCards";
import { checkMarriage } from "../Logic/checkMarriage";
import { toggleMarriage } from "../Logic/toggleMarriage";
import { checkExchange } from "../Logic/checkExchange";
import { handleExchange } from "../Logic/handleExchange";
import { usePointsContext } from "../GlobalVariables/PointsContext";
import { useCardsContext } from "../GlobalVariables/CardsContext";
import PlayerWonAnimation from "../2-SubContainers/PlayerWonAnimation";

const MainPlayContainer = forwardRef((props, ref) => {
  const { backgroundStyle } = useCardsContext();
  const {
    setPlayerPoints,
    setCpuPoints,
    playerPoints,
    cpuPoints,
    hasGameStarted,
    setHasGameStarted,
    bummerlRef,
  } = usePointsContext();
  const [playerHand, setPlayerHand] = useState([]);
  const [cpuHand, setCpuHand] = useState([]);
  const [remainingCards, setRemainingCards] = useState(cards);
  const [lastRoundWinner, setLastRoundWinner] = useState("player");
  const [playedCardsOfTurn, setPlayedCardsOfTurn] = useState([]);
  const [lastPlayedPlayer, setLastPlayedPlayer] = useState("");
  const [trump, setTrump] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isExchangeEnabled, setIsExchangeEnabled] = useState(false);
  const [shouldPickNewCard, setShouldPickNewCard] = useState(false);
  const [isMarriageEnabled, setIsMarriageEnabled] = useState(false);
  const [marriagePointsMode, setMarriagePointsMode] = useState(false);
  const [playerMarriage1, setPlayerMarriage1] = useState([]);
  const [playerMarriage2, setPlayerMarriage2] = useState([]);
  const [matchChecked, setMatchChecked] = useState(false);
  const [playerWonAnimation, setPlayerWonAnimation] = useState(false);

  useImperativeHandle(ref, () => ({
    handleNewGame,
  }));

  let backgroundImageUrl;
  if (backgroundStyle === "green") {
    backgroundImageUrl = "./src/Assets/table-background.jpeg";
  } else {
    backgroundImageUrl = "./src/Assets/table-background_blue.jpeg";
  }

  const backgroundColor = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  useEffect(() => {
    if (shouldPickNewCard) {
      if (remainingCards.length > 1) {
        pickNewCard();
      } else if (remainingCards.length === 1) {
        pickLastNewCard();
      }
    } else {
      if (!matchChecked) {
        handleGameFlow();
      }
    }
  }, [playedCardsOfTurn, cpuHand, playerHand]);

  const handleGameFlow = () => {
    setShouldPickNewCard(false);
    //reset marriage and exchange options each turn
    playerHand.map((c) => (c.marriageOption = false));
    setIsExchangeEnabled(false);
    console.log(bummerlRef.current);

    if (playerPoints >= 66) {
      alert("PLAYER HAS WON THE GAME");
      bummerlRef.current.player = bummerlRef.current.player += 1;
      console.log(bummerlRef.current);
      //player won animation
      setRemainingCards(cards);
      setCpuHand([]);
      setPlayerHand([]);
      setPlayedCardsOfTurn([]);
      // handleCelebration();
      setPlayerWonAnimation(true);
      setTimeout(() => {
        setPlayerWonAnimation(false);
      }, 5000);
      handleNewGame();
      return;
    }

    if (cpuPoints >= 66) {
      alert("COMPUTER HAS WON THE GAME");
      bummerlRef.current.cpu = bummerlRef.current.cpu += 1;
      console.log(bummerlRef.current);
      //cpu won animation
      setRemainingCards(cards);
      setCpuHand([]);
      setPlayerHand([]);
      setPlayedCardsOfTurn([]);
      setIsMarriageEnabled(false);
      setIsExchangeEnabled(false);
      handleNewGame();
      return;
    }

    if (
      hasGameStarted &&
      playerHand.length === 0 &&
      cpuHand.length === 0 &&
      playerPoints < 66 &&
      cpuPoints < 66
    ) {
      //no one wins animation
      alert("NOONE WINS THIS ROUND");
      setRemainingCards(cards);
      setCpuHand([]);
      setPlayerHand([]);
      setPlayedCardsOfTurn([]);
      handleNewGame();
      return;
    }

    if (playedCardsOfTurn.length === 0 && remainingCards.length <= 9) {
      handleTurnBasedOnLastRoundWinner();
    } else if (playedCardsOfTurn.length === 1) {
      handleSingleCardPlayed();
    } else if (playedCardsOfTurn.length === 2) {
      evaluateRound();
    }
  };

  const handleTurnBasedOnLastRoundWinner = () => {
    if (lastRoundWinner === "player") {
      if (playerPoints > 0) {
        checkExchange(remainingCards, playerHand, trump, setIsExchangeEnabled);
        checkMarriage(
          playerHand,
          setPlayerMarriage1,
          setPlayerMarriage2,
          setIsMarriageEnabled,
          setIsMarriageEnabled
        );
      }
      setIsEnabled(true);
      setLastPlayedPlayer("player");
    } else {
      makeCpuMove();
      setLastPlayedPlayer("cpu");
    }
  };

  const handleSingleCardPlayed = () => {
    if (lastPlayedPlayer === "player") {
      makeCpuMove();
    } else if (remainingCards.length > 0) {
      setIsEnabled(true);
    } else {
      updateSecondPhaseCardAvailability();
    }
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
    newCpuHand.map((c) => (c.holder = "cpu"));
    setPlayerHand(newPlayerHand);
    setCpuHand(newCpuHand);
    setRemainingCards(newRemainingCards);
    setShouldPickNewCard(false);
  }

  function pickLastNewCard() {
    let newRemainingCards = [...remainingCards];
    let newPlayerHand = [...playerHand];
    let newCpuHand = [...cpuHand];
    if (lastRoundWinner === "player") {
      newPlayerHand.push(newRemainingCards.splice(0, 1)[0]);
      newCpuHand.push(trump);
    } else {
      newPlayerHand.push(trump);
      newCpuHand.push(newRemainingCards.splice(0, 1)[0]);
    }
    setPlayerHand(newPlayerHand);
    setCpuHand(newCpuHand);
    setRemainingCards(newRemainingCards);
    setShouldPickNewCard(false);
  }

  async function makeCpuMove() {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const makeAnyRandomMove = () => {
      let newCpuHand = [...cpuHand];
      let newPlayedCardsOfTurn = [...playedCardsOfTurn];
      const randomIx = randomIndex(cpuHand.length);
      //______
      const selectedCard = newCpuHand.splice(randomIx, 1)[0];
      newPlayedCardsOfTurn.push(selectedCard);
      console.log("cpu played: " + selectedCard.name);

      // newPlayedCardsOfTurn.push(newCpuHand.splice(randomIx, 1)[0]);
      //______
      setPlayedCardsOfTurn(newPlayedCardsOfTurn);
      setCpuHand(newCpuHand);
    };

    if (remainingCards.length > 0 || lastRoundWinner === "cpu") {
      makeAnyRandomMove();
      return;
    } else {
      let availableCards = [];
      let newCpuHand = [...cpuHand];
      let newPlayedCardsOfTurn = [...playedCardsOfTurn];

      const selectRandomCard = () => {
        const randomIx = randomIndex(availableCards.length);
        const randomId = availableCards[randomIx].id;
        const indexOfRandomCard = newCpuHand.findIndex(
          (c) => c.id === randomId
        );
        //_____
        const selectedCard = newCpuHand.splice(indexOfRandomCard, 1)[0];
        newPlayedCardsOfTurn.push(selectedCard);
        console.log("cpu played:" + selectedCard);

        // newPlayedCardsOfTurn.push(newCpuHand.splice(indexOfRandomCard, 1)[0]);
        //_____
        setPlayedCardsOfTurn(newPlayedCardsOfTurn);
        setCpuHand(newCpuHand);
      };

      cpuHand.map((c) => {
        if (c.color === playedCardsOfTurn[0].color) {
          availableCards.push(c);
        }
      });
      if (availableCards.length > 0) {
        selectRandomCard();
        return;
      } else {
        newCpuHand.map((c) => {
          if (c.color === trump.color) {
            availableCards.push(c);
          }
        });
      }
      if (availableCards.length > 0) {
        selectRandomCard();
      } else {
        makeAnyRandomMove();
      }
    }
  }

  return (
    <div style={backgroundColor} className="mainPlayContainer">
      {playerWonAnimation ? <PlayerWonAnimation /> : ""}
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
        setMatchChecked={setMatchChecked}
      />
      <button
        disabled={!isMarriageEnabled}
        onClick={() =>
          toggleMarriage(
            isEnabled,
            setIsEnabled,
            setMarriagePointsMode,
            marriagePointsMode,
            playerMarriage1,
            playerMarriage2,
            playerHand
          )
        }
        className={`in-game-btn in-game-btn-pair ${
          isMarriageEnabled ? "in-game-btn-pair-enabled" : ""
        }`}
      >
        <img className="in-game-btn-img" src="/src/Assets/pair.svg" alt="" />
      </button>
      <button
        onClick={() =>
          handleExchange(
            trump,
            playerHand,
            setTrump,
            setPlayerHand,
            setIsExchangeEnabled
          )
        }
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

  //CHECK AND UPDATE SECOND PHASE CARD AVAILABILITY
  function updateSecondPhaseCardAvailability() {
    setIsEnabled(false);
    let hasAvailableCards;
    let updatedPlayerHand;

    function checkColorMatch() {
      updatedPlayerHand = playerHand.map((c) => ({
        ...c,
        lastPhaseEnabled: c.color === playedCardsOfTurn[0].color,
      }));
      hasAvailableCards = updatedPlayerHand.some((c) => c.lastPhaseEnabled);
    }

    function checkTrumpMatch() {
      updatedPlayerHand = playerHand.map((c) => ({
        ...c,
        lastPhaseEnabled: c.color === trump.color,
      }));
      hasAvailableCards = updatedPlayerHand.some((c) => c.lastPhaseEnabled);
    }

    checkColorMatch();

    if (hasAvailableCards) {
      console.log("the is an available card");
    } else {
      console.log("the is a trump match");
      checkTrumpMatch();
    }
    setPlayerHand(updatedPlayerHand);
    setIsEnabled(!hasAvailableCards);
    setMatchChecked(true);
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
      console.log("WINNER IS " + roundWinner);
    } else if (
      playedCardsOfTurn[0].color === playedCardsOfTurn[1].color &&
      playedCardsOfTurn[1].value > playedCardsOfTurn[0].value
    ) {
      roundWinner = playedCardsOfTurn[1].holder;
    } else {
      roundWinner = playedCardsOfTurn[0].holder;
    }

    console.log(
      `First card value: ${playedCardsOfTurn[0].value} ${
        playedCardsOfTurn[0].color === trump.color ? "TRUMP CARD" : ""
      }`
    );
    console.log(
      `SECOND card value: ${playedCardsOfTurn[1].value} ${
        playedCardsOfTurn[1].color === trump.color ? "TRUMP CARD" : ""
      }`
    );

    if (roundWinner === "player") {
      setPlayerPoints(playerPoints + roundPoints);
    } else {
      setCpuPoints(cpuPoints + roundPoints);
    }

    setMarriagePointsMode(false);
    setLastRoundWinner(roundWinner);
    if (remainingCards.length > 0) {
      setShouldPickNewCard(true);
    } else {
      setShouldPickNewCard(false);
    }
    setPlayedCardsOfTurn([]);
  }

  //START A NEW GAME
  function handleNewGame() {
    setHasGameStarted(true);
    let newRemainingCards = [...cards];
    let newPlayerHand = [];
    let newCpuHand = [];
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
    setPlayerPoints(0);
    setCpuPoints(0);
    setTrump(newTrump);
  }
});

MainPlayContainer.displayName = "MainPlayContainer";
export default MainPlayContainer;
