import SelectButton from "./SelectButton";
import useDisclosure from "../hooks/useDisclosure";

interface ButtonGroupProps {
  label: string;
  options: { label: string; value: string }[];
  selected: string;
  disabled?: boolean;
  onSelect: (value: string) => void;
}

export default function ButtonGroup({
  label,
  options,
  selected,
  disabled = false,
  onSelect,
}: ButtonGroupProps) {
  const { isOpen, setIsOpen, ref } = useDisclosure();
  const selectedOption = options.find((option) => option.value === selected);

  function handleSelect(value: string) {
    onSelect(value);
    setIsOpen(false);
  }

  return (
    <>
      <div
        role="radiogroup"
        aria-label={label}
        className="hidden items-center gap-1.5 sm:flex"
      >
        <span className="pr-2 leading-4.75 tracking-tight text-neutral-400 capitalize">
          {label}:
        </span>

        {options.map((option) => (
          <SelectButton
            key={option.value}
            role="radio"
            aria-checked={selected === option.value}
            selected={selected === option.value}
            disabled={disabled}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </SelectButton>
        ))}
      </div>

      <div ref={ref} className="relative flex flex-1 sm:hidden">
        <SelectButton
          className="flex flex-1 items-center justify-center gap-2.5 sm:hidden"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">{label}:</span>
          <span className="shrink-0">{selectedOption?.label}</span>
          <svg
            className={`h-1.5 w-2.5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            role="presentation"
            aria-hidden="true"
          >
            <use href="/icons.svg#down-arrow"></use>
          </svg>
        </SelectButton>

        {isOpen && (
          <ul
            className="absolute -bottom-1.75 z-50 flex w-full translate-y-full flex-col divide-y divide-neutral-700 rounded-lg bg-neutral-800 py-0.5"
            role="radiogroup"
            aria-label={label}
          >
            {options.map((option) => (
              <li key={`${label}-${option.value}`}>
                <label
                  htmlFor={`${label}-${option.value}`}
                  className="flex items-center gap-3 px-2.5 py-2 leading-4.75 tracking-tight text-white"
                >
                  <input
                    className="peer sr-only"
                    id={`${label}-${option.value}`}
                    type="radio"
                    name={label}
                    checked={selected === option.value}
                    onChange={() => handleSelect(option.value)}
                  />
                  <span
                    aria-hidden="true"
                    className="flex size-4 items-center justify-center rounded-full border border-white transition-all duration-300 peer-checked:border-blue-400 peer-checked:bg-blue-400 peer-focus:ring-2 peer-focus:ring-blue-400 peer-focus:ring-offset-2 peer-focus:ring-offset-neutral-700 peer-focus:outline-none"
                  >
                    <span className="size-1.5 rounded-full bg-neutral-800"></span>
                  </span>
                  <span className="capitalize">{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
