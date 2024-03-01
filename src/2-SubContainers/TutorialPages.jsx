export default function TutorialPages() {
  return (
    <div className="slideBox">
      <div className="tutDiv">
        <figure>
          <img
            className="img9"
            src="./src/Assets/tutorial/tut_pic9.png"
            alt=""
          />
        </figure>
        <section>
          <h1>Welcome to the Game of 66</h1>
          <br />
          <p>
            If you’ve never played it before or you want to renew your skills,
            this tutorial will get you started quickly. So let’s dive in…
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure>
          <img
            className="img1"
            src="./src/Assets/tutorial/tut_pic1.png"
            alt=""
          />
        </figure>
        <section>
          <p>
            66 is a trick-taking game, played with a deck of 20 cards. The
            objective of this game is to reach 66 points as your opponent tries
            the same.
            <br />
            <br />
            <span className="hint">
              <strong>Hint:</strong> If you are in Central Europe, you are
              probably familiar with ‘German-suited’ cards. You can also select
              them in the settings section, along with the color of the cards
              and the texture of the table.
            </span>
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure>
          <img
            className="img2"
            src="./src/Assets/tutorial/tut_pic4.png"
            alt=""
          />
        </figure>
        <section>
          <p>
            At the beginning of the round the dealers deals 5 cards to each
            player. (Here you will play a 2-player version of it against the
            computer) <br /> <br />
            Also at the beginning one more card is opened and put under the deck
            of remaining cards face up. This card is called ‘trump’
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure>
          <img
            className="img5"
            src="./src/Assets/tutorial/tut_pic5.png"
            alt=""
          />
        </figure>
        <section>
          <p>
            The cards have different rankings: Aces are 11 points, 10s are 10,
            Ks, Qs and Js are 4, 3 and 2 points respectively.
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure>
          <img
            className="img6"
            src="./src/Assets/tutorial/tut_pic6.png"
            alt=""
          />
        </figure>
        <section>
          <p>
            You will lead the first trick by playing any card you want. Your
            opponent may respond with any card they want in the first phase of
            the game.
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure></figure>
        <section>
          <p>
            If they didn’t follow the suit you started or if they didn’t play
            any of the ‘trump’ cards, you get the points (addition of both of
            the cards) <br /> <br /> If they followed your suit and played a
            card with a higher value, they get those points. <br /> <br /> And
            if your opponent responded with a trump card to your non-trump card,
            they win the trick automatically and get the points.
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure></figure>
        <section>
          <p>
            After the trick has finished, players pick a new card. Winner of the
            previous trick picks first. Winner of the previous trick leads the
            next trick.
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure>
          <img
            className="img2"
            src="./src/Assets/tutorial/tut_pic2.png"
            alt=""
          />
        </figure>
        <section>
          <p>
            It is now the right time to mention two more features of this game:{" "}
            <br /> <br />
            If you won the previous trick and have a lowest value of the trump
            (which is always a J) you may swap that card with the trump card on
            the table.
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure>
          <img
            className="img2"
            src="./src/Assets/tutorial/tut_pic3.png"
            alt=""
          />
        </figure>
        <section>
          <p>
            If you have a K and a Q of the same suit, you can show them both to
            your opponent (this is called a marriage) and receive 20 points
            immediately. You have to play one of those card in that trick as
            well. <br /> <br /> If the matching suit is of trump, you even get
            40 points instead 20! <br /> <br />{" "}
            <span className="hint">
              {" "}
              Remember: you can swap cards or show marriage only after you won
              the previous trick and before you played a card in the current
              trick.{" "}
            </span>
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure></figure>
        <section>
          <p>
            As the players finally pick the last remaining cards (one of them is
            the trump card that had been opened at the beginning of the game)
            the winner of the previous trick gets the last closed card and the
            loser gets the opened trump card.
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure></figure>
        <section>
          <p>
            Here, the second phase of the game begins. The rules are slightly
            different from this point on…
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure></figure>
        <section>
          <p>
            The first played card sets now the suit of the current trick. The
            response to this card must follow the suit if there are any in the
            hand at all. <br /> <br /> If there are no cards of the same suit,
            the player must play a trump card instead. <br /> <br /> If there
            are also no trump cards in the hand, player may now play any card
            they wish.
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure></figure>
        <section>
          <p>
            The determination of the winner of the trick and the calculation of
            the points are the same. There is only this additional
            ‘Must-follow-the suit’ when not possible ‘Must-play-trump’ rule.
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure>
          {" "}
          <img
            className="img8"
            src="./src/Assets/tutorial/tut_pic8.png"
            alt=""
          />
        </figure>
        <section>
          <p>
            Game is played until one player reaches 66 points. If no one manages
            to do it, the one with the highest points win that round.
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure>
          <img
            className="img7"
            src="./src/Assets/tutorial/tut_pic7.png"
            alt=""
          />
        </figure>
        <section>
          <p>
            There are 3 rounds to play. Whoever wins 2 of them wins the game.
          </p>
        </section>
      </div>
      <div className="tutDiv">
        <figure></figure>
        <section>
          <p>
            That’s it! You are now ready to start! Feel free the check the rules
            any time you want. Good luck!
          </p>
        </section>
      </div>
    </div>
  );
}
