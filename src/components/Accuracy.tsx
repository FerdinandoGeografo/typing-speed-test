export default function Accuracy({ accuracy }: { accuracy: number }) {
  return (
    <span
      className={`${accuracy === 100 ? "text-green-500" : "text-red-500"} transition-colors duration-300`}
    >
      {accuracy}%
    </span>
  );
}
