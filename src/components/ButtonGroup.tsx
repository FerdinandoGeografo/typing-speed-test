import { useState } from "react";
import SelectButton from "./SelectButton";

interface ButtonGroupProps {
  label: string;
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function ButtonGroup({
  label,
  options,
  selected,
  onSelect,
}: ButtonGroupProps) {
  const selectedOption = options.find((option) => option.value === selected);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="hidden items-center gap-1.5 sm:flex">
        <p className="pr-2 leading-4.75 tracking-tight text-neutral-400">
          {label}:
        </p>

        {options.map((option) => (
          <SelectButton
            selected={selected === option.value}
            onClick={() => onSelect(option.value)}
            key={option.value}
          >
            {option.label}
          </SelectButton>
        ))}
      </div>

      <SelectButton
        className="relative flex flex-1 items-center justify-center gap-2.5 sm:hidden"
        onClick={() => {
          setExpanded((exp) => !exp);
        }}
      >
        <span>{selectedOption?.label}</span>
        <svg
          className="h-1.5 w-2.5 transition-all duration-300"
          role="presentation"
          aria-hidden="true"
        >
          <use href="/icons.svg#down-arrow"></use>
        </svg>

        {expanded && (
          <div className="absolute -bottom-1.75 z-50 flex w-full translate-y-full flex-col divide-y divide-neutral-700 rounded-lg bg-neutral-800 py-0.5">
            {options.map((option) => (
              <label
                key={option.value}
                htmlFor={`option-${option.value}`}
                className="flex items-center gap-2 px-2.5 py-2 leading-4.75 tracking-tight text-white"
              >
                <input
                  id={`option-${option.value}`}
                  type="radio"
                  checked={selected === option.value}
                  onChange={() => onSelect(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </SelectButton>
    </>
  );
}
