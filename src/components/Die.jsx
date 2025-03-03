export default function die(props) {
  return (
    <>
      <button className="rounded-lg shadow-[0_0_2px_rgba(0,0,0,0.3)] p-2 cursor-pointer bg-white text-xl font-bold">
        {props.value}
      </button>
    </>
  );
}
