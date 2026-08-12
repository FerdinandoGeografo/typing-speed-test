export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-px self-stretch bg-neutral-700 ${className}`}
    ></div>
  );
}
