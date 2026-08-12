export default function TestStat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <p className="flex flex-1 flex-col items-center gap-2 sm:flex-none sm:flex-row sm:gap-3">
      <span className="sm:tracking-tightest leading-4.75 tracking-tight text-neutral-400 sm:text-xl sm:leading-6">
        {label}:
      </span>
      <span className="text-2xl leading-6 font-bold text-white">{value}</span>
    </p>
  );
}
