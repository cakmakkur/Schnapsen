export default function SettingsContainer({ setShowSettings }) {
  function onCloseClick() {
    setShowSettings(false);
  }
  return (
    <div className="settingsDiv">
      <button onClick={onCloseClick} className="closeButton">
        X
      </button>
      <div className="div1">
        <p>Choose backside:</p>
        <form name="cardBackside" action="">
          <div>
            <img src="/src//Assets/cards_images/backside_blue.png" alt="" />
            <input name="cardBackside" type="radio" />
          </div>
          <div>
            <img src="/src//Assets/cards_images/backside.png" alt="" />
            <input name="cardBackside" type="radio" />
          </div>
        </form>
      </div>
      <div className="div2">
        <p>Choose table:</p>
        <form name="table-texture" action="">
          <div>
            <img src="/src//Assets/table-background.jpeg" alt="" />
            <input name="table-texture" type="radio" />
          </div>
          <div>
            <img src="/src//Assets/table-background_blue.jpeg" alt="" />
            <input name="table-texture" type="radio" />
          </div>
        </form>
      </div>
    </div>
  );
}
