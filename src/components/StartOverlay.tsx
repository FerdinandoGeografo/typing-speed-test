import Button from "./Button";

export default function StartOverlay({ onStart }: { onStart: () => void }) {
  return (
    <div
      className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-5"
      role="button"
      onClick={onStart}
    >
      <Button className="shrink-0">
        <span>Start typing test</span>
      </Button>
      <p className="text-xl leading-6 text-white">
        Or click the text and start typing
      </p>
    </div>
  );
}
