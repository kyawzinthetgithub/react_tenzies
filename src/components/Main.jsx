import Die from "@/components/Die";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import ReactConfetti from "react-confetti";

export default function Main() {
  const generateAllNewDice = () => {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  };

  /**
   * lazy state initialization
   * generateAllNewDice function is reRandered when every single change in this conponent
   * thus why we can use callback function in use state for not re-randering every time
   */
  const [dices, setDices] = useState(() => generateAllNewDice());
  const refBtn = useRef(null);

  const gameWon =
    dices.every((dice) => dice.isHeld) &&
    dices.every((dice) => dice.value === dices[0].value);

  const rollDice = () => {
    gameWon
      ? setDices(generateAllNewDice())
      : setDices((oldDices) =>
          oldDices.map((dice) =>
            dice.isHeld
              ? dice
              : { ...dice, value: Math.ceil(Math.random() * 6) }
          )
        );
  };

  const hold = (id) => {
    setDices((oldVal) =>
      oldVal.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  };

  useEffect(() => {
    gameWon ? refBtn.current.focus() : null;
  }, [gameWon]);

  return (
    <>
      <main className="bg-white w-full h-full p-5 md:max-w-[400px] md:max-h-[400px] rounded-xl flex flex-col gap-5 justify-center items-center select-none">
        {gameWon && <ReactConfetti />}
        <div
          aria-live="polite"
          className="absolute top-0 left-0 w-[1px] h-[1px] text-nowrap p-0 m-0 overflow-hidden border-0 [clip:rect(0,0,0,0)]"
        >
          {gameWon && (
            <p>Congratulation! You won! Press "New Game" to start again.</p>
          )}
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Tenzies</h1>
          <p className="text-center my-5">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="die-container grid grid-cols-5 gap-5 w-full">
          {dices &&
            dices.map((dice) => (
              <Die
                key={dice.id}
                dice={dice}
                isHeld={dice.isHeld}
                hold={() => hold(dice.id)}
              />
            ))}
        </div>
        <button
          ref={refBtn}
          type="button"
          onClick={rollDice}
          className="cursor-pointer flex justify-center items-center rounded bg-[#4726fb] text-white hover:bg-[#a36ec7] transition-all px-6 py-1"
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}
