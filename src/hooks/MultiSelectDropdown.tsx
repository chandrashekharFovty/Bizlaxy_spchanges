import React, { useRef, useState, useEffect } from "react";

export type OptionType = { label: string; value: string; custom?: boolean };

type MultiSelectDropdownProps = {
  label?: string;
  placeholder?: string;
  options: OptionType[];
  value: OptionType[];
  onChange: (value: OptionType[]) => void;
  error?: string;
  className?: string;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  placeholder = "Select...",
  options,
  value,
  onChange,
  error,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionsState, setOptionsState] = useState<OptionType[]>(options);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customOpt, setCustomOpt] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update options if parent changes them (e.g. Industry dropdown changes sectors)
  useEffect(() => {
    setOptionsState(options);
  }, [options]);

  // Click outside closes
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setShowCustomInput(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleSelect = (opt: OptionType) => {
    if (value.some((v) => v.value === opt.value))
      onChange(value.filter((v) => v.value !== opt.value));
    else
      onChange([...value, opt]);
  };

  // Remove chip
  const handleRemove = (opt: OptionType, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange(value.filter((v) => v.value !== opt.value));
  };

  // "Add custom" click
  const triggerAddCustom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCustomInput(true);
    setTimeout(() => {
      document.getElementById("dropdown-custom-input")?.focus();
    }, 100);
  };

  // Actually add the custom opt
  const submitCustom = (e?: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customOpt.trim();
    if (!trimmed) return;
    if (
      optionsState.some(
        (o) =>
          o.label.toLowerCase() === trimmed.toLowerCase() ||
          o.value.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setCustomOpt("");
      setShowCustomInput(false);
      return;
    }
    const newOpt = {
      label: trimmed,
      value: trimmed.toLowerCase().replace(/\s+/g, "_"),
      custom: true,
    };
    setOptionsState([...optionsState, newOpt]);
    onChange([...value, newOpt]);
    setCustomOpt("");
    setShowCustomInput(false);
  };

  return (
    <div
      className={`relative min-w-[180px] ${className}`}
      ref={dropdownRef}
      style={{ zIndex: isOpen ? 40 : undefined }}
    >
      {label && <label className="font-medium text-sm mb-1 block">{label}</label>}
      <div
        className={`w-full border border-[#BED6FF] rounded-xl min-h-[60px] px-4 py-2 bg-white flex gap-2 flex-wrap items-center cursor-pointer mt-1 ${isOpen ? "ring-2 ring-blue-200" : ""
          }`}
        onClick={() => setIsOpen((o) => !o)}
        tabIndex={0}
      >
        {value.length === 0 && (
          <span className="text-[#707070]">{placeholder}</span>
        )}
        {value.map((v) => (
          <span
            key={v.value}
            className="bg-blue-100 rounded-full px-3 py-1 flex items-center gap-1 text-xs mb-0.5"
            style={{ marginRight: 4 }}
          >
            {v.label}
            <button
              onClick={(e) => handleRemove(v, e)}
              className="text-blue-700 focus:outline-none font-bold text-xs ml-1"
              type="button"
              tabIndex={-1}
              aria-label="Remove"
              style={{ lineHeight: 1 }}
            >
              &times;
            </button>
          </span>
        ))}
        <span className="flex-1" />
        <svg
          width={18}
          height={18}
          viewBox="0 0 20 20"
          fill="none"
          className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M7 8l3 3 3-3"
            stroke="#888"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <div
          className="absolute w-full bg-white border border-[#BED6FF] rounded-xl shadow-lg mt-1 p-0 z-50 max-h-60 overflow-y-auto"
          style={{ fontSize: 15 }}
        >
          {optionsState.map((opt) => (
            <div
              key={opt.value}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 select-none ${value.some((v) => v.value === opt.value)
                ? "bg-blue-50"
                : ""
                }`}
              onClick={() => handleSelect(opt)}
            >
              <input
                type="checkbox"
                checked={!!value.find((v) => v.value === opt.value)}
                onChange={() => { }}
                className="mr-2"
                tabIndex={-1}
                style={{ accentColor: "#1C4BC4" }}
                readOnly
              />
              <span>{opt.label}</span>
              {opt.custom && <span className="ml-2 text-green-600 text-xs">(custom)</span>}
            </div>
          ))}
          {!showCustomInput && (
            <div
              className="px-4 py-2 border-t border-[#EAF1FC] text-blue-700 hover:bg-blue-100/70 font-semibold cursor-pointer"
              style={{ fontSize: 15 }}
              onClick={triggerAddCustom}
            >
              + Add custom option
            </div>
          )}
          {showCustomInput && (
            <form
              className="px-4 py-2 flex gap-2 border-t border-[#EAF1FC] bg-[#F7F7FA]"
              // onSubmit={submitCustom}
            >
              <input
                id="dropdown-custom-input"
                className="rounded-md border border-[#BED6FF] px-2 h-8 text-sm flex-1"
                type="text"
                autoFocus
                value={customOpt}
                onChange={(e) => setCustomOpt(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Type your option…"
              />
              <button onClick={submitCustom}
                className="bg-blue-600 text-white rounded px-3 h-8 text-sm font-medium"
                type="button"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowCustomInput(false)}
                className="text-gray-400 font-bold px-1 h-8 text-xl"
              >
                ×
              </button>
            </form>
          )}
        </div>
      )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default MultiSelectDropdown;
