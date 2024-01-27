export default function Button({ name, handleClick, hasGameStarted }) {
  return (
    <button
      disabled={false || hasGameStarted}
      onClick={handleClick}
      className="button"
    >
      {name}
    </button>
  );
}
