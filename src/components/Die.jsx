export default function die(props) {
  return (
    <>
      <button
        onClick={props.hold}
        aria-label={`Dice with value ${props.dice.value}, ${
          props.isHeld ? "helded" : "not held"
        }`}
        aria-pressed={props.isHeld}
        className="rounded-lg shadow-[0_0_2px_rgba(0,0,0,0.3)] p-2 cursor-pointer bg-white text-xl font-bold"
        style={{ background: props.isHeld ? "#59e391" : "white" }}
      >
        {props.dice.value}
      </button>
    </>
  );
}
