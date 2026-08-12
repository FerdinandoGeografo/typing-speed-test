export default function PersonalBest({ wpm }: { wpm: number }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <svg className="h-5 w-4.5" role="presentation" aria-hidden="true">
        <use href="/icons.svg#best"></use>
      </svg>

      <p className="tracking-tightest text-lg leading-5.5 text-neutral-400">
        <span className="hidden sm:inline">Personal best: </span>
        <span className="sm:hidden">Best: </span>
        <span className="text-white uppercase">{wpm} wpm</span>
      </p>
    </div>
  );
}
