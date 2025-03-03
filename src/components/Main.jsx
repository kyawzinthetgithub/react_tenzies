import Die from "@/components/Die";
import { nanoid } from "nanoid";
import { useState } from "react";

export default function Main() {
  const generateAllNewDice = () => {
    return new Array(10).fill(0).map(() => ({value:Math.ceil(Math.random() * 6),isHeld:false,id:nanoid()}));
  };
  const [dice, setDice] = useState(generateAllNewDice());

  const rollDice = () => {
    setDice(generateAllNewDice());
  };

  return (
    <>
      <main className="bg-white w-full h-full p-5 md:max-w-[400px] md:max-h-[400px] rounded-xl flex flex-col gap-5 justify-center items-center">
        <div className="die-container grid grid-cols-5 gap-5 w-full">
          {dice && dice.map((num) => <Die key={num.id} value={num.value} />)}
        </div>
        <button
            type="button"
            onClick={rollDice}
            className="cursor-pointer flex justify-center items-center rounded bg-[#4726fb] text-white hover:bg-[#a36ec7] transition-all px-6 py-1"
          >
            Roll
          </button>
      </main>
    </>
  );
}
