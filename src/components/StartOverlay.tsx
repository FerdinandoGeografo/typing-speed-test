import Button from "./Button";

export default function StartOverlay({ onStart }: { onStart: () => void }) {
  return (
    <div
      className="absolute -inset-2 grid cursor-pointer place-content-center backdrop-blur-lg sm:-inset-8"
      onClick={onStart}
    >
      <div className="flex flex-col items-center gap-5">
        <Button onClick={onStart}>
          <span>Start typing test</span>
        </Button>
        <p className="text-xl leading-6 text-white">
          Or click the text and start typing
        </p>
      </div>
    </div>
  );
}
