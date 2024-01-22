export default function Button({ name, handleClick }) {
  return (
    <button onClick={handleClick} className="button">
      {name}
    </button>
  );
}
