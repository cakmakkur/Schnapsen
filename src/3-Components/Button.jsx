export default function Button({ name, handleClick, buttonRef }) {
  return (
    <button onClick={handleClick} ref={buttonRef} className="button">
      {name}
    </button>
  );
}
